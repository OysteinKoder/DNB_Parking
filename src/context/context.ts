import { createContext } from "react";
import {
  HourlyRatesType,
  ParkContextType,
  ParkedCarContextType,
} from "../types/types";

// Create the context with a default value
const ParkContext = createContext<ParkContextType | undefined>(undefined);

const ParkedCar = createContext<ParkedCarContextType | undefined>(undefined);

const HourlyRatesContext = createContext<{
  hourlyRates: HourlyRatesType;
  setHourlyRates: React.Dispatch<React.SetStateAction<HourlyRatesType>>;
}>({
  hourlyRates: { firstHour: 50, secondHour: 40, followingHours: 25 },
  setHourlyRates: () => {},
});

export { ParkContext, ParkedCar, HourlyRatesContext };
