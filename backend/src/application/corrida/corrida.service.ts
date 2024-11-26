import ErrorHandler from "../../utils/errorHandler";
import 'dotenv/config';
import HttpStatus from "../../functions/enumHttpResponses";
import { IConfirmCorrida, ICorridaByDate, ICreateCorrida } from "./corrida.interfaces";
import { Corrida } from "./corrida.model";
import { getBestRoute, getCoordinates } from "../../requests/googleRoutesRequest";
import { Motorista } from "../motorista/motorista.model";
import { Op } from "sequelize";
import { formatDuration } from "./utils/functionsCorrida";
import { Usuario } from "../usuario/usuario.model";

export const corridaHandler = async (payload: ICreateCorrida) => {
  const cordinatesOrigem = await getCoordinates(payload.origin);
  const cordinatesDestino = await getCoordinates(payload.destination);
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

  const options = findMotoristaByKm.map((motorista) => {
    const motoristaData = motorista.toJSON();
    const taxa = parseFloat(motoristaData.taxa);
    const valorCorrida = taxa * parseFloat(distanciaFormated);

    return {
      id: motoristaData.id,
      name: motoristaData.nome,
      description: motoristaData.descricao,
      vehicle: motoristaData.carro,
      review: {
        rating: parseFloat(motoristaData.avaliacao?.match(/(\d+)\//)?.[1] || '0'),
        comment: motoristaData.avaliacao?.replace(/\d+\/\d+/, '').trim(),
      },
      value: parseFloat(valorCorrida.toFixed(2)),
    };
  });

  const payloadReturn = {
    origin: {
      latitude: cordinatesOrigem.latitude,
      longitude: cordinatesOrigem.longitude,
    },
    destination: {
      latitude: cordinatesDestino.latitude,
      longitude: cordinatesDestino.longitude,
    },
    distance: parseFloat((bestRoute.distanceMeters / 1000).toFixed(3)),
    duration: formatDuration(bestRoute.duration),
    options,
    routeResponse: bestRoute.original,
  };

  return payloadReturn;
};

export const confirmCorrida = async (payload: IConfirmCorrida) => {
  const findMotorista = await Motorista.findByPk(Number(payload.driver.id));
  if (!findMotorista)
    throw new ErrorHandler("Motorista nao encontrado, informar id correto", HttpStatus.NOT_FOUND, "DRIVER_NOT_FOUND");

  if (payload.distance < parseFloat(findMotorista.kmMinimo))
    throw new ErrorHandler("Motorista nao aceita essa quilometragem", HttpStatus.NOT_ACCEPTABLE, "INVALID_DISTANCE");

  const payloadCreateCorrida = {
    idUsuario: Number(payload.customer_id),
    idMotorista: Number(payload.driver.id),
    origem: payload.origin,
    destino: payload.destination,
    valor: payload.value,
    distancia: payload.distance,
    tempoPercurso: payload.duration
  };

  await Corrida.create({ ...payloadCreateCorrida });

  return {
    success: true
  }
}

export const getCorridaByUsuarioAndMotorista = async (payload: ICorridaByDate) => {
  const findUser = await Usuario.findByPk(payload.idUser);
  if (!findUser) {
    throw new ErrorHandler(
      "Usuário não encontrado!",
      HttpStatus.NOT_FOUND
    );
  }

  let corridas;
  if (payload.idMotorista) {
    const checkMotorista = await Motorista.findByPk(payload.idMotorista);
    if (!checkMotorista) {
      throw new ErrorHandler(
        "Motorista não encontrado, informar id correto",
        HttpStatus.NOT_FOUND,
        "DRIVER_NOT_FOUND"
      );
    }

    corridas = await Corrida.findAll({
      where: { idMotorista: payload.idMotorista, idUsuario: payload.idUser },
      include: [
        {
          model: Motorista,
          attributes: ['id', 'nome'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
  } else {
    corridas = await Corrida.findAll({
      where: { idUsuario: payload.idUser },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Motorista,
          attributes: ['id', 'nome'],
        },
      ],
    });
  }

  const rides = corridas.map(corrida => {
    const corridaData = corrida.toJSON();
    return {
      id: corridaData.id,
      date: new Date(corridaData.createdAt),
      origin: corridaData.origem,
      destination: corridaData.destino,
      distance: parseFloat(corridaData.distancia),
      duration: corridaData.tempoPercurso,
      driver: {
        id: corridaData.idMotorista,
        name: corridaData.motorista ? corridaData.motorista.nome : null,
      },
      value: parseFloat(corridaData.valor),
    };
  });

  return {
    customer_id: String(payload.idUser),
    rides,
  };
};

