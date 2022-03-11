'use strict'

const Sequelize = require('sequelize')
let sequelize = null

module.exports = function setupDatabase (config) {
  if (!sequelize || sequelize.config.host !== config.host || sequelize.config.database !== config.database) {
    sequelize = new Sequelize(config)
  }
  return sequelize
}
