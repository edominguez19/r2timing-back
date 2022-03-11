'use strict'

const express = require('express')
const asyncify = require('express-asyncify')
const db = require('../../../db')

const api = asyncify(express.Router())

let services, Participante

api.use('*', async (req, res, next) => {
  if (!services) {
    try {
      services = await db()
      Participante = services.Participante
    } catch (e) {
      next(e)
    }
  }
  next()
})

api.get('/findAll', async (req, res, next) => {
  const {
    _page, _limit,  idParticipante, ci, apellidos,
    nombres, fechaNacimiento, ciudad, email, telefono,
  } = req.query
  let result = {
    count: 0,
    rows: [],
  }
  try {
    result = await Participante.findAll({
      where: {
        idParticipante, ci, apellidos,
        nombres, fechaNacimiento, ciudad, email, telefono,
      },
      pageSize: parseInt(_limit || 1000),
      page: parseInt(_page || 1) - 1,
    })
    res.send(result)
  } catch (e) {
    return next(e)
  }
})

api.get('/findOne', async (req, res, next) => {
  const {  idParticipante, ci, apellidos,
    nombres, fechaNacimiento, ciudad, email, telefono, } = req.query
  let result = {
    count: 0,
    rows: [],
  }
  try {
    result = await Participante.findOne({
      where: {
        idParticipante, ci, apellidos,
        nombres, fechaNacimiento, ciudad, email, telefono,
      },
    })
    res.send(result)
  } catch (e) {
    return next(e)
  }
})

api.get('/findById', async (req, res, next) => {
  const { id } = req.args
  let result = {
    count: 0,
    rows: [],
  }
  try {
    result = await Participante.findById(id)
    res.send(result)
  } catch (e) {
    return next(e)
  }
})

api.post('/createOrUpdate', async (req, res, next) => {
  const model = req.body
  let obj = null
  try {
    obj = await Participante.createOrUpdate(model)
  } catch (e) {
    return next(e)
  }
  res.send(obj)
})


api.get('/remove', async (req, res, next) => {
  const {  idParticipante } = req.query
  
  try {
    result = await Participante.remove({
      where: {
        idParticipante
      },
    })
    res.send(result)
  } catch (e) {
    return next(e)
  }
})

module.exports = api
