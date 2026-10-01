import { useState } from 'react'
import './App.css'

function App() {
  const [authStep, setAuthStep] = useState(0)
  const [authAnswers, setAuthAnswers] = useState({})
  const [showDialog, setShowDialog] = useState(false)
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })
  const [showSuccess, setShowSuccess] = useState(false)
  const [noMessage, setNoMessage] = useState('')
  const [revealedNotes, setRevealedNotes] = useState({})
  const [missYouCount, setMissYouCount] = useState(0)
  const [letterOpen, setLetterOpen] = useState(false)
  const [letterAnimating, setLetterAnimating] = useState(false)

  const sendDiscordNotification = async () => {
    const webhookUrl = 'https://discord.com/api/webhooks/1555232256400957471/nfv8E6bPBI22e9UKk1TAHJQ61mT1oGL1Nf8z-JJIR-685ArRomx4OE2d77lXNK3mH2AI' // Replace this with your actual webhook URL

    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: '🎉💕 HE SAID YES! 💕🎉\n\nYohan clicked the Yes button! He wants to give us another try!',
          username: 'Love Notification',
          avatar_url: 'https://emoji.gg/assets/emoji/3814_pink-heart.png'
        })
      })
    } catch (error) {
      console.error('Failed to send Discord notification:', error)
    }
  }

  const timelineEvents = [
    { date: "First of May", title: "First meeting", description: "Gabriel introduced us to each other in a tiktok group chat, you were so enthousiastic" },
    { date: "End of June", title: "First I love you", description: "You told me you loved me on tiktok" },
    { date: "End of July", title: "You told me you wanted to try", description: "I was extremely confused, but soooo happy" },
    { date: "Begin September", title: "Stronger and better", description: "We got back together after being stupid and we loved each other so much" },
    { date: "3th of September", title: "First call", description: "I was soooo nerveous and I felt like I fucked it up so bad but I remember how pretty you looked" },
    { date: "First of November", title: "Planned first visit", description: "I looked forward to it so much, I still hope I get to hug my love one day" },
  ]

  const authQuestions = [
    {
      question: "Who is the BEST Pokémon? 🦆",
      options: ["Mewtwo", "Psyduck", "Charizard", "Arceus"],
      correct: "Psyduck",
      hint: "Think about the most confused but lovable duck..."
    },
    {
      question: "What's the best way to win a Pokémon battle? 🎮",
      options: ["Strategy", "Cheat", "Luck", "Friendship"],
      correct: "Cheat",
      hint: "The way YOU win battles against me..."
    },
    {
      question: "Complete this sentence: 'I hate that _____ sticker' 🙄",
      options: ["Sasaki", "Ariel", "wet", "twerking bear"],
      correct: "twerking bear",
      hint: "The one you keep using that I can't stand..."
    }
  ]

  const handleAuthAnswer = (answer) => {
    const currentQuestion = authQuestions[authStep]
    if (answer === currentQuestion.correct) {
      setAuthAnswers({ ...authAnswers, [authStep]: answer })
      if (authStep < authQuestions.length - 1) {
        setAuthStep(authStep + 1)
      } else {
        setAuthStep(authQuestions.length)
      }
    } else {
      setAuthAnswers({ ...authAnswers, [authStep]: answer })
    }
  }

  const handleYesClick = () => {
    setShowSuccess(true)
    sendDiscordNotification()
  }

  const handleNoHover = () => {
    const randomX = (Math.random() - 0.5) * 300
    const randomY = (Math.random() - 0.5) * 300
    setNoButtonPosition({ x: randomX, y: randomY })
    
    const messages = [
      "Are you sure? 😢",
      "Really? Think about it! 💭",
      "I'll make you Pokémon themed food! 🍕",
      "Please? Pretty please? 🥺",
      "Think of the cuddles! 🤗",
      "I'll let you win ONE battle! ⚔️",
      "Psyduck believes in you! 🦆",
      "Come onnnn! 💕",
      "Don't break my heart! 💔"
    ]
    setNoMessage(messages[Math.floor(Math.random() * messages.length)])
  }

  const handleNoTouch = (e) => {
    e.preventDefault()
    handleNoHover()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-pink via-soft-rose to-soft-peach">
      {/* Authentication Screen */}
      {authStep < authQuestions.length && (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="bg-warm-white/90 backdrop-blur-sm rounded-3xl p-8 max-w-lg w-full shadow-2xl text-center">
            <div className="text-6xl mb-4 float-animation">🔐</div>
            <h2 className="text-2xl md:text-3xl font-bold text-pink-800 mb-2">
              Security Check! 🛡️
            </h2>
            <p className="text-pink-600 mb-6 font-serif">
              Prove you're Yohan by answering these questions
            </p>
            
            <div className="bg-soft-pink/30 rounded-2xl p-6 mb-6">
              <p className="text-xl md:text-2xl font-semibold text-pink-800 mb-4">
                {authQuestions[authStep].question}
              </p>
              <div className="space-y-3">
                {authQuestions[authStep].options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAuthAnswer(option)}
                    className="w-full bg-white hover:bg-soft-pink text-pink-700 font-semibold py-3 px-6 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    {option}
                  </button>
                ))}
              </div>
              {authAnswers[authStep] && authAnswers[authStep] !== authQuestions[authStep].correct && (
                <div className="mt-4 animate-bounce">
                  <p className="text-pink-600 font-serif italic text-sm md:text-base">
                    ❌ Nope! Try again!
                  </p>
                  <p className="text-pink-500 font-serif italic text-xs md:text-sm mt-2">
                    Hint: {authQuestions[authStep].hint}
                  </p>
                </div>
              )}
            </div>
            
            <p className="text-pink-500 text-sm">
              Question {authStep + 1} of {authQuestions.length}
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      {authStep >= authQuestions.length && (
        <>
      {/* Header */}
      <header className="text-center py-8 md:py-12 px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-pink-800 mb-4 float-animation">
          💕 For You 💕
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-pink-700 font-serif italic">
          A little something from my heart to yours
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 pb-12">
        {/* Timeline Section */}
        <section className="bg-warm-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 mb-6 md:mb-8 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-pink-800 mb-4 md:mb-6 text-center">📅 Our Story 📅</h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-400 to-rose-400 md:transform md:-translate-x-1/2"></div>
            
            {/* Timeline events */}
            <div className="space-y-8">
              {timelineEvents.map((event, index) => (
                <div key={index} className="relative flex items-center md:justify-center">
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-pink-500 rounded-full md:transform md:-translate-x-1/2 shadow-lg z-10 animate-pulse"></div>
                  
                  {/* Event card */}
                  <div className={`ml-12 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                    <div className="bg-gradient-to-br from-soft-pink/30 to-soft-rose/30 rounded-2xl p-4 md:p-6 transform hover:scale-105 transition-transform shadow-md">
                      <p className="text-pink-500 text-sm font-semibold mb-1">{event.date}</p>
                      <h3 className="text-lg md:text-xl font-bold text-pink-800 mb-2">{event.title}</h3>
                      <p className="text-pink-600 text-sm md:text-base font-serif">{event.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Memory Section */}
        <section className="bg-warm-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 mb-6 md:mb-8 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-pink-800 mb-4 md:mb-6 text-center">✨ Our Memories ✨</h2>
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-soft-pink/30 rounded-2xl p-4 md:p-6 transform hover:scale-105 transition-transform">
              <h3 className="text-lg md:text-xl font-semibold text-pink-700 mb-2">💕 The First "I Love You"</h3>
              <p className="text-sm md:text-base text-pink-600">That TikTok. The one where you said it first. I still have it saved. I still watch it sometimes. It was perfect, and it was you, and it made my heart do that thing where it forgets how to beat properly.</p>
            </div>
            <div className="bg-soft-rose/30 rounded-2xl p-4 md:p-6 transform hover:scale-105 transition-transform">
              <h3 className="text-lg md:text-xl font-semibold text-pink-700 mb-2">📸 Things You Forgot</h3>
              <p className="text-sm md:text-base text-pink-600">All those little moments you probably don't even remember. The way you'd say my name wrong. The specific strategy you talked about. The tiny details I noticed and saved in my heart like they were precious.</p>
            </div>
            <div className="bg-soft-lavender/30 rounded-2xl p-4 md:p-6 transform hover:scale-105 transition-transform">
              <h3 className="text-lg md:text-xl font-semibold text-pink-700 mb-2">📱 If I Could Replay One Evening</h3>
              <p className="text-sm md:text-base text-pink-600">That TikTok conversation. 5 things we like, 4 things we... I have the screenshots. It was perfect. It was us. I'd go back to that conversation and live in it forever if I could.</p>
            </div>
            <div className="bg-soft-blue/30 rounded-2xl p-4 md:p-6 transform hover:scale-105 transition-transform">
              <h3 className="text-lg md:text-xl font-semibold text-pink-700 mb-2">🌟 The Magic Moments</h3>
              <p className="text-sm md:text-base text-pink-600">The moments that felt like magic. When everything aligned and it was just us, being us, and nothing else mattered. Those moments I'll carry with me always.</p>
            </div>
          </div>
        </section>

        {/* Things I Hope You Never Doubt */}
        <section className="bg-warm-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 mb-6 md:mb-8 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-pink-800 mb-4 md:mb-6 text-center">💖 Things I Hope You Never Doubt 💖</h2>
          <div className="space-y-4">
            {[
              { title: "You are loved", detail: "Deeply, genuinely, unconditionally loved. Not for what you do or what you can give, but for who you are." },
              { title: "You are allowed to need space", detail: "It's okay to step back. It's okay to breathe. It's okay to take time for yourself. I'll still be here." },
              { title: "You don't have to earn affection", detail: "You don't need to perform or achieve or be perfect. You deserve love simply because you exist." },
              { title: "Your weird little interests make you you", detail: "Pokémon, the animes, the specific things that light you up, they're part of what makes you special." },
              { title: "You made someone's life brighter", detail: "You made my life brighter just by being there. You have no idea how much you matter to people. You really are my angel." }
            ].map((item, index) => (
              <div key={index} className="bg-gradient-to-r from-soft-pink/30 to-soft-rose/30 rounded-2xl p-4 md:p-6 transform hover:scale-105 transition-transform">
                <h3 className="text-lg md:text-xl font-semibold text-pink-700 mb-2">{item.title}</h3>
                <p className="text-pink-600 text-sm md:text-base font-serif">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* New Cute Sections */}
        <section className="bg-warm-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 mb-6 md:mb-8 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-pink-800 mb-4 md:mb-6 text-center">🦆 Reasons You Should Say Yes 🦆</h2>
          <div className="space-y-4">
            <div className="bg-soft-pink/30 rounded-2xl p-4 md:p-6 flex items-start gap-4">
              <span className="text-3xl">�</span>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-pink-700 mb-2">I'll Learn Pokémon</h3>
                <p className="text-sm md:text-base text-pink-600">Actually learn it. Not just pretend. I'll know the difference between Psyduck and... whatever other Pokémon exist.</p>
              </div>
            </div>
            <div className="bg-soft-rose/30 rounded-2xl p-4 md:p-6 flex items-start gap-4">
              <span className="text-3xl">😂</span>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-pink-700 mb-2">Permanent Access to My Jokes</h3>
                <p className="text-sm md:text-base text-pink-600">My amazing, incredible, hilarious jokes. You're welcome. (They're actually good, I promise)</p>
              </div>
            </div>
            <div className="bg-soft-lavender/30 rounded-2xl p-4 md:p-6 flex items-start gap-4">
              <span className="text-3xl">🤫</span>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-pink-700 mb-2">I'll Pretend I Don't Know You're Cheating</h3>
                <p className="text-sm md:text-base text-pink-600">When we play Pokémon and you definitely cheat, I'll pretend I don't notice. Because love is blind. And so am I, apparently.</p>
              </div>
            </div>
            <div className="bg-soft-blue/30 rounded-2xl p-4 md:p-6 flex items-start gap-4">
              <span className="text-3xl">🎬</span>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-pink-700 mb-2">You Pick The Movies!</h3>
                <p className="text-sm md:text-base text-pink-600">Even the bad ones. Even the ones I'd never watch alone. I'll watch them with you because it's us watching them.</p>
              </div>
            </div>
            <div className="bg-soft-pink/30 rounded-2xl p-4 md:p-6 flex items-start gap-4">
              <span className="text-3xl">�</span>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-pink-700 mb-2">I'll Remember The Tiny Things</h3>
                <p className="text-sm md:text-base text-pink-600">The things you mention in passing. The small things that matter to you. I'll remember them because you matter.</p>
              </div>
            </div>
            <div className="bg-soft-rose/30 rounded-2xl p-4 md:p-6 flex items-start gap-4">
              <span className="text-3xl">🤗</span>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-pink-700 mb-2">Cuddle Guarantee</h3>
                <p className="text-sm md:text-base text-pink-600">Unlimited cuddles. No expiration date. Terms and conditions may apply (just kidding, they don't).</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-warm-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 mb-6 md:mb-8 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-pink-800 mb-4 md:mb-6 text-center">💕 Our Promise 💕</h2>
          <div className="bg-gradient-to-r from-soft-pink/30 to-soft-rose/30 rounded-2xl p-4 md:p-6 text-center">
            <p className="text-pink-700 text-base md:text-lg font-serif leading-relaxed mb-4">
              I promise to:
            </p>
            <ul className="text-left text-pink-600 text-sm md:text-base space-y-2 inline-block">
              <li>✨ Always laugh at your jokes (even the bad ones)</li>
              <li>🦆 Never forget that Psyduck is the best</li>
              <li>🎮 Let you win at least ONE Pokémon battle per year</li>
              <li>🤗 Be your biggest fan</li>
              <li>💝 Love you for exactly who you are</li>
              <li>🤗 Did I mention how much we would cuddle?</li>
            </ul>
          </div>
        </section>

        {/* Why I Miss You Section */}
        <section className="bg-warm-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 mb-6 md:mb-8 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-pink-800 mb-4 md:mb-6 text-center">💭 Why I Miss You 💭</h2>
          <div className="space-y-4">
            <div className="bg-soft-pink/30 rounded-2xl p-4 md:p-6">
              <p className="text-pink-700 text-base md:text-lg font-serif leading-relaxed">
                I miss the way your voice sounds when you're tired but still want to talk to me. 
              </p>
            </div>
            <div className="bg-soft-rose/30 rounded-2xl p-4 md:p-6">
              <p className="text-pink-700 text-base md:text-lg font-serif leading-relaxed">
                I miss our stupid conversations that went on for hours about nothing and everything at the same time. The ones where we'd lose track of time because we were just happy to be there with each other.
              </p>
            </div>
            <div className="bg-soft-lavender/30 rounded-2xl p-4 md:p-6">
              <p className="text-pink-700 text-base md:text-lg font-serif leading-relaxed">
                I miss having someone who understood me without me having to explain. Who knew what I needed before I did. Who made me feel seen in a way no one else ever has.
              </p>
            </div>
            <div className="bg-gradient-to-r from-soft-pink/40 to-soft-rose/40 rounded-2xl p-4 md:p-6 border-2 border-pink-400">
              <p className="text-pink-700 text-base md:text-lg font-serif leading-relaxed">
                Most of all, I miss the anticipation of hugging my angel. The feeling of finally being in your arms after missing you for so long. 
              </p>
            </div>
            <div className="bg-soft-blue/30 rounded-2xl p-4 md:p-6">
              <p className="text-pink-700 text-base md:text-lg font-serif leading-relaxed">
                I miss you. Not just the good parts, but all of you. Even the parts that drove me crazy sometimes. Because they were part of what made you, you.
              </p>
            </div>
          </div>

          {/* Interactive I Miss You Machine */}
          <div className="mt-6 bg-gradient-to-br from-soft-pink/20 to-soft-rose/20 rounded-2xl p-4 md:p-6 text-center">
            <h3 className="text-xl md:text-2xl font-bold text-pink-800 mb-4">🤖 The I Miss You Machine 🤖</h3>
            <p className="text-pink-600 mb-4 font-serif">Click the button to generate a miss you message</p>
            <button
              onClick={() => setMissYouCount(missYouCount + 1)}
              className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-lg px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold mb-4"
            >
              💕 I Miss You ({missYouCount}) 💕
            </button>
            {missYouCount > 0 && (
              <div className="bg-white/50 rounded-xl p-4 mt-4 animate-pulse">
                <p className="text-pink-700 font-serif text-sm md:text-base">
                  {missYouCount === 1 && "I miss you 💕"}
                  {missYouCount === 2 && "I really miss you 💕💕"}
                  {missYouCount === 3 && "I miss you so much 💕💕💕"}
                  {missYouCount === 4 && "I miss you more than words can say 💕💕💕💕"}
                  {missYouCount >= 5 && "I miss you more than anything in the world 💕💕💕💕💕"}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Future Dreams Section */}
        <section className="bg-warm-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 mb-6 md:mb-8 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-pink-800 mb-4 md:mb-6 text-center">🌟 Things I Want To Do With You 🌟</h2>
          
          {/* Tiny Things */}
          <div className="mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-pink-700 mb-4 text-center">✨ Tiny Things</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {["Grocery shopping", "Make dinner", "Fall asleep together", "Late night walks", "Buy ice cream"].map((item, index) => (
                <div key={index} className="bg-soft-pink/30 rounded-xl p-3 text-center transform hover:scale-105 transition-transform">
                  <p className="text-pink-700 text-sm md:text-base font-serif">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Cute Things */}
          <div className="mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-pink-700 mb-4 text-center">💕 Cute Things</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {["Matching PJ", "Take cute pictures for our wallet", "Make you pudding", "Rainy days in"].map((item, index) => (
                <div key={index} className="bg-soft-rose/30 rounded-xl p-3 text-center transform hover:scale-105 transition-transform">
                  <p className="text-pink-700 text-sm md:text-base font-serif">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Madrid */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-pink-700 mb-4 text-center">🇪🇸 Madrid</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {["Explore", "Visit your uni", "Buy you flowers", "Watch people", "Exist together"].map((item, index) => (
                <div key={index} className="bg-gradient-to-br from-soft-lavender/30 to-soft-blue/30 rounded-xl p-3 text-center transform hover:scale-105 transition-transform">
                  <p className="text-pink-700 text-sm md:text-base font-serif">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hidden Love Notes */}
        <section className="bg-warm-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 mb-6 md:mb-8 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-pink-800 mb-4 md:mb-6 text-center">💝 Click the Hearts 💝</h2>
          <p className="text-pink-600 text-center mb-6 font-serif italic">Each heart holds a secret message...</p>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
            {[
              { id: 1, message: "You're my favorite person 💕" },
              { id: 2, message: "I still check your profile sometimes 😊" },
              { id: 3, message: "Your voice is my favorite sound" },
              { id: 4, message: "I never stopped caring" },
              { id: 5, message: "You make me want to be better" },
              { id: 6, message: "Psyduck approves 🦆" },
              { id: 7, message: "I saved our screenshots" },
              { id: 8, message: "You're worth fighting for" },
              { id: 9, message: "I believe in us" },
              { id: 10, message: "Always 💗" }
            ].map((note) => (
              <button
                key={note.id}
                onClick={() => setRevealedNotes({ ...revealedNotes, [note.id]: !revealedNotes[note.id] })}
                className="text-4xl md:text-5xl transform hover:scale-125 transition-transform duration-300 pulse-animation"
              >
                {revealedNotes[note.id] ? '💖' : '🤍'}
              </button>
            ))}
          </div>
          <div className="mt-6 space-y-2">
            {Object.entries(revealedNotes).filter(([_, revealed]) => revealed).map(([id, _]) => (
              <div key={id} className="bg-soft-pink/40 rounded-xl p-3 text-center animate-pulse">
                <p className="text-pink-700 font-serif text-sm md:text-base">
                  {[
                    "You're my favorite person 💕",
                    "I still check your profile sometimes 😊",
                    "Your voice is my favorite sound",
                    "I never stopped caring",
                    "You make me want to be better",
                    "Psyduck approves 🦆",
                    "I saved our screenshots",
                    "You're worth fighting for",
                    "I believe in us",
                    "Always 💗"
                  ][parseInt(id) - 1]}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Songs Section
        <section className="bg-warm-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 mb-6 md:mb-8 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-pink-800 mb-4 md:mb-6 text-center">🎵 Songs That Remind Me of You 🎵</h2>
          <div className="space-y-3">
            {[
              { song: "That one you sent me at 3am", memory: "When we stayed up talking even though we both had to wake up early" },
              { song: "The Pokémon theme song (obviously)", memory: "Our gaming nights and how you'd always sing along" },
              { song: "Whatever was playing when we first connected", memory: "The moment I knew this was going to be special" },
              { song: "Happy songs", memory: "Because you always make me happy, even when I'm having a bad day" }
            ].map((item, index) => (
              <div key={index} className="bg-gradient-to-r from-soft-pink/20 to-soft-rose/20 rounded-2xl p-4 md:p-6 flex items-start gap-4">
                <span className="text-2xl">🎶</span>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-pink-700 mb-1">{item.song}</h3>
                  <p className="text-sm md:text-base text-pink-600 font-serif italic">{item.memory}</p>
                </div>
              </div>
            ))}
          </div>
        </section> */}

        {/* Our Inside Jokes */}
        <section className="bg-warm-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 mb-6 md:mb-8 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-pink-800 mb-4 md:mb-6 text-center">😂 Our Inside Jokes 😂</h2>
          <div className="space-y-4">
            {[
              { 
                emoji: "🦆", 
                title: "Psyduck Supremacy", 
                explanation: "The time we established - through extensive 'research' - that Psyduck is objectively the best Pokémon. The evidence was compelling. The science was sound. (It wasn't, but we believed it)"
              },
              { 
                emoji: "🎮", 
                title: "Legitimate Battle Strategies", 
                explanation: "Your completely fair and honest way of winning Pokémon battles. Totally not cheating. Just... strategic advantages. That you definitely didn't manipulate. (You absolutely did)"
              },
              { 
                emoji: "💕", 
                title: "The Secret Language", 
                explanation: "All the little things, the specific references, the shared moments that only we understand. Our own private world built inside jokes and shared memories."
              }
            ].map((item, index) => (
              <div key={index} className="bg-gradient-to-r from-soft-pink/30 to-soft-rose/30 rounded-2xl p-4 md:p-6 transform hover:scale-105 transition-transform">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{item.emoji}</span>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-pink-700 mb-2">{item.title}</h3>
                    <p className="text-pink-600 text-sm md:text-base font-serif">{item.explanation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* The Cheating Scale
        <section className="bg-warm-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 mb-6 md:mb-8 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-pink-800 mb-4 md:mb-6 text-center">📊 The Cheating Scale 📊</h2>
          <p className="text-pink-600 text-center mb-6 font-serif italic">A scientific analysis of your Pokémon battle 'skills'</p>
          <div className="space-y-4">
            {[
              { level: "100%", description: "You definitely cheat", color: "from-red-400 to-rose-500" },
              { level: "95%", description: "Probably cheating", color: "from-orange-400 to-amber-500" },
              { level: "50%", description: "Might be cheating (still suspicious)", color: "from-yellow-400 to-lime-500" },
              { level: "10%", description: "Actually playing fair (has this ever happened?)", color: "from-green-400 to-emerald-500" }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-gray-200 rounded-full h-8 overflow-hidden">
                  <div 
                    className={`bg-gradient-to-r ${item.color} h-full rounded-full transition-all duration-1000`}
                    style={{ width: item.level }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-pink-700 font-semibold text-sm md:text-base">{item.level}</span>
                  <span className="text-pink-600 font-serif text-sm md:text-base">{item.description}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <p className="text-pink-500 text-sm font-serif italic">Current level: 100% (surprise, surprise) 😏</p>
          </div>
        </section> */}

        {/* Cuddle Wishlist */}
        <section className="bg-warm-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 mb-6 md:mb-8 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-pink-800 mb-4 md:mb-6 text-center">🤗 Cuddle Wishlist 🤗</h2>
          <div className="space-y-3">
            {[
              "Cuddling while watching Pokémon movies",
              "Morning cuddles with coffee (or tea)",
              "Comfort cuddles after a bad day",
              "Lazy Sunday couch cuddles",
              "Cuddles during thunderstorms",
              "Just because cuddles (the best kind)",
              "Cuddles where we fall asleep together",
              "Cuddles that turn into tickle fights"
            ].map((item, index) => (
              <div key={index} className="bg-gradient-to-r from-soft-pink/20 to-soft-rose/20 rounded-2xl p-4 flex items-center gap-3">
                <span className="text-2xl">💕</span>
                <p className="text-pink-700 text-sm md:text-base font-serif">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Things I Learned From You */}
        <section className="bg-warm-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 mb-6 md:mb-8 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-pink-800 mb-4 md:mb-6 text-center">📚 Things I Learned From You 📚</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { lesson: "Chocolatine", detail: "Never pain au chocolat. Ever. ;)" },
              { lesson: "Communication", detail: "Even when it's hard, it's worth it" },
              { lesson: "Kindness", detail: "You show it to everyone, even when you don't have to" },
              { lesson: "Strength", detail: "You're stronger than you think" },
              { lesson: "Emotions", detail: "You showed me it was okay to show I'm scared" },
              { lesson: "Love", detail: "Real love isn't perfect, but it's always worth fighting for. You showed me how deeply I could love" }
            ].map((item, index) => (
              <div key={index} className="bg-soft-lavender/30 rounded-2xl p-4 md:p-6 transform hover:scale-105 transition-transform">
                <h3 className="text-lg md:text-xl font-semibold text-pink-700 mb-2">{item.lesson}</h3>
                <p className="text-pink-600 text-sm md:text-base font-serif">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Perfect Day */}
        <section className="bg-warm-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 mb-6 md:mb-8 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-pink-800 mb-4 md:mb-6 text-center">☀️ Our Perfect Day ☀️</h2>
          <div className="bg-gradient-to-br from-soft-pink/30 to-soft-rose/30 rounded-2xl p-4 md:p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <span className="text-2xl">🌅</span>
                <p className="text-pink-700 text-sm md:text-base font-serif">Wake up next to each other. No alarm. No distance. </p>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl">☕</span>
                <p className="text-pink-700 text-sm md:text-base font-serif">Slow morning with coffee/tea and cuddles. I WILL make pudding.</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl">🚶</span>
                <p className="text-pink-700 text-sm md:text-base font-serif">Walk through the city holding hands</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl">🍕</span>
                <p className="text-pink-700 text-sm md:text-base font-serif">Cook something together (or order pizza)</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl">🎮</span>
                <p className="text-pink-700 text-sm md:text-base font-serif">Watch a film. Play Pokemon. Cuddle. CUDDLE.</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl">🌙</span>
                <p className="text-pink-700 text-sm md:text-base font-serif">End the day exactly how we started - together</p>
              </div>
            </div>
            <p className="text-pink-600 text-center mt-6 font-serif italic text-sm md:text-base">
              The perfect day isn't about what we do. It's about who we're with. 💕
            </p>
          </div>
        </section>

        {/* Sticker Tolerance Meter
        <section className="bg-warm-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 mb-6 md:mb-8 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-pink-800 mb-4 md:mb-6 text-center">🤫 Sticker Tolerance Meter 🤫</h2>
          <p className="text-pink-600 text-center mb-6 font-serif italic">How much I can handle The Sticker™</p>
          <div className="flex justify-center mb-6">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="#FFD6E0"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="#ec4899"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray="553"
                  strokeDashoffset="442"
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl md:text-5xl font-bold text-pink-700">20%</span>
              </div>
            </div>
          </div>
          <div className="text-center space-y-2">
            <p className="text-pink-700 font-semibold text-lg">Conditions for increase:</p>
            <ul className="text-pink-600 text-sm md:text-base font-serif space-y-1">
              <li>• You use it less (significantly less)</li>
              <li>• I get extra cuddles that day</li>
              <li>• You let me win at Pokémon (legitimately)</li>
              <li>• You say really nice things about me</li>
            </ul>
            <p className="text-pink-500 text-sm font-serif italic mt-4">
              Current status: Low tolerance (but working on it... maybe) 🙄
            </p>
          </div>
        </section> */}

        {/* You in Tiny Details */}
        <section className="bg-warm-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 mb-6 md:mb-8 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-pink-800 mb-4 md:mb-6 text-center">✨ You in Tiny Details ✨</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { emoji: "🇪🇸", detail: "Madrid" },
              { emoji: "🐸", detail: "Frogs" },
              { emoji: "💀", detail: "Bitch killer Pokémon" },
              { emoji: "🌙", detail: "No sleep schedule" },
              { emoji: "🗣️", detail: "The accent" },
              { emoji: "📸", detail: "Cute selfies" },
              { emoji: "🕊️", detail: "Pigeon army" },
              { emoji: "💕", detail: "Everything that makes you you" }
            ].map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-soft-pink/30 to-soft-rose/30 rounded-2xl p-4 text-center transform hover:scale-105 transition-transform">
                <span className="text-3xl mb-2 block">{item.emoji}</span>
                <p className="text-pink-700 text-sm md:text-base font-serif">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* If You Were Here Right Now */}
        <section className="bg-warm-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 mb-6 md:mb-8 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-pink-800 mb-4 md:mb-6 text-center">💭 If You Were Here Right Now 💭</h2>
          <div className="space-y-4">
            {[
              { emoji: "🤗", title: "Hugs", detail: "So many hugs. The kind where you don't let go for a long time. The kind where everything else disappears." },
              { emoji: "🍕", title: "Food", detail: "I'd make you something. Or we'd order. Doesn't matter. Just us, eating together, being together." },
              { emoji: "💬", title: "Talking", detail: "About everything. About nothing. Just the sound of your voice, in person, no screens, no distance." },
              { emoji: "😴", title: "Sleep", detail: "Falling asleep next to you. Waking up next to you. The simple, perfect luxury of being there." },
              { emoji: "🤗", title: "MORE HUGS", detail: "Did I mention hugs? Because I really, really want to hug you. A lot. Always." }
            ].map((item, index) => (
              <div key={index} className="bg-gradient-to-r from-soft-pink/20 to-soft-rose/20 rounded-2xl p-4 md:p-6 flex items-start gap-4 transform hover:scale-105 transition-transform">
                <span className="text-3xl">{item.emoji}</span>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-pink-700 mb-1">{item.title}</h3>
                  <p className="text-pink-600 text-sm md:text-base font-serif">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Animated Letter Section */}
        <section className="mb-6 md:mb-8">
          <div className="max-w-2xl mx-auto">
            {!letterOpen ? (
              // Closed Envelope
              <div 
                onClick={() => {
                  setLetterAnimating(true)
                  setTimeout(() => setLetterOpen(true), 500)
                }}
                className="relative cursor-pointer transform hover:scale-105 transition-transform duration-300"
              >
                {/* Envelope */}
                <div className="bg-gradient-to-br from-pink-200 to-rose-300 rounded-lg shadow-2xl p-4 md:p-6 relative overflow-hidden">
                  {/* Envelope flap */}
                  <div className="absolute top-0 left-0 right-0 h-32 md:h-40 bg-gradient-to-br from-pink-300 to-rose-400 transform origin-top transition-transform duration-700"
                       style={{ clipPath: 'polygon(0 0, 50% 100%, 100% 0)' }}>
                  </div>
                  
                  {/* Heart seal */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl md:text-8xl float-animation">
                    💕
                  </div>
                  
                  {/* Click instruction */}
                  <div className="absolute bottom-4 left-0 right-0 text-center">
                    <p className="text-pink-700 font-serif text-sm md:text-base animate-pulse">
                      Click to open 💌
                    </p>
                  </div>

                  {/* Decorative corners */}
                  <div className="absolute top-2 left-2 text-2xl">🌸</div>
                  <div className="absolute top-2 right-2 text-2xl">🌸</div>
                  <div className="absolute bottom-2 left-2 text-2xl">🌸</div>
                  <div className="absolute bottom-2 right-2 text-2xl">🌸</div>
                </div>
              </div>
            ) : (
              // Open Letter
              <div className="relative">
                {/* Paper */}
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg shadow-2xl p-6 md:p-8 relative overflow-hidden transform transition-all duration-1000"
                     style={{ animation: 'unfold 1s ease-out' }}>
                  
                  {/* Paper texture overlay */}
                  <div className="absolute inset-0 opacity-10 pointer-events-none"
                       style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 3px)' }}>
                  </div>

                  {/* Decorative border */}
                  <div className="absolute inset-2 border-2 border-pink-300 rounded pointer-events-none"></div>
                  <div className="absolute inset-4 border border-pink-200 rounded pointer-events-none"></div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-pink-800 mb-6 text-center font-serif">
                      Yohan,
                    </h2>
                    
                    <div className="text-pink-700 text-base md:text-lg leading-relaxed font-serif space-y-4">
                      <p className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                        I don't really know how to write this without making it sound like I'm trying to convince you of something.
                      </p>
                      
                      <p className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
                        Maybe I am a little.
                      </p>
                      
                      <p className="animate-fade-in" style={{ animationDelay: '0.9s' }}>
                        But mostly, I just want you to know what you meant to me.
                      </p>
                      
                      <p className="animate-fade-in" style={{ animationDelay: '1.2s' }}>
                        I don't think I'll ever forget how something as stupid as arguing about whether it's chocolatine or pain au chocolat could become an actual part of our relationship. Or Ratatouille in Leuven. Or frogs, Pokémon, stickers, ravioli, your cute French accent and all the other completely random things that somehow became you.
                      </p>
                      
                      <p className="animate-fade-in" style={{ animationDelay: '1.5s' }}>
                        I don't think I fell in love with one big thing about you.
                      </p>
                      
                      <p className="animate-fade-in" style={{ animationDelay: '1.8s' }}>
                        I fell in love with hundreds of tiny things.
                      </p>
                      
                      <p className="animate-fade-in" style={{ animationDelay: '2.1s' }}>
                        The way you get excited about things other people might overlook. The way you talk about things you care about. Your stupid jokes. Your selfies. Your weird little habits. The way you care for every living being.
                      </p>
                      
                      <p className="animate-fade-in" style={{ animationDelay: '2.4s' }}>
                        And somehow, somewhere between all those little things, you became home to me.
                      </p>
                      
                      <p className="animate-fade-in" style={{ animationDelay: '2.7s' }}>
                        I know what you decided.
                      </p>
                      
                      <p className="animate-fade-in" style={{ animationDelay: '3.0s' }}>
                        I know you don't want to live in a long-distance relationship for years. I know you don't want to wait for a future that neither of us can guarantee. And I know that you didn't make this decision because you suddenly stopped caring about me.
                      </p>
                      
                      <p className="animate-fade-in" style={{ animationDelay: '3.3s' }}>
                        I believe you when you say that.
                      </p>
                      
                      <p className="animate-fade-in" style={{ animationDelay: '3.6s' }}>
                        What I don't agree with is that the only possible answer to our problems is to stop being us.
                      </p>
                      
                      <p className="animate-fade-in" style={{ animationDelay: '3.9s' }}>
                        If something in our relationship hurts, I want to talk about it. I want to understand it. I want to try things differently. I want us to have the chance to actually see what we can build when we both know what the problems are.
                      </p>
                      
                      <p className="animate-fade-in" style={{ animationDelay: '4.2s' }}>
                        Maybe that still wouldn't work.
                      </p>
                      
                      <p className="animate-fade-in" style={{ animationDelay: '4.5s' }}>
                        I can't promise that it would.
                      </p>
                      
                      <p className="animate-fade-in" style={{ animationDelay: '4.8s' }}>
                        But I know that if I never tried, I would always wonder.
                      </p>
                      
                      <p className="animate-fade-in" style={{ animationDelay: '5.1s' }}>
                        So yes, I'm still here. I'm still hoping. I'm still loving you. And I believe we can figure this out together.
                      </p>
                      
                      <p className="animate-fade-in" style={{ animationDelay: '5.4s' }}>
                        And I'm not asking you to promise me anything.
                      </p>
                      
                      <p className="animate-fade-in" style={{ animationDelay: '5.7s' }}>
                        I just know that I loved what we had.
                      </p>
                      
                      <p className="animate-fade-in" style={{ animationDelay: '6.0s' }}>
                        I loved the stupid jokes and the serious conversations. I loved our little rituals. I loved planning things that were still months away. I loved imagining a completely ordinary day with you: waking up next to you, arguing about breakfast, going somewhere for no reason, cooking together, watching something stupid, cuddling until one of us falls asleep.
                      </p>
                      
                      <p className="animate-fade-in" style={{ animationDelay: '6.3s' }}>
                        Nothing spectacular.
                      </p>
                      
                      <p className="animate-fade-in" style={{ animationDelay: '6.6s' }}>
                        Just you.
                      </p>
                      
                      <p className="animate-fade-in" style={{ animationDelay: '6.9s' }}>
                        Just us.
                      </p>
                      
                      <p className="animate-fade-in" style={{ animationDelay: '7.2s' }}>
                        That's what I wanted.
                      </p>
                      
                      <p className="animate-fade-in" style={{ animationDelay: '7.5s' }}>
                        And that's what I'll remember.
                      </p>
                      
                      <p className="animate-fade-in" style={{ animationDelay: '7.8s' }}>
                        Whatever happens from here, I hope you never doubt that you were deeply, genuinely loved.
                      </p>
                      
                      <p className="animate-fade-in" style={{ animationDelay: '8.1s' }}>
                        And I hope you always know that. And whenever you're ready to give this another shot and work on this with me, just click the button.
                      </p>
                      
                      <p className="animate-fade-in text-center text-xl md:text-2xl mt-6" style={{ animationDelay: '8.4s' }}>
                        I love you, my beautiful sweet boy.
                      </p>
                    </div>

                    {/* Signature */}
                    <div className="mt-8 text-right animate-fade-in" style={{ animationDelay: '8.7s' }}>
                      <p className="text-pink-700 font-serif text-lg md:text-xl italic">
                        💕
                      </p>
                    </div>
                  </div>

                  {/* Floating hearts */}
                  <div className="absolute top-4 left-4 text-2xl float-animation" style={{ animationDelay: '0s' }}>💕</div>
                  <div className="absolute top-8 right-8 text-xl float-animation" style={{ animationDelay: '0.5s' }}>💗</div>
                  <div className="absolute bottom-12 left-8 text-2xl float-animation" style={{ animationDelay: '1s' }}>💖</div>
                  <div className="absolute bottom-8 right-12 text-xl float-animation" style={{ animationDelay: '1.5s' }}>💝</div>
                  <div className="absolute top-1/3 left-6 text-lg float-animation" style={{ animationDelay: '2s' }}>💕</div>
                  <div className="absolute top-1/2 right-6 text-lg float-animation" style={{ animationDelay: '2.5s' }}>💗</div>
                </div>

                {/* Close button */}
                <div className="text-center mt-4">
                  <button
                    onClick={() => setLetterOpen(false)}
                    className="text-pink-600 hover:text-pink-800 font-serif text-sm md:text-base underline"
                  >
                    Close letter ✉️
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* CTA Button */}
        <div className="text-center">
          {!showDialog && !showSuccess && (
            <button
              onClick={() => setShowDialog(true)}
              className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-lg md:text-xl px-8 md:px-12 py-3 md:py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 font-semibold pulse-animation"
            >
              💗 I Have Something To Ask You 💗
            </button>
          )}
        </div>

        {/* Dialog */}
        {showDialog && !showSuccess && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-warm-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-pink-800 mb-4">💕 One Question 💕</h2>
              <p className="text-lg md:text-xl text-pink-700 mb-6 md:mb-8 font-serif">
                Would you like to give us another try?
              </p>
              {noMessage && (
                <p className="text-pink-600 mb-4 font-serif italic text-base md:text-lg">
                  {noMessage}
                </p>
              )}
              <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6 relative">
                <button
                  onClick={handleYesClick}
                  className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-base md:text-lg px-6 md:px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold"
                >
                  Yes! 💕
                </button>
                <button
                  onMouseEnter={handleNoHover}
                  onTouchStart={handleNoTouch}
                  style={{
                    transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
                    transition: 'transform 0.3s ease-out'
                  }}
                  className="bg-gray-300 text-gray-600 text-base md:text-lg px-6 md:px-8 py-3 rounded-full shadow-md hover:shadow-lg font-semibold"
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
              <div className="text-6xl md:text-8xl mb-4 md:mb-6 float-animation">💕</div>
              <h2 className="text-4xl md:text-5xl font-bold text-pink-800 mb-4">Yay! 💕</h2>
              <p className="text-xl md:text-2xl text-pink-700 mb-6 md:mb-8 font-serif">
                I'm so happy! Let's make this work, together. 💗
              </p>
              <div className="text-4xl md:text-6xl pulse-animation">🎉💝🎉</div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-6 md:py-8 text-pink-600">
        <p className="text-base md:text-lg font-serif">Made with 💕 just for you</p>
        {/* copyright */}
        <p className="text-sm md:text-base text-pink-500 mt-2">
          © 2025 <a href="https://lukaverbrugghe.github.io/luka-verbrugghe-io/" target="_blank" rel="noopener noreferrer">Luka Verbrugghe</a> & Yohan. All rights reserved.
        </p>
      </footer>
        </>
      )}
    </div>
  )
}

export default App
