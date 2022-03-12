'use strict'

const { DataTypes } = require('sequelize')
const setupDatabase = require('../libs/db')

module.exports = function setupDetalleInscripcionModel (config) {

	const sequelize = setupDatabase(config)
	return sequelize.define('detalleinscripcion', {
		idDetalleCarrera: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'idDetalleCarrera'
		},
		inicioCarrera: {
			type: DataTypes.DATE,
			allowNull: false,
			field: 'inicioCarrera'
		},
	    finCarrera: {
			type: DataTypes.DATE,
			allowNull: false,
			field: 'finCarrera'
		},
		tiempoCarrera: {
			type: DataTypes.STRING(10),
			allowNull: false,
			field: 'tiempoCarrera'
		},
	
		posicion: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'posicion'
		},
		CabeceraInscripcion_idCabeceraInscripcion: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'CabeceraInscripcion_idCabeceraInscripcion'
		},
		

		}, {
		tableName: 'detalleinscripcion',
		timestamps: false,
		createdAt: false,
		updatedAt: false,
	});
};
