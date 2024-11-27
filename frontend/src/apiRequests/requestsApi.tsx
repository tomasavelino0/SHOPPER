import axios from 'axios'

export const BASE_URL_FRONT = 'http://localhost:3006'
export const BASE_URL = "http://localhost:8080";

export const getInfoCEPrequest = async (cep) => {
  const url = `https://viacep.com.br/ws/${cep}/json/`;
  const axiosInstance = axios.create({
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const response = await axiosInstance.get(url);
  return response.data
}

export const loginToken = async (endpoint, data) => {
  const url = `${BASE_URL}${endpoint}`;
  const axiosInstance = axios.create({
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const response = await axiosInstance.post(url, data);
  return response.data
}


export const editarRequest = async (endpoint, token, id, data) => {
  const url = `${BASE_URL}${endpoint}/${id}`;
  const axiosInstance = axios.create({
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const response = await axiosInstance.put(url, data);
  return response.data
}

interface IEstimateRide {
  customer_id: number,
  origin: string,
  destination: string
}

export const postEstimateRide = async (data: IEstimateRide, token: string) => {
  const url = `${BASE_URL}/ride/estimate`;
  const axiosInstance = axios.create({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  const response = await axiosInstance.post(url, data);
  return response
}

export interface IConfirmCorrida {
  customer_id: number;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: {
    id: number;
    name: string;
  };
  value: number;
}

export const patchConfirmCorrida = async (data: IConfirmCorrida, token: string) => {
  const url = `${BASE_URL}/ride/confirm`;
  const axiosInstance = axios.create({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  const response = await axiosInstance.patch(url, data);
  return response
}

export const getHistoricoCorrida = async (token: string, idUser: string) => {
  const url = `${BASE_URL}/ride/${idUser}`;
  const axiosInstance = axios.create({
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const response = await axiosInstance.get(url);
  return response
}

export const getHistoricoCorridaWithDriverQuery = async (token: string, driverId: string, idUser: string) => {
  const url = `${BASE_URL}/ride/${idUser}?driver_id=${driverId}`;
  const axiosInstance = axios.create({
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const response = await axiosInstance.get(url);
  return response
}
