export interface ICreateCorrida {
  customer_id: number;
  origin: string;
  destination: string;
}

export interface IConfirmCorrida {
  customer_id: number,
  origin: string,
  destination: string,
  distance: number,
  duration: string,
  driver: {
    id: number,
    name: string
  },
  value: number
}