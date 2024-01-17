import { useState } from "react";
import { Anchor, H3 } from "@dnb/eufemia";
import { HourlyRatesType, ParkData } from "../context/context";
import parkData from "../data/parkingData.json";

function AdminPage() {
  const [hourlyRates, setHourlyRates] = useState({
    firstHour: 50,
    secondHour: 30,
    followingHours: 10,
  });

  const [totalCapacity, setTotalCapacity] = useState({
    Normal: 50,
    Hc: 3,
    Ev: 10,
    Family: 5, // Assuming there's no charge for Family type
  });

  const [data, setData] = useState<ParkData[]>(() => {
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
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    localStorage.setItem("hourlyRates", JSON.stringify(hourlyRates));
  };

  const calculateEarnings = () => {
    let totalEarnings = 0;

    Object.values(data).forEach((floor: any) => {
      if (floor.parkingSpots) {
        floor.parkingSpots.forEach((spot: any) => {
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
    localStorage.setItem("totalCapacity", JSON.stringify(totalCapacity));
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <Anchor href="/">Back</Anchor>
      <h2>Total Earnings: {calculateEarnings(data)}</h2>
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
