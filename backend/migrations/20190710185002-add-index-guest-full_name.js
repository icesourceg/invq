'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addIndex('Guests',
      ['name'],
      {
        indexName: 'name',
        indicesType: 'INDEX'
      }
      );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeIndex('Guests', ['name'])
  }
};
