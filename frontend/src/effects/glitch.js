export const glitchScreen = () => {
  document.body.style.filter = "hue-rotate(90deg)"
  document.body.style.transform = "scale(1.01)"

  setTimeout(() => {
    document.body.style.filter = "none"
    document.body.style.transform = "scale(1)"
  },300)
}