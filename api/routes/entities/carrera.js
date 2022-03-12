'use strict'

const express = require('express')
const asyncify = require('express-asyncify')
const db = require('../../../db')

const api = asyncify(express.Router())

let services, Carrera

api.use('*', async (req, res, next) => {
  if (!services) {
    try {
      services = await db()
      Carrera = services.Carrera
    } catch (e) {
      next(e)
    }
  }
  next()
})

api.get('/findAll', async (req, res, next) => {
  const {
    _page, _limit, idCarrera, nombre, ciudad,
    fecha, precio,
  } = req.query
  let result = {
    count: 0,
    rows: [],
  }
  try {
    result = await Carrera.findAll({
      where: {
        idCarrera, nombre, ciudad,
        fecha, precio,
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
  const { idCarrera, nombre, ciudad,
    fecha, precio, } = req.query
  let result = {
    count: 0,
    rows: [],
  }
  try {
    result = await Carrera.findOne({
      where: {
        idCarrera, nombre, ciudad,
        fecha, precio,
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
    result = await Carrera.findById(id)
    res.send(result)
  } catch (e) {
    return next(e)
  }
})

api.post('/createOrUpdate', async (req, res, next) => {
  const model = req.body

  let obj = null

  try {
    obj = await Carrera.createOrUpdate(model)
  } catch (e) {
    return next(e)
  }
  res.send(obj)
})


api.get('/remove', async (req, res, next) => {
  const { idCarrera } = req.query

  try {
    result = await Carrera.remove({
      where: {
        idCarrera
      },
    })
    res.send(result)
  } catch (e) {
    return next(e)
  }
})

module.exports = api
