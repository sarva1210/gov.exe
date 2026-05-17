let rage = 0

export const increaseRage = () => {
  rage += 10
  console.log("Rage Level:", rage)
}

export const getRage = () => {
  return rage
}