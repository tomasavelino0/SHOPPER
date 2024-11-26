import { DataTypes, Model } from "sequelize";
import sequelize from "../../database/sequelize";
import { Motorista } from "../motorista/motorista.model";
import { Usuario } from "../usuario/usuario.model";

interface Corrida extends Model {
  id: number;
  idUsuario: number;
  idMotorista: number;
  origem: string;
  destino: string;
  valor: number;
  distancia: number;
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
    type: DataTypes.DECIMAL(7, 3),
  },
  tempoPercurso: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'corridas',
  modelName: 'corridas',
  timestamps: true,
  createdAt: true,
  updatedAt: false,
  schema: 'public',
  underscored: false,
});

Corrida.belongsTo(Motorista, { foreignKey: "idMotorista" });
Corrida.belongsTo(Usuario, { foreignKey: "idUsuario" });
