const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Company = require('./company') 

const UserCompany = sequelize.define('UserCompany', {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  companyId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'Companies',
      key: 'id',
    },
  },
}, {
  timestamps: true
});

//UserCompany.belongsTo(Company);
// Asociación inversa
Company.hasMany(UserCompany, { foreignKey: 'companyId' });
UserCompany.belongsTo(Company, { foreignKey: 'companyId' });



module.exports = UserCompany;
