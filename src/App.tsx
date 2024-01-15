import "./App.css";
import { Button } from "@dnb/eufemia";
import Floor from "./components/floor";

type ParkingSpot = {
  type: "Hc" | "Family" | "Ev" | "Normal";
  isAvailable: boolean;
};

type ParkingLot = {
  parkingSpots: ParkingSpot[];
};

const mockData: ParkingLot[] = [
  {
    parkingSpots: [
      { type: "Hc", isAvailable: true },
      { type: "Family", isAvailable: true },
      { type: "Ev", isAvailable: true },
      { type: "Normal", isAvailable: true },
    ],
  },
  {
    parkingSpots: [
      { type: "Hc", isAvailable: true },
      { type: "Family", isAvailable: true },
      { type: "Ev", isAvailable: true },
      { type: "Normal", isAvailable: true },
    ],
  },
  {
    parkingSpots: [
      { type: "Hc", isAvailable: true },
      { type: "Family", isAvailable: true },
      { type: "Ev", isAvailable: true },
      { type: "Normal", isAvailable: true },
    ],
  },
];

function App() {
  return (
    <>
      <div className="pageContainer">
        <Floor parkingpots={mockData} />
        <Button text="Button" />
        <p className="text-6xl">hey</p>
      </div>
    </>
  );
}

export default App;
