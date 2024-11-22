import ErrorHandler from "../../utils/errorHandler";
import 'dotenv/config';
import HttpStatus from "../../functions/enumHttpResponses";
import { ICreateCorrida } from "./corrida.interfaces";
import { Corrida } from "./corrida.model";
import { getBestRoute, getCoordinates } from "../../requests/googleRoutesRequest";
import { Motorista } from "../motorista/motorista.model";
import { Op } from "sequelize";

export const getAllCorridas = async () => {
  const getAll = await Corrida.findAll();
  return getAll
};

export const corridaHandler = async (payload: ICreateCorrida) => {
  const cordinatesOrigem = await getCoordinates(payload.origem);
  const cordinatesDestino = await getCoordinates(payload.destino);
  const bestRoute = await getBestRoute(cordinatesOrigem, cordinatesDestino);
  const distanciaFormated = (bestRoute.distanceMeters / 1000).toFixed(2);
  const findMotoristaByKm = await Motorista.findAll({
    where: {
      kmMinimo: {
        [Op.lte]: distanciaFormated,
      },
    },
    order: [['taxa', 'ASC']],
  });

  const motoristasComValores = findMotoristaByKm.map((motorista) => {
    const motoristaData = motorista.toJSON();
    const taxa = parseFloat(motoristaData.taxa);
    const valorCorrida = taxa * parseFloat(distanciaFormated);

    return {
      ...motoristaData,
      taxa: undefined,
      kmMinimo: undefined,
      valorCorrida: valorCorrida.toFixed(2),
    };
  });

  const payloadReturn = {
    origem: cordinatesOrigem,
    destino: cordinatesDestino,
    distancia: `${bestRoute.distanceMeters} metros`,
    tempo: bestRoute.duration,
    motoristas: motoristasComValores,
    respostaOriginal: bestRoute,
  };

  return payloadReturn
}

export const findCanalById = async (id: number) => {
  const buscar = await Corrida.findByPk(id);
  if (!buscar) throw new ErrorHandler("Elemento nao encontrado!", HttpStatus.NOT_FOUND);

  return buscar
}
