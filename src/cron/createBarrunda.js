import cron from 'cron'
import {createAll} from '../helpers/createBarRound'

/*Seconds: 0-59
Minutes: 0-59
Hours: 0-23
Day of Month: 1-31
Months: 0-11
Day of Week: 0-6*/
// https://github.com/kelektiv/node-cron
const crontime = '00 21 16 * * 1'

export const startCreateBarrundCronJob = () => {
  var job = new cron.CronJob({
    cronTime: crontime,
    onTick: function() {
        try {
            createAll();
        }catch (e){
            console.log(e)
        }
    },
    timeZone: 'Europe/Stockholm'
  })
  job.start()
}
