export const playErrorSound = () => {
  const audio = new Audio("/sounds/huh.mp3")
  audio.volume = 0.7
  audio.play()
}