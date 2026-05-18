import React, { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

// Web Audio synths for retro sound effects
const playSynthExplosion = () => {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)()

    // Noise buffer
    const bufferSize = audioCtx.sampleRate * 1.5
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }

    const noise = audioCtx.createBufferSource()
    noise.buffer = buffer

    // Filter to make it a deep explosion
    const filter = audioCtx.createBiquadFilter()
    filter.type = "lowpass"
    filter.frequency.setValueAtTime(800, audioCtx.currentTime)
    filter.frequency.exponentialRampToValueAtTime(10, audioCtx.currentTime + 1.2)

    // Gain node for decay
    const gainNode = audioCtx.createGain()
    gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1.4)

    noise.connect(filter)
    filter.connect(gainNode)
    gainNode.connect(audioCtx.destination)

    noise.start()

    // Add a deep bass rumble oscillator
    const osc = audioCtx.createOscillator()
    const oscGain = audioCtx.createGain()

    osc.type = "sawtooth"
    osc.frequency.setValueAtTime(100, audioCtx.currentTime)
    osc.frequency.linearRampToValueAtTime(10, audioCtx.currentTime + 1.0)

    oscGain.gain.setValueAtTime(0.4, audioCtx.currentTime)
    oscGain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1.0)

    osc.connect(oscGain)
    oscGain.connect(audioCtx.destination)
    osc.start()
    osc.stop(audioCtx.currentTime + 1.2)
  } catch (e) {
    console.error("Web Audio explosion failed", e)
  }
}

const playFuneralMusic = () => {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)()

    const C3 = 130.81
    const D3 = 146.83
    const Eb3 = 155.56

    const melody = [
      { f: C3, d: 0.8 },
      { f: C3, d: 0.8 },
      { f: C3, d: 0.8 },
      { f: C3, d: 0.6 },
      { f: Eb3, d: 0.4 },
      { f: D3, d: 0.6 },
      { f: D3, d: 0.6 },
      { f: C3, d: 1.2 }
    ]

    let time = audioCtx.currentTime
    melody.forEach((note) => {
      const osc = audioCtx.createOscillator()
      const gain = audioCtx.createGain()

      osc.type = "triangle"
      osc.frequency.setValueAtTime(note.f, time)

      gain.gain.setValueAtTime(0.2, time)
      gain.gain.exponentialRampToValueAtTime(0.001, time + note.d - 0.05)

      osc.connect(gain)
      gain.connect(audioCtx.destination)

      osc.start(time)
      osc.stop(time + note.d)

      time += note.d
    })
    return audioCtx
  } catch (e) {
    console.error("Web Audio funeral melody failed", e)
    return null
  }
}

