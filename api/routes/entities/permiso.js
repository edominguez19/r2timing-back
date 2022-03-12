'use strict'

const express = require('express')
const asyncify = require('express-asyncify')
const db = require('../../../db')

const api = asyncify(express.Router())

let services, Permisos

api.use('*', async (req, res, next) => {
  if (!services) {
    try {
      services = await db()
      Permisos = services.Permisos
    } catch (e) {
      next(e)
    }
  }
  next()
})

api.get('/findAll', async (req, res, next) => {
  const {
    _page, _limit,  idPermiso,nombre,descripcion,
  } = req.query
  let result = {
    count: 0,
    rows: [],
  }
  try {
    result = await Permisos.findAll({
      where: {
        idPermiso,nombre,descripcion,
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
  const {idPermiso,nombre,descripcion, } = req.query
  let result = {
    count: 0,
    rows: [],
  }
  try {
    result = await Permisos.findOne({
      where: {
        idPermiso,nombre,descripcion,
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
    result = await Permisos.findById(id)
    res.send(result)
  } catch (e) {
    return next(e)
  }
})

api.post('/createOrUpdate', async (req, res, next) => {
  const model = req.body
  
  let obj = null
  //dina
  try {
    obj = await Permisos.createOrUpdate(model)
  } catch (e) {
    return next(e)
  }
  res.send(obj)
})


api.get('/remove', async (req, res, next) => {
  const {  idPermiso } = req.query
  
  try {
    result = await Permisos.remove({
      where: {
        idPermiso
      },
    })
    res.send(result)
  } catch (e) {
    return next(e)
  }
})

module.exports = api
