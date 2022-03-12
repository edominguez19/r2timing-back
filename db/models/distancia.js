'use strict'

const { DataTypes } = require('sequelize')
const setupDatabase = require('../libs/db')

module.exports = function setupDistanciaModel (config) {

	const sequelize = setupDatabase(config)
	return sequelize.define('distancia', {
		idDistancia: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'idDistancia'
		},
		nombre: {
			type: DataTypes.STRING(50),
			allowNull: false,
			field: 'nombre'
		}
	    

		}, {
		tableName: 'distancia',
		timestamps: false,
		createdAt: false,
		updatedAt: false,
	});
};
