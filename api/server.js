'use strict'
const minimist = require('minimist')
let envProduction = false
const params = minimist(process.argv)
if (params.prod && params.prod === 'true') {
  envProduction = true
}
const fs = require('fs')
const https = require('https')

const http = require('http')
const express = require('express')
const asyncify = require('express-asyncify')
const cors = require('cors')

const { getConfig } = require('../config')

const paticipanteAuth = require('./routes/participante-auth')



const participante = require('./routes/entities/participantes')

const app = asyncify(express())
let server
if (envProduction) {
  // Certificate
  const privateKey = fs.readFileSync(
    '/etc/letsencrypt/live/ms.planMarket.com/privkey.pem', 'utf8')
  const certificate = fs.readFileSync(
    '/etc/letsencrypt/live/ms.planMarket.com/cert.pem', 'utf8')
  const ca = fs.readFileSync(
    '/etc/letsencrypt/live/ms.planMarket.com/chain.pem', 'utf8')

  const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca,
  }
  server = https.createServer(credentials, app)
} else {
  server = http.createServer(app)
}
const corsOptions = {
  origin: '*',
}

app.use(cors(corsOptions))
app.use(express.json({ limit: '50mb' }))

app.use('/participante-auth', paticipanteAuth)

app.use('/participante', participante)


app.use((err, req, res, next) => {
  console.log(err, 'ok')
  if (err.code === 'permission_denied') {
    res.status(401).send(err.inner.message)
  } else if (err.message && err.message.match(/not fount/)) {
    return res.status(404).send({ error: err.message })
  } else {
    return res.status(500).send({ error: err.message || err.error })
  }
})

function handledFatalError (err) {
  console.error(`[fatal error]: ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

if (!module.parent) {
  process.on('uncaughtException', handledFatalError)
  process.on('unhandledRejection', handledFatalError)
  getConfig().then((env) => {
    console.log(env,'Inicia')
    server.listen(env.services.port, () => {
      console.log(`[api-server]: Escuchando en puerto ${env.services.port}`)
    })
  })

}
module.exports = server
