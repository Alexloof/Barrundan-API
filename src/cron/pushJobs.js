import cron from 'cron'
import User from '../models/user'
import {sendPushs} from '../helpers/push'

const crontime = '00 53 16 * * 1'

export const createPushCronJobs = () => {

    var job = new cron.CronJob({
        cronTime: crontime,
        onTick: async () => {


            try {
                const users = await User.find()
                let tokens = [];
                users.forEach((user) => {
                    tokens = tokens.concat(user.pushTokens);
                })
                sendPushs(tokens);
            }catch (e){
                console.log(e)
            }
        },
        timeZone: 'Europe/Stockholm'
    })
    job.start()

}
