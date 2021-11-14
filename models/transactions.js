'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transactions.belongsTo(models.trip,{
        foreignKey : {
          name : "idTrip"
        }
      })
      transactions.belongsTo(models.user,{
        foreignKey : {
          name : "idUser"
        }
      })
    }
  };
  transactions.init({
    counterQty: DataTypes.STRING,
    total: DataTypes.INTEGER,
    status: DataTypes.STRING,
    attachment: DataTypes.STRING,
    idTrip: DataTypes.INTEGER,
    idUser: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'transactions',
  });
  return transactions;
};