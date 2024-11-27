import * as bcrypt from 'bcryptjs';
import ErrorHandler from '../../utils/errorHandler';
import { Usuario } from '../usuario/usuario.model';
import { createToken } from './tokenMIddleware';

const findByEmailDb = async (email: string) => {
  try {
    const user = await Usuario.findOne({ where: { email } });
    if (!user?.email) throw new ErrorHandler("Email nao encontrado", 400);

    return user;
  } catch (error) {
    console.error(error);
    throw error
  }
}

export const loginAcess = async (email: string, password: string) => {
  const user = await findByEmailDb(email);
  if (!user) throw new ErrorHandler("Email ou senha incorretos", 400);
  const verifyPassword = await bcrypt.compare(password, user.dataValues.password);

  if (!verifyPassword) throw new ErrorHandler("senha incorreta", 400);
  const {
    password: _password,
    ...userWithoutPassword } = user.dataValues;

  const token = createToken(userWithoutPassword);

  return { token: token, user: userWithoutPassword };
}
