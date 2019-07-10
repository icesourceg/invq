'use strict';
module.exports = (sequelize, DataTypes) => {
  const Guesthistory = sequelize.define('Guesthistory', {
    checkin: {
      type: DataTypes.DATE
    }
  }, {
    underscored: true,
  });
  Guesthistory.associate = function(models) {
    // associations can be defined here
    Guesthistory.belongsTo(models.Guest, {
      onDelete: "Cascade",
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Guesthistory;
};