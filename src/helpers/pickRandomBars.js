export default bars => {
  let nbrOfBarsWanted = 4,
    numberOfBars = bars.length,
    randomBars = new Array(nbrOfBarsWanted)

  while (nbrOfBarsWanted--) {
    const appendBar = () => {
      const x = Math.floor(Math.random() * bars.length)
      if (randomBars.includes(bars[x])) {
        return appendBar()
      } else {
        return bars[x]
      }
    }
    randomBars[nbrOfBarsWanted] = appendBar()
  }
  return randomBars
}
