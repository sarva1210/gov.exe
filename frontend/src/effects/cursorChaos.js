let cursorSize = 24;

export const cursorChaos = () => {
  // Rage Cursor: Click events grow the cursor size
  document.addEventListener("click", () => {
    cursorSize = Math.min(cursorSize + 16, 300); // Caps out at 300px to keep it manageable but absurd
    const cursor = document.getElementById("chaos-cursor");
    if (cursor) {
      cursor.style.width = `${cursorSize}px`;
      cursor.style.height = `${cursorSize}px`;
      cursor.style.boxShadow = `0 0 ${cursorSize}px rgba(239, 68, 68, 0.8)`;
    }
  });

  document.addEventListener("mousemove", (e) => {
    const randomX = Math.random() * 10 - 5;
    const randomY = Math.random() * 10 - 5;
    const cursor = document.getElementById("chaos-cursor");

    if (cursor) {
      cursor.style.left = `${e.clientX + randomX}px`;
      cursor.style.top = `${e.clientY + randomY}px`;
    }
  });
};