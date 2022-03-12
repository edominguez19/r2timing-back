'use strict'

const express = require('express')
const asyncify = require('express-asyncify')
const db = require('../../../db')

const api = asyncify(express.Router())

let services, Rol

api.use('*', async (req, res, next) => {
  if (!services) {
    try {
      services = await db()
      Rol = services.Rol
    } catch (e) {
      next(e)
    }
  }
  next()
})

api.get('/findAll', async (req, res, next) => {
  const {
    _page, _limit,  idRol, nombre, descripcion,
  } = req.query
  let result = {
    count: 0,
    rows: [],
  }
  try {
    result = await Rol.findAll({
      where: {
        idRol, nombre, descripcion,
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
  const {   idRol, nombre, descripcion, } = req.query
  let result = {
    count: 0,
    rows: [],
  }
  try {
    result = await Rol.findOne({
      where: {
        idRol, nombre, descripcion,
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
    result = await Rol.findById(id)
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
    obj = await Rol.createOrUpdate(model)
  } catch (e) {
    return next(e)
  }
  res.send(obj)
})


api.get('/remove', async (req, res, next) => {
  const {  idRol } = req.query
  
  try {
    result = await Rol.remove({
      where: {
        idRol
      },
    })
    res.send(result)
  } catch (e) {
    return next(e)
  }
})

module.exports = api
