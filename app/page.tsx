import PixelArtGenerator from "@/components/pixel-art-generator"

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-green-400">Pixel Art NFT Generator</h1>
          <p className="text-lg text-gray-300">
            Create unique pixel art characters by mixing and matching different components. Possible combinations: 5
            <sup>6</sup> = 15,625
          </p>
        </header>

        <PixelArtGenerator />
      </div>
    </main>
  )
}
