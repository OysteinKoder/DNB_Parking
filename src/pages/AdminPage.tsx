import { useState } from "react";
import { Anchor } from "@dnb/eufemia/components";
import parkData from "../data/parkingData.json";
import { Spot } from "../types/types";
import RatesDisplay from "../components/RatesDisplay";
import RatesForm from "../components/RatesForm";
import CapacityDisplay from "../components/CapacityDisplay";
import CapacityForm from "../components/CapacityForm";

function AdminPage() {
  const [parkedCars] = useState<Spot[]>(() => {
    const storedData = localStorage.getItem("parkingData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      return Array.isArray(parsedData) ? parsedData : parkData;
    } else {
      return parkData;
    }
  });
  const [hourlyRates, setHourlyRates] = useState(() => {
    const storedRates = localStorage.getItem("hourlyRates");
    if (storedRates) {
      return JSON.parse(storedRates);
    } else {
      return {
        firstHour: 50,
        secondHour: 40,
        followingHours: 25,
      };
    }
  });

  const [totalCapacity, setTotalCapacity] = useState(() => {
    const storedCapacity = localStorage.getItem("totalCapacity");
    if (storedCapacity) {
      return JSON.parse(storedCapacity);
    } else {
      const initialCapacity = {
        Normal: 50,
        Hc: 3,
        Ev: 10,
        Family: 5,
      };
      localStorage.setItem("totalCapacity", JSON.stringify(initialCapacity));
      return initialCapacity;
    }
  });

  const [data] = useState<Spot[]>(() => {
    const storedData = localStorage.getItem("parkingData");
    if (storedData) {
      return JSON.parse(storedData);
    } else {
      return parkData;
    }
  });

  const handleRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHourlyRates({
      ...hourlyRates,
      [event.target.name]: parseFloat(event.target.value),
    });
  };

  const handleRateSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    localStorage.setItem("hourlyRates", JSON.stringify(hourlyRates));
  };

  const calculateEarnings = () => {
    let totalEarnings = 0;

    // earnings for each car parked
    parkedCars.forEach((car: any) => {
      const { entryTime } = car;

      // Calculate the duration in minutes
      const duration = Math.ceil(
        (new Date().getTime() - new Date(entryTime).getTime()) / (1000 * 60)
      );

      // Calculate earnings based on the per-minute rates and duration
      let earnings = 0;
      if (duration > 0) {
        if (duration <= 60) {
          earnings = (hourlyRates.firstHour / 60) * duration; // Increment earnings every minute for the first hour
        } else {
          earnings += hourlyRates.firstHour; // Add the earnings for the first hour
          if (duration <= 120) {
            earnings += (hourlyRates.secondHour / 60) * (duration - 60); // Increment earnings every minute for the second hour
          } else {
            earnings += hourlyRates.secondHour; // Add the earnings for the second hour
            earnings += ((duration - 120) * hourlyRates.followingHours) / 60; // Increment earnings every minute for the following hours
          }
        }
      }

      totalEarnings += earnings;
    });

    // Round totalEarnings to two decimal places
    totalEarnings = parseFloat(totalEarnings.toFixed(2));

    // earnings for each "dummy" car parked
    Object.values(data).forEach((floor: any) => {
      if (floor.parkingSpots) {
        floor.parkingSpots.forEach((spot: Spot) => {
          const numParkedCars = totalCapacity[spot.type] - spot.freeSpots;

          if (Number.isInteger(numParkedCars) && numParkedCars > 0) {
            const parkedCars = Array(numParkedCars)
              .fill(0)
              .map(() => ({
                duration: 3, // Set duration to 3 hours
              }));

            parkedCars.forEach((car: any) => {
              if (car.duration === 1) {
                totalEarnings += hourlyRates.firstHour;
              } else if (car.duration === 2) {
                totalEarnings += hourlyRates.secondHour;
              } else if (car.duration > 2) {
                totalEarnings +=
                  hourlyRates.secondHour +
                  (car.duration - 2) * hourlyRates.followingHours;
              }
            });
          }
        });
      }
    });

    return totalEarnings;
  };

  const handleCapacityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTotalCapacity({
      ...totalCapacity,
      [event.target.name]: parseInt(event.target.value, 10),
    });
  };

  const handleCapacitySubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updatedTotalCapacity = {
      Normal: Number(event.currentTarget.Normal.value),
      Hc: Number(event.currentTarget.Hc.value),
      Ev: Number(event.currentTarget.Ev.value),
      Family: Number(event.currentTarget.Family.value),
    };

    // Update totalCapacity in the state
    setTotalCapacity(updatedTotalCapacity);

    // Update totalCapacity in the localStorage
    localStorage.setItem("totalCapacity", JSON.stringify(updatedTotalCapacity));
  };

  return (
    <div className="center">
      <h1>Admin Page</h1>
      <Anchor href="/">Back</Anchor>
      <h2>Total Earnings: {calculateEarnings()}</h2>
      <h3>Rates</h3>
      <RatesDisplay hourlyRates={hourlyRates} />
      <RatesForm
        hourlyRates={hourlyRates}
        handleRateChange={handleRateChange}
        handleRateSubmit={handleRateSubmit}
      />
      <h3>Max Capacity</h3>
      <CapacityDisplay totalCapacity={totalCapacity} />
      <CapacityForm
        totalCapacity={totalCapacity}
        handleCapacityChange={handleCapacityChange}
        handleCapacitySubmit={handleCapacitySubmit}
      />
    </div>
  );
}

export default AdminPage;
