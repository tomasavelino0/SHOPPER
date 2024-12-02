import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: typeof DataTypes) => {
    await queryInterface.bulkInsert('usuarios', [
      {
        nome: 'Tomas Avelino',
        email: 'tomasdc2016@gmail.com',
        password: '$2b$10$H9Fe6TTg4LPrRp4kvgJOPuhutn1L1IrUprpdG9PEMK6TYAZ1AqHle', // senha: 1234
      },
    ]);
  },

  down: async (queryInterface: QueryInterface, Sequelize: typeof DataTypes) => {
    await queryInterface.bulkDelete('usuarios', {});
  },
};
