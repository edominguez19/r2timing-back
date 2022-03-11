'use strict'
const CronJob = require('cron').CronJob
const db = require('../db')

new CronJob('*/5 * * * * *', async () => {
  console.log('ok', new Date())
}, null, true, 'America/Guayaquil')

/*ESTA ES UNA PRUEBA DE GIT*/

function handleFatalError (err) {
  console.error(err.message)
  console.error(err.stack)
  process.exit(1)
}
