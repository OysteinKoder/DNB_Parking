import "./App.css";
import parkData from "./data/parkingData.json";
import { H1, P, Space } from "@dnb/eufemia";
import { createContext, useEffect, useState } from "react";
import { ParkContext, HourlyRatesContext } from "./context/context";
import FloorsPage from "./pages/FloorsPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChooseParkingPage from "./pages/ChooseParkingPage";
import LeaveParkingPage from "./pages/LeaveParkingPage";
import AdminPage from "./pages/AdminPage";
import { HourlyRatesType, Spot, Vehicle } from "./types/types";

function App() {
  const [data, setData] = useState<Spot[]>(() => {
    const storedData = localStorage.getItem("parkingData");
    if (storedData) {
      return JSON.parse(storedData);
    } else {
      return parkData;
    }
  });

  const ParkedCarContext = createContext<{
    ParkedCar: Vehicle[];
    setParkedCar: React.Dispatch<React.SetStateAction<Vehicle[]>>;
  }>({ ParkedCar: [], setParkedCar: () => {} });

  const [hourlyRates, setHourlyRates] = useState<HourlyRatesType>(() => {
    const storedRates = localStorage.getItem("hourlyRates");
    return storedRates
      ? JSON.parse(storedRates)
      : { firstHour: 50, secondHour: 40, followingHours: 25 };
  });

  const [ParkedCar, setParkedCar] = useState<Vehicle[]>(() => {
    const storedCars = localStorage.getItem("ParkedCar");
    return storedCars ? JSON.parse(storedCars) : [];
  });

  useEffect(() => {
    localStorage.setItem("hourlyRates", JSON.stringify(hourlyRates));
  }, [hourlyRates]);

  useEffect(() => {
    localStorage.setItem("parkingData", JSON.stringify(data));
  }, [data]);
  // Use the useEffect hook to update localStorage whenever parkingData changes
  // renders page if parkingData is present\
  return data ? (
    <ParkContext.Provider value={{ data, setData }}>
      <ParkedCarContext.Provider value={{ ParkedCar, setParkedCar }}>
        <HourlyRatesContext.Provider value={{ hourlyRates, setHourlyRates }}>
          <BrowserRouter basename="">
            <div className="pageContainer">
              <H1>DNB Park</H1>
              <Space bottom="large" />

              <Routes>
                <Route path="/admin-page" element={<AdminPage />} />
                <Route path="/" element={<FloorsPage />} />
                <Route path="/choose-parking" element={<ChooseParkingPage />} />
                <Route path="/leave-parking" element={<LeaveParkingPage />} />
              </Routes>
            </div>
          </BrowserRouter>
        </HourlyRatesContext.Provider>
      </ParkedCarContext.Provider>
    </ParkContext.Provider>
  ) : (
    <P>Loading</P>
  );
}

export default App;
