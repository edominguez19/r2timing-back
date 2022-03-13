'use strict'

const express = require('express')
const asyncify = require('express-asyncify')
const _map = require('lodash/map')
const authMiddleware = require('../middlewares/auth')
const { sign } = require('../libs/auth')
const db = require('../../db')
const { services: apiConfig } = require('../../config')
const AES = require("crypto-js/aes");
const {SHA256} = require("crypto-js/sha256");
const CryptoJS = require("crypto-js");
const enc = require("crypto-js");
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


api.post('/signin', async (req, res, next) => {
  let { username, password } = req.body
  password = CryptoJS.SHA256(password).toString(enc.Hex).trim();
  let result = null
  try {
    const user = await Usuario.findUserByName(username, password)
    if (user != null) {
      console.log(user)
      result = {
        username: user.username,
        password: user.password,
        estado: user.estado,
        Participante_idParticipante: user.Participante_idParticipante,
        Rol_idRol: user.Rol_idRol,
        idUsuario: user.idUsuario
      }
      result['token'] = sign(result)
      res.send(result)
    } else {
      result = { mensaje: "usuario o password no encontrado" };
      res.send(result)
    }
  } catch (e) {
    return next(e)
  }
})

//api.use(authMiddleware)

module.exports = api
