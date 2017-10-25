import User from '../models/user'
import Expo from 'expo-server-sdk'
let expo = new Expo()
export const sendPushs = (
  somePushTokens,
  message,
  data = {},
  sound = 'default'
) => {
  // Create the messages that you want to send to clents
  let messages = []
  for (let pushToken of somePushTokens) {
    // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

    // Check that all your push tokens appear to be valid Expo push tokens
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`)
      continue
    }

    // Construct a message (see https://docs.expo.io/versions/latest/guides/push-notifications.html)
    messages.push({
      to: pushToken,
      sound: sound,
      body: message,
      data: data
    })
  }

  // The Expo push notification service accepts batches of notifications so
  // that you don't need to send 1000 requests to send 1000 notifications. We
  // recommend you batch your notifications to reduce the number of requests
  // and to compress them (notifications with similar content will get
  // compressed).
  let chunks = expo.chunkPushNotifications(messages)
  ;(async () => {
    // Send the chunks to the Expo push notification service. There are
    // different strategies you could use. A simple one is to send one chunk at a
    // time, which nicely spreads the load out over time:
    for (let chunk of chunks) {
      try {
        let receipts = await expo.sendPushNotificationsAsync(chunk)
        console.log(receipts)
      } catch (error) {
        console.error(error)
      }
    }
  })()
}

export const savePushToken = async (user, token) => {
  if (token && !user.pushTokens.includes(token)) {
    try {
      user.pushTokens.push(token)
      await user.save()
    } catch (e) {
      console.log(e)
    }
  } else {
    console.log('detta token finns redan')
  }
}

export const sendPushToActiveBarrundanUsers = (message) => {

}