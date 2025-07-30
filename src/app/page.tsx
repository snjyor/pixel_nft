"use client"

import { useState, useRef, useEffect } from 'react'
import { PixelAvatar, generateRandomDNAString, isValidDNA, parseDNA, formatDNA } from 'pixel-avatar-lib'
import { Github } from 'lucide-react'

// X (Twitter) Icon component
function XIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

export default function Home() {
  const [currentDNA, setCurrentDNA] = useState('0-1-2-3-4-5')
  const [customDNA, setCustomDNA] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [mounted, setMounted] = useState(false)
  const avatarRef = useRef<HTMLCanvasElement>(null)

  // Ensure component is mounted to avoid hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  // Preset avatar examples
  const presetAvatars = [
    { dna: '0-0-0-0-0-0', name: 'Basic Avatar' },
    { dna: '1-1-1-1-1-1', name: 'Blonde Smile' },
    { dna: '2-2-2-2-2-2', name: 'Dark Skin' },
    { dna: '3-3-0-0-0-3', name: 'Red Hood + Shield' },
    { dna: '4-0-2-1-1-4', name: 'Green Mohawk + Staff' },
    { dna: '2-3-1-2-2-2', name: 'Black Hair Suit + Sword' },
    { dna: '5-4-3-2-1-0', name: 'Rainbow Combo' },
    { dna: '9-9-9-9-9-9', name: 'Ultimate Style' },
  ]

  // Generate random avatar
  const handleRandomize = () => {
    const newDNA = generateRandomDNAString()
    setCurrentDNA(newDNA)
    setErrorMessage('')
  }

  // Apply custom DNA
  const handleApplyCustomDNA = () => {
    if (!customDNA.trim()) {
      setErrorMessage('Please enter a DNA string')
      return
    }

    if (isValidDNA(customDNA)) {
      setCurrentDNA(customDNA)
      setErrorMessage('')
    } else {
      setErrorMessage('Invalid DNA format. Please use format: 0-1-2-3-4-5 (each number 0-9)')
    }
  }

  // Download avatar
  const handleDownload = () => {
    if (avatarRef.current) {
      const link = document.createElement('a')
      link.download = `pixel-avatar-${currentDNA}.png`
      link.href = avatarRef.current.toDataURL()
      link.click()
    }
  }

  // Parse current DNA
  const parsedDNA = parseDNA(currentDNA)

  // Show loading state if component is not mounted yet
  if (!mounted) {
    return (
      <div className="min-h-screen p-4 md:p-8 bg-gray-900 text-white flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-900 text-white">
      {/* Social Media Links */}
      <div className="absolute top-4 right-4 z-10">
        <div className="backdrop-blur-sm p-3">
          <div className="flex justify-center items-center gap-4">
            <a 
              href="https://twitter.com/intent/follow?screen_name=jinghui30" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-all duration-200 hover:scale-110 group text-xs"
              aria-label="Follow us on Twitter"
            >
              <XIcon className="w-4 h-4 group-hover:animate-pulse" />
              <span className="font-medium">Twitter</span>
            </a>
            <a 
              href="https://github.com/snjyor" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 text-gray-400 hover:text-gray-300 transition-all duration-200 hover:scale-110 group text-xs"
              aria-label="View source code on GitHub"
            >
              <Github className="w-4 h-4 group-hover:animate-pulse" />
              <span className="font-medium">GitHub</span>
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Pixel Art NFT Generator
          </h1>
          <p className="text-lg text-green-300 mb-4">
            Create unique pixel art characters by mixing and matching different components.
          </p>
          <p className="text-md text-blue-200">
            <strong>1,000,000</strong> possible combinations • <strong>Free</strong> to use • <strong>Instant</strong> download
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Control Panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* Current Avatar Display */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-4 text-center">
                Current Avatar
              </h2>
              <div className="flex justify-center mb-4">
                <div className="bg-white/20 p-4 rounded-xl">
                  <PixelAvatar 
                    ref={avatarRef}
                    dna={currentDNA} 
                    size={200} 
                    className="rounded-lg shadow-2xl"
                  />
                </div>
              </div>
              <div className="text-center space-y-2">
                <p className="text-sm text-blue-200">DNA Code:</p>
                <code className="block bg-black/30 text-green-400 p-2 rounded text-sm font-mono">
                  {currentDNA}
                </code>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">Control Panel</h3>
              <div className="space-y-3">
                <button
                  onClick={handleRandomize}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg cursor-pointer"
                >
                  Randomize
                </button>
                <button
                  onClick={handleDownload}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg cursor-pointer"
                >
                  Download Avatar
                </button>
              </div>
            </div>

            {/* Custom DNA Input */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">Custom DNA</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  value={customDNA}
                  onChange={(e) => setCustomDNA(e.target.value)}
                  placeholder="e.g., 0-1-2-3-4-5"
                  className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  onClick={handleApplyCustomDNA}
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg cursor-pointer"
                >
                  Apply DNA
                </button>
                {errorMessage && (
                  <p className="text-red-400 text-sm mt-2 p-2 bg-red-900/30 rounded">
                    {errorMessage}
                  </p>
                )}
              </div>
            </div>

            {/* DNA Breakdown */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">DNA Breakdown</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-300">Hair:</span>
                  <span className="text-white font-mono">{parsedDNA.hair}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-300">Face:</span>
                  <span className="text-white font-mono">{parsedDNA.face}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-300">Neck:</span>
                  <span className="text-white font-mono">{parsedDNA.neck}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-300">Clothing:</span>
                  <span className="text-white font-mono">{parsedDNA.clothing}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-300">Hands:</span>
                  <span className="text-white font-mono">{parsedDNA.hands}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-300">Item:</span>
                  <span className="text-white font-mono">{parsedDNA.item}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Avatar Gallery */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Avatar Gallery
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {presetAvatars.map((avatar) => (
                  <div
                    key={avatar.dna}
                    onClick={() => setCurrentDNA(avatar.dna)}
                    className={`bg-white/20 p-4 rounded-xl cursor-pointer transition-all duration-200 hover:scale-105 hover:bg-white/30 border-2 ${
                      currentDNA === avatar.dna 
                        ? 'border-purple-400 ring-2 ring-purple-400/50' 
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <div className="flex justify-center mb-3">
                      <PixelAvatar 
                        dna={avatar.dna} 
                        size={100} 
                        className="rounded-lg shadow-lg"
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-white font-semibold text-sm mb-1">
                        {avatar.name}
                      </p>
                      <code className="text-xs text-blue-300 font-mono">
                        {avatar.dna}
                      </code>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* About Tool Description */}
            <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">About This Tool</h3>
              <p className="text-sm text-gray-300 mb-4">
                Our pixel art generator lets you create stunning 8-bit style NFT characters perfect for blockchain projects, 
                game development, or digital art collections. Each character is composed of 6 customizable parts with 10 
                variations each, giving you endless creative possibilities.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <h4 className="font-semibold text-green-300">What is Pixel Art NFT Generator?</h4>
                  <p className="text-white">A free online tool that creates unique 8-bit style NFT characters with 1,000,000 possible combinations. Generate high-quality pixel art for NFT projects, game development, digital art collections, and social media avatars without any design experience required.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-green-300">Who Can Use This Generator?</h4>
                  <p className="text-white">Perfect for NFT creators, game developers, digital artists, blockchain enthusiasts, content creators, indie game studios, and anyone looking to create unique pixel art characters for personal or commercial projects.</p>
                </div>
              </div>
              {/* Library Usage Instructions */}
              <div className="mt-6">
                <h3 className="text-xl font-bold text-white mb-4">Library Usage</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-green-300 mb-2">Installation</h4>
                    <div className="bg-black/30 rounded-lg p-3">
                      <code className="text-green-400 text-xs block mb-1">npm install pixel-avatar-lib</code>
                      <code className="text-gray-400 text-xs block mb-1"># or</code>
                      <code className="text-green-400 text-xs block mb-1">yarn add pixel-avatar-lib</code>
                      <code className="text-gray-400 text-xs block mb-1"># or</code>
                      <code className="text-green-400 text-xs block">pnpm add pixel-avatar-lib</code>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-green-300 mb-2">Quick Start</h4>
                    <div className="bg-black/30 rounded-lg p-3">
                      <pre className="text-xs text-gray-300 overflow-x-auto">
  {`import { PixelAvatar } from 'pixel-avatar-lib'

  function App() {
    return (
      <div>
        {/* Basic usage */}
        <PixelAvatar dna="0-1-2-3-4-5" />
        
        {/* Custom size */}
        <PixelAvatar 
          dna="1-2-3-4-5-6" 
          size={256} 
        />
        
        {/* With styling */}
        <PixelAvatar 
          dna="2-3-4-5-6-7" 
          size={128}
          className="rounded-full"
        />
      </div>
    )
  }`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
              <p className='text-sm text-gray-300 mb-4 mt-4'>More details about <a href="https://www.npmjs.com/package/pixel-avatar-lib" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">pixel-avatar-lib</a> can be found on <a href="https://github.com/snjyor/pixel-avatar-lib" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">GitHub</a>.</p>
            </div>
          </div>
        </div>

        {/* Complete Guide Section */}
        <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-green-400 mb-4 text-center">Complete Guide to Pixel Art NFT Creation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-300">
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-green-300 mb-2">Where Can You Use These Characters?</h4>
                <p>Use your generated pixel art in NFT marketplaces (OpenSea, Rarible), video games, mobile apps, social media profiles, Discord servers, Telegram stickers, digital art collections, and blockchain projects.</p>
              </div>

              <div>
                <h4 className="font-semibold text-green-300 mb-2">When to Use This Tool?</h4>
                <p>Ideal for rapid prototyping, NFT collection launches, game development sprints, digital art experiments, social media content creation, and whenever you need quick, professional-quality pixel art characters.</p>
              </div>

              <div>
                <h4 className="font-semibold text-green-300 mb-2">Why Choose Our Pixel Art Generator?</h4>
                <p>Completely free, no registration required, instant high-resolution downloads, professional quality output, mobile-friendly interface, and unlimited usage. Save time and money while creating unique characters for your projects.</p>
              </div>

              <div>
                <h4 className="font-semibold text-green-300 mb-2">How Does It Work?</h4>
                <p>Simply customize 6 character parts (hair, face, neck, clothing, hands, items) with 10 style options each. Use the randomize button for instant inspiration or manually select each component. Download your creation in high resolution (128px-512px) instantly.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-green-300 mb-2">How Many Combinations Available?</h4>
                <p>With 10 variations for each of the 6 customizable parts, you can create exactly 1,000,000 unique character combinations. Each character has a unique DNA code for easy identification and collection management.</p>
              </div>

              <div>
                <h4 className="font-semibold text-green-300 mb-2">How Much Does It Cost?</h4>
                <p>Absolutely free! No hidden fees, no subscription required, no watermarks, and no usage limits. Create unlimited pixel art characters and download them in high resolution without any restrictions.</p>
              </div>

              <div>
                <h4 className="font-semibold text-green-300 mb-2">Popular Use Cases</h4>
                <p>NFT character generator, 8-bit avatar creator, pixel art maker, retro game sprites, blockchain art, crypto collectibles, digital character design, pixelated avatars, 16-bit style graphics, indie game assets.</p>
              </div>

              <div>
                <h4 className="font-semibold text-green-300 mb-2">Technical Features</h4>
                <p>Procedural character generation, randomized avatars, downloadable pixel art, NFT collection tools, Web3 character creator, decentralized art generator, custom pixel sprites, retro gaming art.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Information */}
        <div className="mt-12 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-lg font-bold text-white mb-2">
              Made for the Digital Art Community
            </h3>
            <p className="text-blue-200 mb-4">
              Our Pixel Art NFT Generator runs perfectly in web environments with all features verified and tested.
            </p>
            <div className="text-xs text-gray-400 border-t border-gray-700 pt-4">
              <p>&copy; 2025 Pixel Art NFT Generator. All rights reserved.</p>
              <p className="mt-1">Made by <a href="https://twitter.com/intent/follow?screen_name=jinghui30" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">Jinghui</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

