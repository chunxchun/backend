var CronJob = require('cron').CronJob;

var testJob = new CronJob('*/5 * * * * *',
  () => console.log('cron job log.'),
  () => console.log('cron job finish'),
  false,
  'America/Los_Angeles');

var tasks = {
  crawlAmazonProducts: ''
}

module.exports = testJob;