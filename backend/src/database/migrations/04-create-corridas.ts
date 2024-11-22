import { QueryInterface, DataTypes } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.createTable('corridas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'usuarios',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      idMotorista: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'motoristas',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      origem: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      destino: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      valor: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      distancia: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tempoPercurso: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.dropTable('corridas');
  },
};
