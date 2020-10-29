'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Restaurants', 'avgRating', {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
      }),
      queryInterface.addColumn('Restaurants', 'numberOfReviews', {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Restaurants', 'avgRating'),
      queryInterface.removeColumn('Restaurants', 'numberOfReviews'),
    ]);
  },
};
