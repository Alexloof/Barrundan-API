export default bars => {
  let selectCount = 4,
    numberOfBars = bars.length,
    generatedBars = new Array(selectCount),
    selectedBars = new Array(numberOfBars)

  while (selectCount--) {
    const bar = Math.floor(Math.random() * bars.length)
    generatedBars[selectCount] =
      bars[bar in selectedBars ? selectedBars[bar] : bar]
    selectedBars[bar] = --numberOfBars
  }
  return generatedBars
}
