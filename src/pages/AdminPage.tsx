import "./adminPage/style.css";
import parkData from "../data/parkingData.json";
import RatesDisplay from "../components/RatesDisplay";
import RatesForm from "../components/RatesForm";
import CapacityDisplay from "../components/capacityDisplay/CapacityDisplay";
import CapacityForm from "../components/capacityForm/CapacityForm";
import { useState } from "react";
import { Anchor } from "@dnb/eufemia/components";
import { Spot } from "../types/types";
import { useParkingStore } from "../state/store";

function AdminPage() {
  // Fetches States from localStorage if they exist, otherwise sets them to default values
  const [parkedCars] = useState<Spot[]>(() => {
    const storedData = localStorage.getItem("parkedCar");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      return Array.isArray(parsedData) ? parsedData : parkData;
    } else {
      return parkData;
    }
  });
  const hourlyRates = useParkingStore((state) => state.hourlyRates);

  const totalCapacity = useParkingStore((state) => state.totalCapacity);
  const setTotalCapacity = useParkingStore((state) => state.setTotalCapacity);

  const [data] = useState<Spot[]>(() => {
    const storedData = localStorage.getItem("parkingData");
    if (storedData) {
      return JSON.parse(storedData);
    } else {
      return parkData;
    }
  });

  // Calculate earnings for each parkedCar and dummy cars
  const calculateEarnings = () => {
    let totalEarnings = 0;

    // ParkedCars would come from backend in a real use-case and there would be no limitation on the number of cars.
    // On the client side the user is limited to only one parked car.
    const calculateParkedCarsEarnings = (duration: number) => {
      let earnings: number | string = 0;
      if (duration > 0) {
        if (duration >= 1) {
          earnings += hourlyRates.firstHour;
          duration--;
        }
        if (duration >= 1) {
          earnings += hourlyRates.secondHour;
          duration--;
        }
        if (duration > 0) {
          earnings += duration * hourlyRates.followingHours;
        }
      }
      return earnings;
    };

    // Earnings for each parkedCar, this is future-proofing the app for the case when there are multiple parked cars from backend.
    parkedCars.forEach((car: any) => {
      const { entryTime } = car;
      const duration = Math.ceil(
        (new Date().getTime() - new Date(entryTime).getTime()) /
          (1000 * 60 * 60)
      );
      totalEarnings += calculateParkedCarsEarnings(duration);
    });
    totalEarnings = parseFloat(totalEarnings.toFixed(2));

    // Earnings for each parking spot ("dummy cars")
    // Would not be needed in a real use-case since all parked cars would be from backend.
    // Is calculated based on the total capacity of each type of parking spot -  freeSpots.
    Object.values(data).forEach((floor: any) => {
      if (floor.parkingSpots) {
        floor.parkingSpots.forEach((spot: Spot) => {
          const numParkedCars = totalCapacity[spot.type] - spot.freeSpots;
          if (Number.isInteger(numParkedCars) && numParkedCars > 0) {
            const parkedCars = Array(numParkedCars)
              .fill(0)
              .map(() => ({
                duration: 3,
              }));
            parkedCars.forEach((car: any) => {
              totalEarnings += calculateParkedCarsEarnings(car.duration);
            });
          }
        });
      }
    });

    //
    totalEarnings = parseFloat(totalEarnings.toFixed(2));
    return totalEarnings.toLocaleString("no-NO", {
      style: "currency",
      currency: "NOK",
    });
  };

  const handleCapacityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTotalCapacity({
      ...totalCapacity,
      [event.target.name]: parseInt(event.target.value, 10),
    });
  };

  return (
    <div className="center">
      <h1>Admin Page</h1>
      <Anchor href="/">Back</Anchor>
      <h2>Total Earnings: {calculateEarnings()}</h2>
      <h3>Rates</h3>
      <RatesDisplay hourlyRates={hourlyRates} />
      <RatesForm hourlyRates={hourlyRates} />
      <h3>Max Capacity</h3>
      <CapacityDisplay totalCapacity={totalCapacity} />
      <CapacityForm
        totalCapacity={totalCapacity}
        handleCapacityChange={handleCapacityChange}
        handleCapacitySubmit={() => changeStoreCapacity()}
      />
    </div>
  );
}

export default AdminPage;
