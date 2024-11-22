import { DataTypes, Model } from "sequelize";
import sequelize from "../../database/sequelize";

interface Usuario extends Model {
  id: number;
  nome: string;
  email: string;
  password: string;
}

export const Usuario = sequelize.define<Usuario>('usuarios', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'usuarios',
  modelName: 'usuarios',
  timestamps: false,
  schema: 'public',
  underscored: false,
});

