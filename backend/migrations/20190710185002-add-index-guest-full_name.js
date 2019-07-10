'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addIndex('Guests',
      ['full_name'],
      {
        indexName: 'full_name',
        indicesType: 'INDEX'
      }
      );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeIndex('Guests', ['full_name'])
  }
};
