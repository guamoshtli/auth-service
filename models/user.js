/**
 * Archivo que contiene la definición del modelo de usuario.
 */

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Role = require('./role');
const UserCompany = require('./userCompany');
const UserRole = require('./userRole');
const Company = require('./company'); // Asegúrate de importar el modelo de Empresa

/**
 * Clase que representa el modelo de usuario.
 */
class User extends Model {}

/**
 * Inicializa el modelo de usuario con sus atributos y configuración.
 */
User.init({
  /**
   * Atributo que representa el ID del usuario (se agregará automáticamente por Sequelize).
   */
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  /**
   * Atributo que representa el nombre de usuario.
   */
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  /**
   * Atributo que representa el correo electrónico del usuario.
   */
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  /**
   * Atributo que representa la contraseña del usuario.
   */
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  /**
   * Objeto de conexión a la base de datos.
   */
  sequelize,
  /**
   * Nombre del modelo.
   */
  modelName: 'User',
  /**
   * Nombre de la tabla en la base de datos (debe coincidir con el nombre real).
   */
  tableName: 'Users', // Ajusta si tu tabla tiene un nombre diferente
  /**
   * Configuración para agregar timestamps (createdAt y updatedAt) a cada registro.
   */
  timestamps: true
});

/**
 * Asociaciones del modelo de usuario.
 */
User.belongsToMany(Role, { through: UserRole, foreignKey: 'userId' });
Role.belongsToMany(User, { through: UserRole, foreignKey: 'roleId' });

User.belongsToMany(Company, { through: UserCompany, foreignKey: 'userId' });
Company.belongsToMany(User, { through: UserCompany, foreignKey: 'companyId' });

User.hasMany(UserRole, { foreignKey: 'userId' });
UserRole.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(UserCompany, { foreignKey: 'userId' });
UserCompany.belongsTo(User, { foreignKey: 'userId' });

Role.hasMany(UserRole, { foreignKey: 'roleId' });
UserRole.belongsTo(Role, { foreignKey: 'roleId' });

Company.hasMany(UserCompany, { foreignKey: 'companyId' });
UserCompany.belongsTo(Company, { foreignKey: 'companyId' });

/**
 * Exporta el modelo de usuario.
 */
module.exports = User;