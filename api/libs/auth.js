'use strict'
const { services: apiConfig } = require('../../config')
require('dotenv').config();

const jwt = require('jsonwebtoken')

function sign (payload) {
  return jwt.sign(payload, process.env.SECRET, { expiresIn: '30m' })
}

function verify (payload) {
  return jwt.verify(payload, process.env.SECRET)
}

module.exports = {
  sign,
  verify
}
