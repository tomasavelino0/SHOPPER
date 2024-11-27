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

export const getRequest = async (endpoint, token, id) => {
  const url = `${BASE_URL}${endpoint}/${id}`;
  const axiosInstance = axios.create({
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const response = await axiosInstance.get(url);
  return response.data
}

