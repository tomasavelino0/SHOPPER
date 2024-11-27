export interface CustomerRidesResponse {
  customer_id: string;
  rides: Ride[];
}

interface Ride {
  id: number;
  date: string;
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