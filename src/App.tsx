import "./App.css";
import Floor from "./components/floor";
import parkData from "./data/parkingData.json";
import { H1, P, Space } from "@dnb/eufemia";
import { useEffect, useState } from "react";

type ParkingSpot = {
  type: string;
  freeSpots: number;
};

type ParkData = {
  parkingSpots: ParkingSpot[];
}[];

function App() {
  const [parkingData, setParkingData] = useState<ParkData | undefined>(
    () => JSON.parse(localStorage.getItem("parkingData") || "null") || parkData
  );

  // Use the useEffect hook to update localStorage whenever parkingData changes
  useEffect(() => {
    localStorage.setItem("parkingData", JSON.stringify(parkingData));
  }, [parkingData]);

  // renders page if parkingData is present
  return parkingData ? (
    <>
      <H1>DNB Park</H1>
      <Space bottom="large" />
      <div className="pageContainer">
        <Floor parkData={parkingData} />
      </div>
    </>
  ) : (
    <P>Loading</P>
  );
}

export default App;
