'use strict';
module.exports = (sequelize, DataTypes) => {
  const Guest = sequelize.define('Guest', {
    title: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.STRING
    },
    full_name: {
      type: DataTypes.STRING
    },
    code: {
      type: DataTypes.STRING
    }
  }, {
    indexes:[
      {
        unique: false,
        fields:['code', 'full_name']
      }
     ],
    underscored: true,
  });
  Guest.associate = function(models) {
    // associations can be defined here
    Guest.hasMany(models.Guesthistory);
  };
  return Guest;
};