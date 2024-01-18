type SpotType = "Normal" | "Hc" | "Ev" | "Family";

export interface Spot {
  parkingSpots: any;
  type: SpotType;
  freeSpots: number;
}

export type Vehicle = {
  id: string;
  parkingType: "Normal" | "Hc" | "Ev" | "Family";
  entryTime: Date;
};

export type ParkContextType = {
  data: Spot[];
  setData: React.Dispatch<React.SetStateAction<Spot[]>>;
};

export type ParkedCarContextType = {
  ParkedCar: Vehicle[];
  setParkedCar: React.Dispatch<React.SetStateAction<Vehicle[]>>;
};

export type HourlyRatesType = {
  firstHour: number;
  secondHour: number;
  followingHours: number;
};

export type Floor = {
  parkingSpots: Spot[];
};

export type FloorComponentProps = {
  data: Floor[];
  handleClick: (floorIndex: number, spotIndex: number) => void;
};

export type RatesFormProps = {
  hourlyRates: HourlyRatesType;
  handleRateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRateSubmit: (event: React.FormEvent) => void;
};

interface totalCapacity {
  Normal: number;
  Hc: number;
  Ev: number;
  Family: number;
}

export type CapacityDisplayType = {
  totalCapacity: totalCapacity;
};

export type CapacityFormProps = {
  totalCapacity: totalCapacity;
  handleCapacityChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCapacitySubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};
