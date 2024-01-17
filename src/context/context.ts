import { createContext } from "react";

type ParkingSpot = {
  type: string;
  freeSpots: number;
};

export type ParkData = {
  parkingSpots: ParkingSpot[];
};

type ParkContextType = {
  data: ParkData[];
  setData: React.Dispatch<React.SetStateAction<ParkData[]>>;
};

// Create the context with a default value
const ParkContext = createContext<ParkContextType | undefined>(undefined);

export type Vehicle = {
  id: string;
  parkingType: "Normal" | "Hc" | "Ev" | "Family";
  entryTime: Date;
};

type ParkedCarContextType = {
  ParkedCar: Vehicle[];
  setParkedCar: React.Dispatch<React.SetStateAction<Vehicle[]>>;
};

const ParkedCar = createContext<ParkedCarContextType | undefined>(undefined);

export type HourlyRatesType = {
  firstHour: number;
  secondHour: number;
  followingHours: number;
};

const HourlyRates = createContext<HourlyRatesType | undefined>(undefined);

export { ParkContext, ParkedCar, HourlyRates };
