import "./App.css";
import Floors from "./components/floor";
import parkData from "./data/parkingData.json";
import { H1, P, Space } from "@dnb/eufemia";
import { useEffect, useState } from "react";
import { ParkContext, Num1 } from "./context/context";
import FloorsPage from "./pages/FloorsPage";

type ParkingSpot = {
  type: string;
  freeSpots: number;
};

type ParkData = {
  parkingSpots: ParkingSpot[];
};

function App() {
  const [data, setData] = useState<ParkData[]>(() => {
    const storedData = localStorage.getItem("parkingData");
    if (storedData) {
      return JSON.parse(storedData);
    } else {
      return parkData; // make sure parkData is an array of ParkData objects
    }
  });

  useEffect(() => {
    localStorage.setItem("parkingData", JSON.stringify(data));
  }, [data]);
  // Use the useEffect hook to update localStorage whenever parkingData changes
  // renders page if parkingData is present\
  return data ? (
    <ParkContext.Provider value={{ data, setData }}>
      <>
        <H1>DNB Park</H1>
        <Space bottom="large" />
        <div className="pageContainer">
          <FloorsPage />
        </div>
      </>
    </ParkContext.Provider>
  ) : (
    <P>Loading</P>
  );
}

export default App;
