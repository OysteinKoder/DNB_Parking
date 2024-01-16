import { createContext } from "react";

type ParkingSpot = {
  type: string;
  freeSpots: number;
};

type ParkData = {
  parkingSpots: ParkingSpot[];
};

type ParkContextType = {
  data: ParkData[];
  setData: React.Dispatch<React.SetStateAction<ParkData[]>>;
};

// Create the context with a default value
const ParkContext = createContext<ParkContextType | undefined>(undefined);

export { ParkContext };
