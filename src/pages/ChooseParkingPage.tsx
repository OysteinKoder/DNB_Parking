import { FaWheelchair, FaCar } from "react-icons/fa";
import { MdFamilyRestroom } from "react-icons/md";
import { Anchor, Button } from "@dnb/eufemia";
import { AiFillThunderbolt } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { ParkContext, Vehicle } from "../context/context";
import { useNavigate } from "react-router";

function ChooseParkingPage() {
  const contextValue = useContext(ParkContext);
  const [parkedCars, setParkedCars] = useState<Vehicle[]>(() => {
    // Try to get the initial state from local storage
    const savedParkedCars = localStorage.getItem("parkedCars");

    if (savedParkedCars) {
      // If the parked cars exist in local storage, parse them and return them
      return JSON.parse(savedParkedCars);
    } else {
      // If the parked cars do not exist in local storage, return an empty array
      return [];
    }
  });

  const navigate = useNavigate();

  if (!contextValue) {
    // Handle the case where the context value is undefined
    // For example, you could throw an error or return null from the component
    throw new Error("ParkContext is undefined");
  }
  const { data, setData } = contextValue;
  const selectedFloor = data.selectedFloor;
  const currentFloor = data[selectedFloor].parkingSpots;
  console.log(currentFloor);

  const handleClick = (spotIdx: number) => {
    // Check if there is already a parked car
    if (parkedCars.length > 0) {
      // If there is already a parked car, show an error message and return
      window.alert("Only one car can be parked at a time");
      return;
    }

    // Create a deep copy of data
    const newData = JSON.parse(JSON.stringify(data));

    // Check if the selected spot has free spots
    if (newData[selectedFloor].parkingSpots[spotIdx].freeSpots > 0) {
      // Decrement the number of free spots
      newData[selectedFloor].parkingSpots[spotIdx].freeSpots--;
    } else {
      // If there are no free spots left, return without updating the state
      window.alert("No free spots available");
      return;
    }

    // Create a new vehicle object
    const newVehicle = {
      id: Math.random().toString(), // Generate a random id
      parkingFloor: selectedFloor, // Store the parking floor
      parkingType: newData[selectedFloor].parkingSpots[spotIdx].type,
      entryTime: new Date(), // Set the entry time to the current time
    };

    // Add the new vehicle to the parkedCars array
    setParkedCars((prevParkedCars) => [...prevParkedCars, newVehicle]);

    // Update the state with the new data
    setData(newData);
    navigate("/leave-parking");
  };

  useEffect(() => {
    // Convert the parkedCars array to a JSON string
    const parkedCarsJson = JSON.stringify(parkedCars);

    // Save the JSON string in local storage
    localStorage.setItem("parkedCars", parkedCarsJson);
  }, [parkedCars]);

  return (
    <div className="floor">
      <div>
        <h2>P {selectedFloor + 1}</h2>

        <Anchor icon="chevron_left" iconPosition="left" href="/">
          {" "}
          Back
        </Anchor>
      </div>
      {currentFloor.map((spot, spotIdx) => {
        return (
          <div className="pickSpotCard" key={spotIdx}>
            <span className="floorCardText">
              {spot.type === "Hc" && <FaWheelchair />}
              {spot.type === "Family" && <MdFamilyRestroom />}
              {spot.type === "Ev" && <AiFillThunderbolt />}
              {spot.type === "Normal" && <FaCar />} {spot.freeSpots}
            </span>
            <Button text="park" on_click={() => handleClick(spotIdx)} />
          </div>
        );
      })}
    </div>
  );
}

export default ChooseParkingPage;
