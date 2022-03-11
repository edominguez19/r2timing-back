'use strict'

const express = require('express')
const asyncify = require('express-asyncify')
const _map = require('lodash/map')
const authMiddleware = require('../middlewares/auth')
const { sign } = require('../libs/auth')
const db = require('../../db')
const { services: apiConfig } = require('../../config')

const api = asyncify(express.Router())

let services, User

api.use('*', async (req, res, next) => {
  if (!services) {
    try {
      services = await db()
    } catch (e) {
      next(e)
    }
    User = services.User
  }
  next()
})

api.post('/signin', async (req, res, next) => {
  let { nickname, password } = req.body
  let result = null
  try {
    const user = await User.findUserByName(nickname)
    console.log(user)
    result = {
      id: user.id,
      nickname: user.userName,
      fullName: user.fullName,
      permissions: JSON.parse(user.role.permissions),
      config: JSON.parse(user.role.config),
      campaigns: (user.campaigns),
      expiresIn: apiConfig.sessionTime,
    }
    result['token'] = sign(result)
    res.send(result)
  } catch (e) {
    return next(e)
  }
})

// api.use(authMiddleware)

module.exports = api
