import { useState } from "react";
import { Anchor, H3 } from "@dnb/eufemia";
import parkData from "../data/parkingData.json";
import { Spot } from "../types/types";

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
      // the price of 50 - 30 - 10 as in the task description makes it so that there are situations where the earnings go down if the car stays longer
      // so I changed it to 50 - 40 - 25 to ensure that the earnings always go up if a car is parked for longer
      return {
        firstHour: 50,
        secondHour: 40,
        followingHours: 25,
      };
    }
  });

  const [totalCapacity, setTotalCapacity] = useState({
    Normal: 50,
    Hc: 3,
    Ev: 10,
    Family: 5,
  });

  const [data] = useState<Spot[]>(() => {
    const storedData = localStorage.getItem("parkingData");
    if (storedData) {
      return JSON.parse(storedData);
    } else {
      return parkData;
    }
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHourlyRates({
      ...hourlyRates,
      [event.target.name]: parseFloat(event.target.value),
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
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

  const handleCapacitySubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Update total capacity in local storage
    localStorage.setItem("totalCapacity", JSON.stringify(totalCapacity));
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <Anchor href="/">Back</Anchor>
      <h2>Total Earnings: {calculateEarnings()}</h2>
      <form onSubmit={handleSubmit} className="floorCard">
        <label>
          First Hour Rate:
          <input
            type="number"
            name="firstHour"
            value={hourlyRates.firstHour}
            onChange={handleChange}
          />
        </label>
        <label>
          Second Hour Rate:
          <input
            type="number"
            name="secondHour"
            value={hourlyRates.secondHour}
            onChange={handleChange}
          />
        </label>
        <label>
          Following Hours Rate:
          <input
            type="number"
            name="followingHours"
            value={hourlyRates.followingHours}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Save Rates</button>
      </form>
      <H3>Change Capacity</H3>
      <form onSubmit={handleCapacitySubmit} className="floorCard">
        <label>
          Normal:
          <input
            type="number"
            name="Normal"
            value={totalCapacity.Normal}
            onChange={handleCapacityChange}
          />
        </label>
        <label>
          Hc:
          <input
            type="number"
            name="Hc"
            value={totalCapacity.Hc}
            onChange={handleCapacityChange}
          />
        </label>
        <label>
          Ev:
          <input
            type="number"
            name="Ev"
            value={totalCapacity.Ev}
            onChange={handleCapacityChange}
          />
        </label>
        <label>
          Family:
          <input
            type="number"
            name="Family"
            value={totalCapacity.Family}
            onChange={handleCapacityChange}
          />
        </label>
        <input type="submit" value="Update Total Capacity" />
      </form>
    </div>
  );
}

export default AdminPage;
