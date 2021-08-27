export const to2Letters = (num: number) => {
  if (num < 10) { return `0${num}` }
  return `${num}`
}
