import { createContext } from "react";
import {
  HourlyRatesType,
  ParkContextType,
  ParkedCarContextType,
} from "../types/types";

// Create the context with a default value
const ParkContext = createContext<ParkContextType | undefined>(undefined);

const ParkedCar = createContext<ParkedCarContextType | undefined>(undefined);

const HourlyRates = createContext<HourlyRatesType | undefined>(undefined);

export { ParkContext, ParkedCar, HourlyRates };
