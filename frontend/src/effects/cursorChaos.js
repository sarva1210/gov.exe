export const cursorChaos = () => {
  document.addEventListener("mousemove", (e) => {
    const randomX = Math.random() * 10 - 5
    const randomY = Math.random() * 10 - 5
    const cursor = document.getElementById("chaos-cursor")

    if(cursor){
      cursor.style.left = `${e.clientX + randomX}px`
      cursor.style.top = `${e.clientY + randomY}px`
    }
  })
}