'use strict'

const { DataTypes } = require('sequelize')
const setupDatabase = require('../libs/db')

module.exports = function setupCarreraCategoriaModel(config) {

	const sequelize = setupDatabase(config)
	return sequelize.define('carreracategoria', {
		idCarreraCategoria: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'idCarreraCategoria'
		},
		Carrera_idCarrera: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'Carrera_idCarrera'
		},
	    Categoria_idCategoria: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'Categoria_idCategoria'
		},
		Distancia_idDistancia: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'Distancia_idDistancia'
		},


	}, {
		tableName: 'carreracategoria',
		timestamps: false,
		createdAt: false,
		updatedAt: false,
	});
};
