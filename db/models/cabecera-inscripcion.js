'use strict'

const { DataTypes } = require('sequelize')
const setupDatabase = require('../libs/db')

module.exports = function setupCabeceraInscripcioModel(config) {

	const sequelize = setupDatabase(config)
	return sequelize.define('cabecerainscripcion', {
		idCabeceraInscripcion: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'idCabeceraInscripcion'
		},

		fechaInscripcion: {
			type: DataTypes.DATE,
			allowNull: false,
			field: 'fechaInscripcion'
		},
		reciboPago: {
			type: DataTypes.STRING(500),
			allowNull: false,
			field: 'reciboPago'
		},
		epc: {
			type: DataTypes.STRING(50),
			allowNull: false,
			field: 'epc'
		},

		numero: {
			type: DataTypes.STRING(10),
			allowNull: true,
			field: 'numero'
		},
		Participante_idParticipante: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'Participante_idParticipante'
		},
		CarreraCategoria_idCarreraCategoria: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'CarreraCategoria_idCarreraCategoria'
		},

	}, {
		tableName: 'cabecerainscripcion',
		timestamps: false,
		createdAt: false,
		updatedAt: false,
	});
};
