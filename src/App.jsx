import { useState } from 'react'
import './App.css'

function App() {
  const [showDialog, setShowDialog] = useState(false)
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })
  const [showSuccess, setShowSuccess] = useState(false)

  const handleYesClick = () => {
    setShowSuccess(true)
  }

  const handleNoHover = () => {
    const randomX = (Math.random() - 0.5) * 300
    const randomY = (Math.random() - 0.5) * 300
    setNoButtonPosition({ x: randomX, y: randomY })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-pink via-soft-rose to-soft-peach">
      {/* Header */}
      <header className="text-center py-12 px-4">
        <h1 className="text-5xl md:text-7xl font-bold text-pink-800 mb-4 float-animation">
          💕 For You 💕
        </h1>
        <p className="text-xl md:text-2xl text-pink-700 font-serif italic">
          A little something from my heart to yours
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 pb-12">
        {/* Memory Section */}
        <section className="bg-warm-white/80 backdrop-blur-sm rounded-3xl p-8 mb-8 shadow-lg">
          <h2 className="text-3xl font-bold text-pink-800 mb-6 text-center">✨ Our Memories ✨</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-soft-pink/30 rounded-2xl p-6 transform hover:scale-105 transition-transform">
              <h3 className="text-xl font-semibold text-pink-700 mb-2">🌟 First Meeting</h3>
              <p className="text-pink-600">I still remember when you first came into my life. Somehow you managed to become such an important part of it so quickly. Since then, I've watched you grow, change, struggle, laugh and become more and more yourself and I am so proud.</p>
            </div>
            <div className="bg-soft-rose/30 rounded-2xl p-6 transform hover:scale-105 transition-transform">
              <h3 className="text-xl font-semibold text-pink-700 mb-2">🎵 Our Memories</h3>
              <p className="text-pink-600">The Pokemon date, our first nervous call, the late night talks, skipping sleep because I wanted to be with you for longer and all those other moments that probably looked completely ordinary from the outside. But for me, they weren't ordinary.</p>
            </div>
            <div className="bg-soft-lavender/30 rounded-2xl p-6 transform hover:scale-105 transition-transform">
              <h3 className="text-xl font-semibold text-pink-700 mb-2">🌸 The Stupid Stuff</h3>
              <p className="text-pink-600">That bitch ass sticker you won't stop using, I still hate it btw. How you completely cheated in every pokemon battle because it's impossible to win from me otherwise ;)</p>
            </div>
            <div className="bg-soft-blue/30 rounded-2xl p-6 transform hover:scale-105 transition-transform">
              <h3 className="text-xl font-semibold text-pink-700 mb-2">💝 Why You're Special</h3>
              <p className="text-pink-600">Your kindness. Your hair. The way you care so deeply about everyone and everything. The way you can make me smile just by sending me a message. Your strength, even if it times you don't see it yourself. You have a light in you I hope you never stop seeing.</p>
            </div>
          </div>
        </section>

        {/* Letter Section */}
        <section className="bg-warm-white/80 backdrop-blur-sm rounded-3xl p-8 mb-8 shadow-lg">
          <h2 className="text-3xl font-bold text-pink-800 mb-6 text-center">💌 A Note For You 💌</h2>
          <div className="bg-soft-pink/20 rounded-2xl p-6">
            <p className="text-pink-700 text-lg leading-relaxed font-serif">
                  I've been thinking about us a lot lately. About everything we shared,
        everything we learned, and all the little moments that made you such
        an important part of my life.
        <br /><br />
        I still believe in what we had. I still believe that the love between
        us was real, and I still believe that some of the things that hurt us
        could have been talked through and worked on together.
        <br /><br />
        I'm not pretending that everything was perfect. It wasn't. We both
        struggled, we misunderstood each other, and the distance made things
        harder than they ever should have been. But when I look at everything
        we had, I don't only see the things that went wrong. I see the boy I
        fell in love with. I see the Pokémon date, the late-night talks, the
        stupid jokes, the nervous calls, and all the moments where simply
        having you there made my day better.
        <br /><br />
        I don't know what the future looks like. I don't know where life will
        take either of us. But I know that I don't want to pretend that what
        we had didn't matter to me.
        <br /><br />
        If there is ever a moment when we are both in the same place in life,
        without the distance between us, and we still feel the same way, I
        would want to see where that could take us.
        <br /><br />
        Until then, I just hope you know how deeply loved you are. Not because
        you're my boyfriend, not because of what you can give me, but because
        you're Yohan.
        <br /><br />
        And yes, I still think we would have made excellent cuddle buddies.
        💕
            </p>
          </div>
        </section>

        {/* CTA Button */}
        <div className="text-center">
          {!showDialog && !showSuccess && (
            <button
              onClick={() => setShowDialog(true)}
              className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xl px-12 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 font-semibold pulse-animation"
            >
              💗 I Have Something To Ask You 💗
            </button>
          )}
        </div>

        {/* Dialog */}
        {showDialog && !showSuccess && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-warm-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center">
              <h2 className="text-3xl font-bold text-pink-800 mb-4">💕 One Question 💕</h2>
              <p className="text-xl text-pink-700 mb-8 font-serif">
                Would you like to give us another try?
              </p>
              <div className="flex justify-center gap-6 relative">
                <button
                  onClick={handleYesClick}
                  className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-lg px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold"
                >
                  Yes! 💕
                </button>
                <button
                  onMouseEnter={handleNoHover}
                  style={{
                    transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
                    transition: 'transform 0.3s ease-out'
                  }}
                  className="bg-gray-300 text-gray-600 text-lg px-8 py-3 rounded-full shadow-md hover:shadow-lg font-semibold"
                >
                  No 😢
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success Message */}
        {showSuccess && (
          <div className="fixed inset-0 bg-gradient-to-br from-soft-pink via-soft-rose to-soft-peach flex items-center justify-center z-50 p-4">
            <div className="text-center">
              <div className="text-8xl mb-6 float-animation">💕</div>
              <h2 className="text-5xl font-bold text-pink-800 mb-4">Yay! 💕</h2>
              <p className="text-2xl text-pink-700 mb-8 font-serif">
                I'm so happy! Let's make this work, together. 💗
              </p>
              <div className="text-6xl pulse-animation">🎉💝🎉</div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-pink-600">
        <p className="text-lg font-serif">Made with 💕 just for you</p>
      </footer>
    </div>
  )
}

export default App
