export interface IEstimateCorrida {
  originText: string,
  destinationText: string,
  origin: {
    latitude: number;
    longitude: number;
  };
  destination: {
    latitude: number;
    longitude: number;
  };
  distance: number;
  duration: string;
  options: {
    id: number;
    name: string;
    description: string;
    vehicle: string;
    review: {
      rating: number;
      comment: string;
    };
    value: number;
  }[];
  routeResponse: {
    routes: {
      distanceMeters: number;
      duration: string;
      polyline: {
        encodedPolyline: string;
      };
    }[];
  };
}