// models/operacionesFinancieras.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Asegúrate de tener tu configuración de base de datos

const OperacionesFinancieras = sequelize.define('OperacionesFinancieras', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  empresa_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  empresa: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  anio: {
    type: DataTypes.INTEGER,
  },
  estatus: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  genero: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  producto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  municipio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sucursal: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  operaciones: {
    type: DataTypes.INTEGER,
  },
  monto: {
    type: DataTypes.DECIMAL(15, 2),
  },
}, {
  tableName: 'OperacionesFinancieras',
  timestamps: false, // Si no tienes campos createdAt y updatedAt
});

module.exports = OperacionesFinancieras;