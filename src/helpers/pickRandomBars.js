export default (bars, numberOfBarsWanted) => {
  let randomBars = new Array(numberOfBarsWanted)

  while (numberOfBarsWanted--) {
    const appendBar = () => {
      const x = Math.floor(Math.random() * bars.length)
      if (randomBars.includes(bars[x])) {
        return appendBar()
      } else {
        return bars[x]
      }
    }
    randomBars[numberOfBarsWanted] = appendBar()
  }
  return randomBars
}
