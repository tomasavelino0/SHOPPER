import { QueryInterface, DataTypes } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.createTable('motoristas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descricao: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      carro: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      avaliacao: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      taxa: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      kmMinimo: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    });
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.dropTable('motoristas');
  },
};
