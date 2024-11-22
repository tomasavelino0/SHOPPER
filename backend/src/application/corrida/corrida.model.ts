import { DataTypes, Model } from "sequelize";
import sequelize from "../../database/sequelize";

interface Corrida extends Model {
  id: number;
  idUsuario: number;
  idMotorista: number;
  origem: string;
  destino: string;
  valor: string;
  distancia: string;
  tempoPercurso: string;
}

export const Corrida = sequelize.define<Corrida>('corridas', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  idUsuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'usuarios',
      key: 'id',
    },
  },
  idMotorista: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'motoristas',
      key: 'id',
    },
  },
  origem: {
    type: DataTypes.STRING,
  },
  destino: {
    type: DataTypes.STRING,
  },
  valor: {
    type: DataTypes.DECIMAL,
  },
  distancia: {
    type: DataTypes.STRING,
  },
  tempoPercurso: {
    type: DataTypes.STRING,
  }
}, {
  tableName: 'corridas',
  modelName: 'corridas',
  timestamps: false,
  schema: 'public',
  underscored: false,
});
