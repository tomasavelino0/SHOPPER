import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: typeof DataTypes) => {
    await queryInterface.bulkInsert('motoristas', [
      {
        nome: 'Carlos Silva',
        descricao: 'Motorista experiente com 10 anos de estrada',
        carro: 'Volkswagen Gol 1.6',
        avaliacao: '5/5 Motorista gente boa, super prestativo.',
        taxa: 2.5,
        kmMinimo: '0.4',
      },
      {
        nome: 'João Souza',
        descricao: 'Motorista dedicado com ótima avaliação',
        carro: 'Chevrolet Onix 1.0',
        avaliacao: '3/5 Otimo motorista, mas corre as vezes.',
        taxa: 4,
        kmMinimo: '1',
      },
      {
        nome: 'Maria Oliveira',
        descricao: 'Motorista com ótimo atendimento e excelente feedback',
        carro: 'Fiat Uno 1.0',
        avaliacao: '4/5 Otima motorista, anda super suave.',
        taxa: 3.5,
        kmMinimo: '2',
      },
    ]);
  },

  down: async (queryInterface: QueryInterface, Sequelize: typeof DataTypes) => {
    await queryInterface.bulkDelete('motoristas', {});
  },
};
