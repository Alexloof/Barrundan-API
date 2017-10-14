export const savePushToken = async (user, token) => {
  if (token && !user.pushTokens.includes(token)) {
    try {
      user.pushTokens.push(token)
      await user.save()
    } catch (e) {
      // Göra något ? eller svälja erroorrt ?!?!
      console.log(e)
    }
  } else {
    console.log('detta token finns redan')
  }
}
