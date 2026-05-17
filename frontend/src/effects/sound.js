// ── Core oscillator helper ────────────────────────────────────────────────────
const beep = (freq, duration, type = "square", volume = 0.3) => {
  try {
    const ac = new (window.AudioContext || window.webkitAudioContext)()
    const osc = ac.createOscillator()
    const gain = ac.createGain()
    osc.connect(gain)
    gain.connect(ac.destination)
    osc.type = type
    osc.frequency.value = freq
    gain.gain.setValueAtTime(volume, ac.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + duration / 1000)
    osc.start()
    osc.stop(ac.currentTime + duration / 1000)
  } catch (e) {}
}

export const playErrorSound = () => {
  const audio = new Audio("/sounds/huh.mp3")
  audio.volume = 0.7
  audio.play().catch(() => {})
}

export const playDodgeSound  = () => beep(900,  80,  "sine",     0.2)
export const playPopupSound  = () => beep(200,  250, "sawtooth", 0.3)
export const playBSODSound   = () => beep(80,   900, "square",   0.4)
export const playAdSound     = () => beep(1400, 100, "triangle", 0.2)
export const playWindowSound = () => beep(600,  120, "sine",     0.15)
export const playTypingSound = () => beep(
  [300, 400, 500, 350, 450][Math.floor(Math.random() * 5)],
  40, "square", 0.05
)

export const playDialupSound = () => {
  try {
    const ac = new (window.AudioContext || window.webkitAudioContext)()
    // Two oscillators doing rapid alternating frequency sweeps
    const osc1 = ac.createOscillator()
    const osc2 = ac.createOscillator()
    const gain = ac.createGain()
    osc1.connect(gain); osc2.connect(gain)
    gain.connect(ac.destination)
    gain.gain.setValueAtTime(0.12, ac.currentTime)

    osc1.type = "sawtooth"
    osc2.type = "square"

    const t = ac.currentTime
    // Rapid chirping sweep pattern
    const freqs1 = [1200, 2400, 1200, 2400, 900, 2100, 1500, 2400]
    const freqs2 = [2400, 1200, 2400, 1200, 2400, 900,  2100, 1200]
    freqs1.forEach((f, i) => osc1.frequency.setValueAtTime(f, t + i * 0.3))
    freqs2.forEach((f, i) => osc2.frequency.setValueAtTime(f, t + i * 0.3))

    gain.gain.exponentialRampToValueAtTime(0.001, t + 2.5)
    osc1.start(t); osc2.start(t)
    osc1.stop(t + 2.5); osc2.stop(t + 2.5)
  } catch (e) {}
}

export const playStartupJingle = () => {
  try {
    const ac = new (window.AudioContext || window.webkitAudioContext)()
    const notes = [
      { freq: 523,  time: 0.0, dur: 0.35 }, 
      { freq: 659,  time: 0.25, dur: 0.35 }, 
      { freq: 784,  time: 0.5,  dur: 0.45 }, 
      { freq: 1047, time: 0.85, dur: 0.55 }, 
      { freq: 880,  time: 1.2,  dur: 0.9  }, 
    ]
    notes.forEach(({ freq, time, dur }) => {
      const osc  = ac.createOscillator()
      const gain = ac.createGain()
      osc.connect(gain); gain.connect(ac.destination)
      osc.type = "sine"
      osc.frequency.value = freq
      const start = ac.currentTime + time
      gain.gain.setValueAtTime(0, start)
      gain.gain.linearRampToValueAtTime(0.18, start + 0.04)
      gain.gain.exponentialRampToValueAtTime(0.001, start + dur)
      osc.start(start); osc.stop(start + dur)
    })
  } catch (e) {}
}

export const playSadTrombone = () => {
  try {
    const ac = new (window.AudioContext || window.webkitAudioContext)()
    const notes = [
      { freq: 466, time: 0.0, dur: 0.55 },
      { freq: 415, time: 0.45, dur: 0.55 },
      { freq: 370, time: 0.9,  dur: 0.55 },
      { freq: 311, time: 1.35, dur: 1.3  },
    ]
    notes.forEach(({ freq, time, dur }) => {
      const osc  = ac.createOscillator()
      const gain = ac.createGain()
      osc.connect(gain); gain.connect(ac.destination)
      osc.type = "sawtooth"
      const start = ac.currentTime + time
      // Slight portamento slide down for trombone feel
      osc.frequency.setValueAtTime(freq * 1.04, start)
      osc.frequency.linearRampToValueAtTime(freq, start + 0.12)
      gain.gain.setValueAtTime(0.25, start)
      gain.gain.exponentialRampToValueAtTime(0.001, start + dur)
      osc.start(start); osc.stop(start + dur + 0.05)
    })
  } catch (e) {}
}


export const playCashRegister = () => {
  try {
    const ac = new (window.AudioContext || window.webkitAudioContext)()

    // High bell ping
    const bell = ac.createOscillator()
    const bellGain = ac.createGain()
    bell.connect(bellGain); bellGain.connect(ac.destination)
    bell.type = "sine"
    bell.frequency.value = 2800
    bellGain.gain.setValueAtTime(0.35, ac.currentTime)
    bellGain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.4)
    bell.start(); bell.stop(ac.currentTime + 0.4)

    // Lower "ching" click
    const click = ac.createOscillator()
    const clickGain = ac.createGain()
    click.connect(clickGain); clickGain.connect(ac.destination)
    click.type = "square"
    click.frequency.value = 320
    clickGain.gain.setValueAtTime(0.18, ac.currentTime + 0.06)
    clickGain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.45)
    click.start(ac.currentTime + 0.06); click.stop(ac.currentTime + 0.45)
  } catch (e) {}
}