'use strict'

const { DataTypes } = require('sequelize')
const setupDatabase = require('../libs/db')

module.exports = function setupDetalleCarreraModel (config) {

	const sequelize = setupDatabase(config)
	return sequelize.define('detallecarrera', {
		idDetalleCarrera: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'idDetalleCarrera'
		},
		epc: {
			type: DataTypes.STRING(50),
			allowNull: false,
			field: 'epc'
		},
	    carrera: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'carrera'
		},
		fechaLectura: {
			type: DataTypes.DATE,
			allowNull: false,
			field: 'fechaLectura'
		},
	
		rssi: {
			type: DataTypes.STRING(10),
			allowNull: true,
			field: 'rssi'
		}
		}, {
		tableName: 'detallecarrera',
		timestamps: false,
		createdAt: false,
		updatedAt: false,
	});
};
