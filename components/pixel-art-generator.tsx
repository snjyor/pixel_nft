"use client"

import { useState, useEffect, useRef } from "react"
import { Download, Shuffle, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import PixelCanvas from "@/components/pixel-canvas"
import ComponentSelector from "@/components/component-selector"
import { characterParts } from "@/lib/character-parts"

export default function PixelArtGenerator() {
  const [selectedParts, setSelectedParts] = useState({
    hair: 0,
    face: 0,
    neck: 0,
    clothing: 0,
    hands: 0,
    item: 0,
  })

  const [pixelSize, setPixelSize] = useState(8)
  const [activeTab, setActiveTab] = useState("preview")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Generate a random character
  const randomizeCharacter = () => {
    setSelectedParts({
      hair: Math.floor(Math.random() * 5),
      face: Math.floor(Math.random() * 5),
      neck: Math.floor(Math.random() * 5),
      clothing: Math.floor(Math.random() * 5),
      hands: Math.floor(Math.random() * 5),
      item: Math.floor(Math.random() * 5),
    })
  }

  // Reset to default character
  const resetCharacter = () => {
    setSelectedParts({
      hair: 0,
      face: 0,
      neck: 0,
      clothing: 0,
      hands: 0,
      item: 0,
    })
  }

  // Download the generated NFT
  const downloadNFT = () => {
    if (!canvasRef.current) return

    const link = document.createElement("a")
    link.download = `pixel-nft-${Date.now()}.png`
    link.href = canvasRef.current.toDataURL("image/png")
    link.click()
  }

  // Initialize with a random character
  useEffect(() => {
    randomizeCharacter()
  }, [])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left panel - Controls */}
      <div className="lg:col-span-1 bg-gray-800 p-4 rounded-lg">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3 text-green-400">Pixel Size</h2>
          <div className="flex items-center gap-4">
            <Slider
              value={[pixelSize]}
              min={4}
              max={12}
              step={1}
              onValueChange={(value) => setPixelSize(value[0])}
              className="flex-1"
            />
            <span className="text-sm font-mono bg-gray-700 px-2 py-1 rounded">{pixelSize}px</span>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full mb-4">
            <TabsTrigger value="preview" className="flex-1">
              Preview
            </TabsTrigger>
            <TabsTrigger value="customize" className="flex-1">
              Customize
            </TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="space-y-4">
            <div className="flex gap-2">
              <Button onClick={randomizeCharacter} className="flex-1 bg-green-600 hover:bg-green-700">
                <Shuffle className="mr-2 h-4 w-4" />
                Randomize
              </Button>
              <Button onClick={resetCharacter} variant="outline" className="flex-1 text-black">
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>

            <Button onClick={downloadNFT} className="w-full bg-purple-600 hover:bg-purple-700">
              <Download className="mr-2 h-4 w-4" />
              Download NFT
            </Button>

            <div className="mt-4 p-3 bg-gray-700 rounded-md text-sm">
              <p className="font-mono text-xs text-gray-300 mb-2">Character DNA:</p>
              <code className="text-green-400 break-all">
                {`${selectedParts.hair}-${selectedParts.face}-${selectedParts.neck}-${selectedParts.clothing}-${selectedParts.hands}-${selectedParts.item}`}
              </code>
            </div>
          </TabsContent>

          <TabsContent value="customize" className="space-y-4">
            {Object.entries(characterParts).map(([partKey, partData]) => (
              <div key={partKey} className="mb-4">
                <h3 className="text-md font-semibold mb-2 capitalize">{partKey}</h3>
                <Select
                  value={selectedParts[partKey as keyof typeof selectedParts].toString()}
                  onValueChange={(value) => {
                    setSelectedParts((prev) => ({
                      ...prev,
                      [partKey]: Number.parseInt(value),
                    }))
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={`Select ${partKey} style`} />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 5 }, (_, i) => (
                      <SelectItem key={i} value={i.toString()}>
                        Style {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      {/* Right panel - Canvas preview */}
      <div className="lg:col-span-2">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4 text-green-400">NFT Preview</h2>
          <div className="flex justify-center">
            <div className="relative bg-white p-4 rounded-lg border-2 border-gray-700">
              <PixelCanvas ref={canvasRef} selectedParts={selectedParts} pixelSize={pixelSize} />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 md:grid-cols-6 gap-2">
            {Object.entries(characterParts).map(([partKey, partData]) => (
              <ComponentSelector
                key={partKey}
                partKey={partKey as keyof typeof selectedParts}
                selectedIndex={selectedParts[partKey as keyof typeof selectedParts]}
                onChange={(index) => {
                  setSelectedParts((prev) => ({
                    ...prev,
                    [partKey]: index,
                  }))
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
