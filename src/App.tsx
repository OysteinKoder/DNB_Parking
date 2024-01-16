import "./App.css";
import Floors from "./components/floor";
import parkData from "./data/parkingData.json";
import { H1, P, Space } from "@dnb/eufemia";
import { useEffect, useState } from "react";
import { ParkContext, Num1 } from "./context/context";
import FloorsPage from "./pages/FloorsPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChooseParkingPage from "./pages/ChooseParkingPage";

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
      <BrowserRouter basename="">
        <div className="pageContainer">
          <H1>DNB Park</H1>
          <Space bottom="large" />
          <Routes>
            <Route path="/" element={<FloorsPage />} />
            <Route path="/choose-parking" element={<ChooseParkingPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ParkContext.Provider>
  ) : (
    <P>Loading</P>
  );
}

export default App;
