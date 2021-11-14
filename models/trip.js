const country = require("./country");
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      trip.belongsTo(models.country,{
        foreignKey : {
          name : "idCountry"
        }
      })
    }
  };
  trip.init({
    title: DataTypes.STRING,
    idCountry: DataTypes.INTEGER,
    accomodation: DataTypes.STRING,
    transportation: DataTypes.STRING,
    eat: DataTypes.STRING,
    day: DataTypes.INTEGER,
    night: DataTypes.INTEGER,
    dateTrip: DataTypes.STRING,
    price: DataTypes.INTEGER,
    quota: DataTypes.INTEGER,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    filledQuota: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'trip',
  });
  return trip;
};