export default function VirusCatastrophe({ onComplete }) {
  // states: 'walking'  'sitting'  'bomb'  'blast'  'funeral'
  const [phase, setPhase] = useState("walking")
  const [countdown, setCountdown] = useState(3)
  const [meowText, setMeowText] = useState("")
  const audioCtxRef = useRef(null)

  // Timing constants (in ms)
  const WALK_DURATION = 6000
  const SIT_DURATION = 23000
  const BOMB_DURATION = 3500
  const BLAST_DURATION = 1500
  const FUNERAL_DURATION = 5000

  useEffect(() => {
    // 1. Walk phase
    const walkTimer = setTimeout(() => {
      setPhase("sitting")
    }, WALK_DURATION)

    return () => clearTimeout(walkTimer)
  }, [])

  useEffect(() => {
    if (phase !== "sitting") return

    // Cat funny speech bubbles
    const meows = [
      "meow?",
      "Purrr... antivirus is tasty 😋",
      "Is this a government PC? Let me nap here",
      "I sit where I fit.",
      "Security scanning: 100% CUTE 🐾"
    ]

    let meowIdx = 0
    setMeowText(meows[0])

    const meowInterval = setInterval(() => {
      meowIdx = (meowIdx + 1) % meows.length
      setMeowText(meows[meowIdx])
    }, 3500)

    const sitTimer = setTimeout(() => {
      clearInterval(meowInterval)
      setPhase("bomb")
    }, SIT_DURATION)

    return () => {
      clearInterval(meowInterval)
      clearTimeout(sitTimer)
    }
  }, [phase])

  // Bomb countdown logic
  useEffect(() => {
    if (phase !== "bomb") return

    const cTimer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(cTimer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    const bombTimer = setTimeout(() => {
      clearInterval(cTimer)
      setPhase("blast")
      playSynthExplosion()
    }, BOMB_DURATION)

    return () => {
      clearInterval(cTimer)
      clearTimeout(bombTimer)
    }
  }, [phase])

  // Blast phase logic
  useEffect(() => {
    if (phase !== "blast") return

    const blastTimer = setTimeout(() => {
      setPhase("funeral")
    }, BLAST_DURATION)

    return () => clearTimeout(blastTimer)
  }, [phase])

  // Funeral phase logic
  useEffect(() => {
    if (phase !== "funeral") return

    const activeCtx = playFuneralMusic()
    if (activeCtx) {
      audioCtxRef.current = activeCtx
    }

    const funeralTimer = setTimeout(() => {
      onComplete()
    }, FUNERAL_DURATION)

    return () => {
      clearTimeout(funeralTimer)
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close()
        } catch (e) {
          console.error(e)
        }
      }
    }
  }, [phase, onComplete])

  // Flower Shower particle generator
  const flowers = Array.from({ length: 50 }).map((_, i) => {
    const emojis = ["🌹", "🌸", "🌷", "💐", "🌻", "💮", "🌺", "🥀"]
    return {
      id: i,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 8}s`,
      duration: `${5 + Math.random() * 6}s`,
      scale: 0.5 + Math.random() * 1.0,
      spin: Math.random() * 360
    }
  })

  return (
    <div className="fixed inset-0 z-[99999] pointer-events-auto select-none overflow-hidden font-mono">
      {/* CSS Styles for animations */}
      <style>{`
        @keyframes flower-fall {
          0% {
            top: -10%;
            transform: translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            top: 110%;
            transform: translateX(100px) rotate(360deg);
            opacity: 0.2;
          }
        }
        .flower-particle {
          position: absolute;
          animation-name: flower-fall;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
        }
        @keyframes float-text {
          0% {
            transform: translateY(10px);
            opacity: 0;
          }
          15% {
            transform: translateY(0);
            opacity: 1;
          }
          85% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(-15px);
            opacity: 0;
          }
        }
        .floating-bubble {
          animation: float-text 3.5s ease-in-out infinite;
        }
        @keyframes bomb-fuse {
          0%, 100% { transform: scale(1) rotate(0deg); filter: drop-shadow(0 0 5px orange); }
          50% { transform: scale(1.3) rotate(15deg); filter: drop-shadow(0 0 10px red); }
        }
        .fuse-spark {
          animation: bomb-fuse 0.2s infinite;
        }
        @keyframes screen-shake-violent {
          0% { transform: translate(0, 0); }
          10% { transform: translate(-8px, 5px) rotate(-1deg); }
          20% { transform: translate(8px, -5px) rotate(1deg); }
          30% { transform: translate(-5px, -8px) rotate(-1.5deg); }
          40% { transform: translate(5px, 8px) rotate(1.5deg); }
          50% { transform: translate(-8px, 2px) rotate(-0.5deg); }
          60% { transform: translate(8px, -2px) rotate(0.5deg); }
          75% { transform: translate(-3px, 5px) rotate(1deg); }
          90% { transform: translate(3px, -5px) rotate(-1deg); }
          100% { transform: translate(0, 0); }
        }
        .violent-shake {
          animation: screen-shake-violent 0.15s infinite;
        }
      `}</style>

      {/* FREEZE OVERLAY FOR MAIN INTERACTIVE PHASES */}
      {phase !== "funeral" && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex flex-col items-center justify-start pointer-events-auto">
          {/* Warning Banner at the top */}
          <div className="w-full bg-red-700 text-white border-b border-red-500 py-2 text-center text-xs font-bold uppercase tracking-widest animate-pulse">
            ⚠️ SYSTEM FREEZE — ANTIVIRUS CORRUPTION CRITICAL ERROR ⚠️
          </div>
        </div>
      )}

      {/* PHASE 1: WALKING CAT */}
      {phase === "walking" && (
        <motion.div
          className="absolute flex flex-col items-center pointer-events-none"
          initial={{ x: "-200px", y: "50vh", rotate: -15 }}
          animate={{
            x: ["-200px", "20vw", "50vw", "75vw", "42vw"],
            y: ["50vh", "20vh", "65vh", "30vh", "40vh"],
            rotate: [-15, 15, -15, 15, -10, 10, 0],
            scaleX: [1, 1, 1, 1, -1]
          }}
          transition={{
            duration: 6,
            ease: "easeInOut"
          }}
          style={{ width: "220px", height: "220px" }}
        >
          <img
            src="/cat.gif"
            alt="walking cat"
            className="w-full h-full object-contain"
          />
          <span className="text-xs bg-black text-white px-2 py-0.5 rounded border border-green-500 mt-2 whitespace-nowrap opacity-80 animate-pulse">
            prowling...
          </span>
        </motion.div>
      )}

      {/* PHASE 2: SITTING CAT */}
      {phase === "sitting" && (
        <div
          className="absolute flex flex-col items-center pointer-events-none"
          style={{ left: "42vw", top: "35vh", width: "220px", height: "220px" }}
        >
          {/*Speech Bubble */}
          <div className="floating-bubble absolute bottom-56 bg-white text-black font-mono text-sm px-4 py-2 border-2 border-black rounded-xl shadow-lg whitespace-nowrap max-w-xs text-center flex flex-col items-center">
            <span className="font-bold">{meowText}</span>
            <div className="w-3 h-3 bg-white border-r-2 border-b-2 border-black rotate-45 mt-2 -mb-3"></div>
          </div>

          <img
            src={meowText === "Is this a government PC? Let me nap here" ? "/cat1.gif" : "/cat.gif"}
            alt="sitting cat"
            className="w-full h-full object-contain"
          />
          <span className="text-xs bg-black text-white px-2 py-0.5 rounded border border-yellow-500 mt-2 whitespace-nowrap opacity-80 animate-pulse">
            antivirus_hostage.sh
          </span>
        </div>
      )}

      {/* PHASE 3: BOMB APPEARANCE */}
      {phase === "bomb" && (
        <div
          className="absolute flex flex-col items-center pointer-events-none"
          style={{ left: "42vw", top: "35vh", width: "220px", height: "220px" }}
        >
          {/* Speech bubble showing panic */}
          <div className="absolute bottom-56 bg-red-600 text-white font-mono text-sm px-4 py-2 border-2 border-white rounded-xl shadow-lg whitespace-nowrap text-center animate-bounce">
            😱 MEOW?! IS THAT A BOMB?!
            <div className="w-3 h-3 bg-red-600 border-r-2 border-b-2 border-white rotate-45 mx-auto mt-2 -mb-3"></div>
          </div>

          {/* Falling Bomb */}
          <motion.div
            className="absolute -top-36 left-28 flex flex-col items-center z-50"
            initial={{ y: -300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
          >
            <div className="relative text-7xl">
              <span>💣</span>
              <span className="fuse-spark absolute -top-4 -right-1 text-3xl">⚡</span>
            </div>
            <span className="text-xs font-bold text-red-500 bg-black px-1.5 border border-red-500 rounded mt-1 animate-pulse">
              DETONATION IN {countdown}s
            </span>
          </motion.div>

          <img
            src="/cat.gif"
            alt="panicking cat"
            className="w-full h-full object-contain"
          />
        </div>
      )}

      {/* PHASE 4: BLAST EFFECT */}
      {phase === "blast" && (
        <div className="absolute inset-0 bg-white flex items-center justify-center violent-shake z-[999999]">
          {/* Explosion Flash & Ring */}
          <motion.div
            className="rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 border-8 border-yellow-300"
            initial={{ scale: 0.1, opacity: 1 }}
            animate={{ scale: 8, opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ width: "100px", height: "100px" }}
          />
          <div className="absolute flex flex-col items-center text-center">
            <span className="text-9xl animate-ping">💥</span>
            <span className="text-4xl font-extrabold text-red-700 bg-white border-4 border-red-700 px-8 py-4 font-mono shadow-2xl mt-4">
              KABOOM!
            </span>
          </div>
        </div>
      )}

      {/* PHASE 5: FUNERAL / COFFIN SCENE */}
      {phase === "funeral" && (
        <div className="absolute inset-0 bg-neutral-950 flex flex-col items-center justify-center p-6 border-[12px] border-amber-800 pointer-events-auto">
          {/* Flower Shower particles */}
          {flowers.map((flower) => (
            <div
              key={flower.id}
              className="flower-particle text-3xl"
              style={{
                left: flower.left,
                animationDelay: flower.delay,
                animationDuration: flower.duration,
                fontSize: `${flower.scale * 1.5}rem`,
                transform: `rotate(${flower.spin}deg)`,
              }}
            >
              {flower.emoji}
            </div>
          ))}

          {/* Coffin Scene Box */}
          <motion.div
            className="flex flex-col items-center text-center max-w-lg w-full bg-neutral-900 border-4 border-amber-600 p-8 shadow-[0_0_50px_rgba(139,92,26,0.3)] rounded-lg relative overflow-hidden"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 1.5, type: "spring" }}
          >
            {/* Candle left */}
            <div className="absolute left-6 top-8 text-3xl animate-pulse">🕯️</div>
            {/* Candle right */}
            <div className="absolute right-6 top-8 text-3xl animate-pulse">🕯️</div>

            {/* Gothic Header */}
            <h2 className="text-amber-500 font-serif text-3xl tracking-widest border-b-2 border-amber-700 pb-2 mb-6">
              SACRED OBITUARY
            </h2>

            {/* The Coffin */}
            <div className="text-8xl my-6 animate-bounce" style={{ filter: "drop-shadow(0 15px 15px rgba(0,0,0,0.8))" }}>
              ⚰️
            </div>

            {/* RIP Plaque */}
            <div className="bg-neutral-950 border-2 border-amber-600 text-amber-500 font-serif px-6 py-4 rounded shadow-inner w-full my-4">
              <p className="text-2xl font-bold tracking-wider mb-1">R. I. P.</p>
              <p className="text-xl font-bold uppercase tracking-widest text-white">GOVERNMENT ANTIVIRUS</p>
              <p className="text-xs text-neutral-400 mt-2 font-mono">
                BORN: 2026-05-17  |  DIED: TRAGIC CAT ACCIDENT
              </p>
            </div>

            {/* Funeral Eulogy */}
            <p className="text-neutral-300 font-mono text-sm leading-relaxed my-4 italic">
              "It served the nation by raising emotional distress scores and failing to quarantine virtual pests. Its final sacrifice to the orange feline of chaos shall not be in vain."
            </p>

            {/* Progress/Timer Bar */}
            <div className="w-full bg-neutral-950 h-2 mt-6 rounded overflow-hidden border border-amber-800">
              <motion.div
                className="bg-amber-600 h-full"
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 5, ease: "linear" }}
              />
            </div>
            <p className="text-[10px] text-amber-700 mt-2 font-mono">
              PREPARING TO DEPORT SOUL TO DESKTOP IN 5 SECONDS...
            </p>
          </motion.div>
        </div>
      )}
    </div>
  )
}
