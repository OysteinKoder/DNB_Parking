import { FaWheelchair, FaCar } from "react-icons/fa";
import { MdFamilyRestroom } from "react-icons/md";
import { Anchor, Button } from "@dnb/eufemia";
import { AiFillThunderbolt } from "react-icons/ai";
import { useContext, useState, useEffect } from "react";
import { ParkContext, Vehicle } from "../context/context";
import { useNavigate } from "react-router";

function ChooseParkingPage() {
  // Get context value
  const contextValue = useContext(ParkContext);

  // Initialize previousSpot state
  const [previousSpot, setPreviousSpot] = useState<number | null>(null);

  // Initialize parkedCars state from local storage or to an empty array
  const [parkedCars, setParkedCars] = useState(() => {
    const savedParkedCars = localStorage.getItem("parkedCars");
    return savedParkedCars ? JSON.parse(savedParkedCars) : [];
  });

  // Initialize navigate function
  const navigate = useNavigate();

  // Throw an error if contextValue is undefined
  if (!contextValue) {
    throw new Error("ParkContext is undefined");
  }

  // Destructure data and setData from contextValue
  const { data, setData } = contextValue;

  // Get selectedFloor from data
  const selectedFloor = data.selectedFloor;

  // Get currentFloor from data or set to an empty array if undefined
  const currentFloor = data[selectedFloor]
    ? data[selectedFloor].parkingSpots
    : [];

  const handleClick = (spotIdx: number) => {
    // Create a deep copy of data
    const newDatas = JSON.parse(JSON.stringify(data));

    // If a car is already parked, free up the previous spot
    if (previousSpot !== null) {
      newDatas[selectedFloor].parkingSpots[previousSpot].freeSpots++;
    }

    // If the selected spot has free spots, decrement the number of free spots
    if (newDatas[selectedFloor].parkingSpots[spotIdx].freeSpots > 0) {
      newDatas[selectedFloor].parkingSpots[spotIdx].freeSpots--;
    } else {
      // If there are no free spots left, alert the user and return without updating the state
      window.alert("No free spots available");
      return;
    }

    // Update the state with the new data
    setData(newDatas);

    // Update the previous spot
    setPreviousSpot(spotIdx);

    // Create a new vehicle object
    const newVehicle: Vehicle = {
      id: Math.random().toString(),
      parkingFloor: selectedFloor,
      parkingType: newDatas[selectedFloor].parkingSpots[spotIdx].type,
      entryTime: new Date(),
    };

    // Add the new vehicle to the parkedCars array and update local storage
    setParkedCars((prevParkedCars) => {
      const updatedParkedCars = [...prevParkedCars, newVehicle];
      localStorage.setItem("parkedCars", JSON.stringify(updatedParkedCars));
      return updatedParkedCars;
    });

    // Navigate to the "/leave-parking" route
    navigate("/leave-parking");
  };

  // Update local storage whenever parkedCars changes
  useEffect(() => {
    localStorage.setItem("parkedCars", JSON.stringify(parkedCars));
  }, [parkedCars]);

  useEffect(() => {
    localStorage.setItem("previousSpot", JSON.stringify(previousSpot));
  }, [previousSpot]);

  // Render the component
  return (
    <div className="floor">
      <div>
        <h2>P {selectedFloor + 1}</h2>
        <Anchor icon="chevron_left" iconPosition="left" href="/">
          {" "}
          Back
        </Anchor>
      </div>
      {currentFloor.map((spot, spotIdx) => (
        <div className="pickSpotCard" key={spotIdx}>
          <span className="floorCardText">
            {spot.type === "Hc" && <FaWheelchair />}
            {spot.type === "Family" && <MdFamilyRestroom />}
            {spot.type === "Ev" && <AiFillThunderbolt />}
            {spot.type === "Normal" && <FaCar />} {spot.freeSpots}
          </span>
          <Button text="park" on_click={() => handleClick(spotIdx)} />
        </div>
      ))}
    </div>
  );
}

export default ChooseParkingPage;