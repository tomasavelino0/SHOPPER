import axios from "axios";
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const GOOGLE_API_URL = "https://routes.googleapis.com/directions/v2:computeRoutes";
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const CORDINATES_API_GOOGLE = 'https://maps.googleapis.com/maps/api/geocode/json'

export const getBestRoute = async (
  origin: { latitude: number; longitude: number },
  destination: { latitude: number; longitude: number },
  travelMode: "DRIVE" | "BICYCLE" | "WALK" = "DRIVE",
  languageCode: string = "en-US",
  units: "IMPERIAL" | "METRIC" = "IMPERIAL"
) => {
  const data = {
    origin: {
      location: {
        latLng: {
          latitude: origin.latitude,
          longitude: origin.longitude,
        },
      },
    },
    destination: {
      location: {
        latLng: {
          latitude: destination.latitude,
          longitude: destination.longitude,
        },
      },
    },
    travelMode,
    routingPreference: "TRAFFIC_AWARE",
    computeAlternativeRoutes: false,
    routeModifiers: {
      avoidTolls: false,
      avoidHighways: false,
      avoidFerries: false,
    },
    languageCode,
    units,
  };

  const headers = {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": GOOGLE_API_KEY,
    "X-Goog-FieldMask": "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline",
  };

  try {
    const response = await axios.post(GOOGLE_API_URL, data, { headers });
    if (response.status !== 200) {
      throw new Error(`Erro na API do Google: ${response.status} - ${response.statusText}`);
    }

    const routes = response.data.routes;
    if (!routes || routes.length === 0) {
      throw new Error("Nenhuma rota encontrada.");
    }
    const bestRoute = routes[0];

    return {
      duration: bestRoute.duration,
      distanceMeters: bestRoute.distanceMeters,
      encodedPolyline: bestRoute.polyline.encodedPolyline,
    };
  } catch (error: any) {
    console.error("Erro ao buscar rota:", error);
    throw error;
  }
};

export const getCoordinates = async (address: string) => {
  const url = CORDINATES_API_GOOGLE
  const params = {
    address,
    key: GOOGLE_API_KEY,
  };

  const response = await axios.get(url, { params });
  const results = response.data.results;

  if (results.length === 0) {
    throw new Error(`Endereço não encontrado: ${address}`);
  }

  const retorno = results[0].geometry.location;
  return {
    latitude: retorno.lat,
    longitude: retorno.lng
  }
};
