import { DataTypes, Model } from "sequelize";
import sequelize from "../../database/sequelize";

interface Motorista extends Model {
  id: number;
  nome: string;
  descricao: string;
  carro: string;
  avaliacao: string;
  taxa: string;
  kmMinimo: string;
}

export const Motorista = sequelize.define<Motorista>('motoristas', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.STRING,
  },
  carro: {
    type: DataTypes.STRING,
    allowNull: false
  },
  avaliacao: {
    type: DataTypes.STRING,
  },
  taxa: {
    type: DataTypes.STRING,
  },
  kmMinimo: {
    type: DataTypes.STRING,
  }
}, {
  tableName: 'motoristas',
  modelName: 'motoristas',
  timestamps: false,
  schema: 'public',
  underscored: false,
});

