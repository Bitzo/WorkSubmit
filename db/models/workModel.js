const Sequelize = require('sequelize');
const sequelize = require('../db');

const work = sequelize.define('work', {
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    unique: true,
  },
  username: {
    type: Sequelize.STRING(45),
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  grade: {
    type: Sequelize.STRING(45),
    allowNull: false,
  },
  className: {
    type: Sequelize.STRING(45),
    allowNull: false,
  },
  phoneNumber: {
    type: Sequelize.STRING(11),
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING(45),
    allowNull: false,
  },
  file: {
    type: Sequelize.STRING(45),
    allowNull: true,
  },
}, {
  timestamps: false,
  tableName: 'work',
});

module.exports = work;
