// SJÄLVA SORT FUNKTIONEN!! INGEN TRAVELING SALESMAN.. blublublub
// Tar barerna som är längst ifrån varandra. Väljer en av dem som startpunkt
// Tar nästkommande bar som är närmst
// OBS - Ja det är inte optimalt.. det är ingen TSP...
// ... det är tight kopplat etc... :)
function sortByDistance(bars) {
  let nrOfBars = bars.length
  let barsSorted = []

  let barsWithDistances = addDistances(bars)

  let barFarAway
  barsWithDistances.map(bar => {
    barFarAway = bar.distanceToBars.filter(
      b => b.distance === findDistance(barsWithDistances, 'max')
    )[0]
  })

  barsSorted.push(
    barsWithDistances.filter(bar => bar.distanceToBars.includes(barFarAway))[0]
  )

  let remainingBars = []
  while (barsSorted.length < 4) {
    remainingBars = barsWithDistances.filter(bar => !barsSorted.includes(bar))
    if (remainingBars.length <= 1) {
      barsSorted.push(remainingBars[0])
      break
    }
    let closestBar = getClosestBar(
      barsSorted[barsSorted.length !== 0 ? barsSorted.length - 1 : 0],
      barsSorted
    ) /// GET CLOSEST NEXT
    let nextBar = remainingBars.filter(bar => bar.name === closestBar.name)[0]

    barsSorted.push(nextBar)
  }
  return barsSorted
}

// Hjälpfunktioner nedan

/** distance funktionen är från 
 * http://www.geodatasource.com/developers/javascript */
function distance(location1, location2) {
  var radlat1 = Math.PI * location1.lat / 180
  var radlat2 = Math.PI * location2.lat / 180
  var theta = location1.lng - location2.lng
  var radtheta = Math.PI * theta / 180
  var dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
  dist = Math.acos(dist)
  dist = dist * 180 / Math.PI
  dist = dist * 60 * 1.1515 // Miles
  return dist * 1609.344 // miles till Meter
}

// lägger till avståndet till övriga barer för respektive bar
function addDistances(bars) {
  let barsWithDistances = bars.map(bar => {
    let distanceToBars = []
    bars.forEach(b => {
      let distanceToBar = distance(bar.location, b.location)
      if (bar.name != b.name) {
        distanceToBars.push({ name: b.name, distance: distanceToBar })
      }
    })
    return { ...bar, distanceToBars }
  })
  return barsWithDistances
}

function findDistance(listWithDistances, option) {
  const lwd = listWithDistances
  let distances = []
  lwd.map(bar => {
    bar.distanceToBars.map(b => {
      if (!distances.includes(b.distance)) {
        distances.push(b.distance)
      }
    })
  })
  if (option === 'min') {
    return Math.min(...distances)
  }
  if (option === 'max') {
    return Math.max(...distances)
  }
  console.log('Du måste ange en option "max" eller "min" ')
}

function getClosestBar(bar, sortingList) {
  const barList = [bar]
  if (sortingList.length <= 1) {
    return bar.distanceToBars.filter(
      b => b.distance === findDistance(barList, 'min')
    )[0]
  }
  return bar.distanceToBars.filter(
    b =>
      b.distance > findDistance(barList, 'min') &&
      b.distance < findDistance(barList, 'max')
  )[0]
}

// Mock av barlista för test
const barList = [
  {
    name: 'Bishops Arms',
    location: { lat: 55.603208, lng: 12.9994935 }
  },
  {
    name: 'Sky Bar',
    location: { lat: 55.6077566, lng: 12.9941654 }
  },
  {
    name: 'Mello Yello',
    location: { lat: 55.6054896, lng: 12.998925 }
  },
  {
    name: 'Olearys',
    location: { lat: 55.6089539, lng: 12.9995112 }
  }
]

// testa möget...
//const sortedBarsTEst = sortByDistance(barList)
//sortedBarsTEst.map(item => console.log(item))

//export default sortByDistance
