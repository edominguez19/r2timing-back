'use strict'

const express = require('express')
const asyncify = require('express-asyncify')
const db = require('../../../db')

const api = asyncify(express.Router())

let services, Usuario

api.use('*', async (req, res, next) => {
  if (!services) {
    try {
      services = await db()
      Usuario = services.Usuario
    } catch (e) {
      next(e)
    }
  }
  next()
})

api.get('/findAll', async (req, res, next) => {
  const {
    _page, _limit,  idUsuario, username, password,
    estado, Participante_idParticipante, Rol_idRol,
  } = req.query
  let result = {
    count: 0,
    rows: [],
  }
  try {
    result = await Usuario.findAll({
      where: {
        idUsuario, username, password,
    estado, Participante_idParticipante, Rol_idRol,
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
  const {  idUsuario, username, password,
    estado, Participante_idParticipante, Rol_idRol, } = req.query
  let result = {
    count: 0,
    rows: [],
  }
  try {
    result = await Usuario.findOne({
      where: {
        idUsuario, username, password,
    estado, Participante_idParticipante, Rol_idRol,
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
    result = await Usuario.findById(id)
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
    obj = await Usuario.createOrUpdate(model)
  } catch (e) {
    return next(e)
  }
  res.send(obj)
})


api.get('/remove', async (req, res, next) => {
  const {  idUsuario } = req.query
  
  try {
    result = await Usuario.remove({
      where: {
        idUsuario
      },
    })
    res.send(result)
  } catch (e) {
    return next(e)
  }
})

module.exports = api
