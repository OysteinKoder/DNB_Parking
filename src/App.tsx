import "./App.css";
import Floor from "./components/floor";
import parkData from "./data/parkingData.json";
import { H1, P, Space } from "@dnb/eufemia";
import { useState } from "react";
import { ParkContext } from "./context/context";

type ParkingSpot = {
  type: string;
  freeSpots: number;
};

type ParkData = {
  parkingSpots: ParkingSpot[];
};

function App() {
  const [data, setData] = useState<ParkData | undefined>(() => {
    const storedData = localStorage.getItem("parkingData");
    return storedData ? JSON.parse(storedData) : parkData;
  });

  // Use the useEffect hook to update localStorage whenever parkingData changes
  // renders page if parkingData is present\
  return data ? (
    <ParkContext.Provider value={{ data, setData }}>
      <>
        <H1>DNB Park</H1>
        <Space bottom="large" />
        <div className="pageContainer">
          <Floor />
        </div>
      </>
    </ParkContext.Provider>
  ) : (
    <P>Loading</P>
  );
}

export default App;
