export const playErrorSound = () => {

  const audio = new Audio(
    "https://www.myinstants.com/media/sounds/windows-error.mp3"
  )
  audio.volume = 0.5
  audio.play()
}