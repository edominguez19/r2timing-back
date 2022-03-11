'use strict'

const express = require('express')
const asyncify = require('express-asyncify')
const db = require('../../db')
const Speakeasy = require('speakeasy')
const { consultarDatosPersonales } = require('../providers/participante-auth')

const api = asyncify(express.Router())

let services

api.use('*', async (req, res, next) => {
  if (!services) {
    try {
      services = await db()
    } catch (e) {
      next(e)
    }
  }
  next()
})

api.get('/consultarDatosPersonales', async (req, res, next) => {
  let { ci } = req.query
  let result = null
  try {
    result = await consultarDatosPersonales({ ci })
    res.send(
      {
        mensaje: 'OK',
        ...result,
      })
  } catch (e) {
    res.send({ mensaje: 'Error', resultado: {} })
  }
})

module.exports = api
