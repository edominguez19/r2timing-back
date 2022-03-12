'use strict'

const { DataTypes } = require('sequelize')
const setupDatabase = require('../libs/db')

module.exports = function setupCategoriaModel (config) {

	const sequelize = setupDatabase(config)
	return sequelize.define('categoria', {
		idCategoria: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'idCategoria'
		},
		nombre: {
			type: DataTypes.STRING(50),
			allowNull: false,
			field: 'nombre'
		},
	    descripcion: {
			type: DataTypes.STRING(100),
			allowNull: false,
			field: 'descripcion'
		}
		
		}, {
		tableName: 'categoria',
		timestamps: false,
		createdAt: false,
		updatedAt: false,
	});
};
