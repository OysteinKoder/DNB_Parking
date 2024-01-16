import "./App.css";
import { H1, P, Space } from "@dnb/eufemia";
import Floor from "./components/floor";
import parkData from "./data/parkingData.json";
import { useEffect, useState } from "react";

type ParkingSpot = {
  type: string;
  freeSpots: number;
};

type ParkData = {
  parkingSpots: ParkingSpot[];
}[];

function App() {
  const [localStoreParkData, setLocalStoreParkData] = useState<
    ParkData | undefined
  >();
  useEffect(() => {
    // check if there is a key of "parkingData" in localStorage
    const storedData = localStorage.getItem("parkingData");
    if (storedData) {
      setLocalStoreParkData(JSON.parse(storedData));
    } else {
      localStorage.setItem("parkingData", JSON.stringify(parkData));
      setLocalStoreParkData(parkData);
    }
  }, []);

  if (localStoreParkData) {
    return (
      <>
        <H1>DNB Park</H1>
        <Space bottom="large" />
        <div className="pageContainer">
          <Floor parkData={localStoreParkData} />
        </div>
      </>
    );
  } else return;
  <P>Loading</P>;
}

export default App;
