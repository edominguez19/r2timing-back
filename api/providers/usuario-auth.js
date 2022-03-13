'use strict'
const db = require('../../db')
const AES = require("crypto-js/aes");
const {SHA256} = require("crypto-js/sha256");
const CryptoJS = require("crypto-js");
const enc = require("crypto-js");

async function updateOrCreateByUsername(model) {
    const services = await db()
    let username = model.username
    return new Promise(async (resolve, reject) => {
        try {
            const instanceModel = await services.Usuario.findOne(
                { where: { username } })

            let result
            if (instanceModel) {
                result = await services.Usuario.update({
                    Rol_idRol: model.Rol_idRol,
                    Participante_idParticipante: model.Participante_idParticipante,
                    username: model.username,
                    password: model.password,
                    estado: model.estado
                }, { where: { idUsuario: instanceModel.idUsuario } })
            } else {
                result = await services.Usuario.create({
                    Rol_idRol: model.Rol_idRol,
                    Participante_idParticipante: model.Participante_idParticipante,
                    username: model.username,
                    password: CryptoJS.SHA256(model.password).toString(enc.Hex).trim(),
                    estado: model.estado

                })
            }
            resolve(result)
        } catch (e) {
            reject(e)
        }
    })
}


module.exports = { updateOrCreateByUsername }
