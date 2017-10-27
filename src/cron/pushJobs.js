import cron from 'cron'
import User from '../models/user'
import Barrunda_participant from '../models/barrunda_participant'

import { sendPushs } from '../helpers/push'
import { getLatestRound } from '../helpers/barRound'

/*
const firstPushCrontime = '00 00 20 * * 6'
const secondPushCrontime = '00 55 20 * * 6'
const thirdPushCrontime = '00 55 21 * * 6'
const fourthPushCrontime = '00 55 22 * * 6'
*/
const firstPushCrontime = '00 00 18 * * 5'
const secondPushCrontime = '00 00 19 * * 5'
const thirdPushCrontime = '00 00 20 * * 5'
const fourthPushCrontime = '00 00 21 * * 5'

export const sendPush = async message => {
  const barrund = await getLatestRound()
  const participants = await Barrunda_participant.find({
    barrundaId: barrund._id
  })
  if (barrund) {
    const userList = participants.map(participant => participant.userId)
    const users = await User.find(
      {
        _id: { $in: userList }
      },
      ['pushTokens']
    )

    let tokens = []
    users.forEach(user => {
      tokens = tokens.concat(user.pushTokens)
    })

    sendPushs(tokens, message)
  }
}

export const createPushCronJobs = () => {
  var firstPush = new cron.CronJob({
    cronTime: firstPushCrontime,
    onTick: async () => {
      try {
        await sendPush('Gå till den första baren! Nu börjar äventyret')
      } catch (e) {
        console.log(e)
      }
    },
    timeZone: 'Europe/Stockholm'
  })
  firstPush.start()

  var secondPush = new cron.CronJob({
    cronTime: secondPushCrontime,
    onTick: async () => {
      try {
        await sendPush('Det är dags för andra baren nu! Skynda dit!')
      } catch (e) {
        console.log(e)
      }
    },
    timeZone: 'Europe/Stockholm'
  })
  secondPush.start()

  var thirdPush = new cron.CronJob({
    cronTime: thirdPushCrontime,
    onTick: async () => {
      try {
          await sendPush('Det är dags för tredje baren nu! Skynda dit')
      } catch (e) {
        console.log(e)
      }
    },
    timeZone: 'Europe/Stockholm'
  })
  thirdPush.start()

  var fourthPush = new cron.CronJob({
    cronTime: fourthPushCrontime,
    onTick: async () => {
      try {
          await sendPush('Sista baren nu! Häng med!')
      } catch (e) {
        console.log(e)
      }
    },
    timeZone: 'Europe/Stockholm'
  })
  fourthPush.start()

}
