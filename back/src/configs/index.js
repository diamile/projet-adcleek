const { config } = require('dotenv')
let appConfig = {}

appConfig = config().parsed

module.exports = {
  appConfig
}