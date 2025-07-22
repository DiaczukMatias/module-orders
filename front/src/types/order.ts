export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Address {
  address: string;
  zipcode: string;
  ext_num: string;
  int_num: string;
  state: string;
  country: string;
}

export interface Location {
  coordinates: Coordinates;
  address: Address;
}

export interface OrderData {
  origin: Location;
  destination: Location;
  productCount: number;
  totalWeightKg: number;
  status: string;
  _id: string;
}

export type UserRole = "client" | "admin";
