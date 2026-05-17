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