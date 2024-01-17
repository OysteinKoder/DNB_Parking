import { FaWheelchair, FaCar } from "react-icons/fa";
import { MdFamilyRestroom } from "react-icons/md";
import { Anchor, Button } from "@dnb/eufemia";
import { AiFillThunderbolt } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { ParkContext } from "../context/context";
import { useNavigate } from "react-router";

function ChooseParkingPage() {
  const [parkedCar, setParkedCar] = useState(() => {
    const savedParkedCar = localStorage.getItem("parkedCar");
    return savedParkedCar ? JSON.parse(savedParkedCar) : [];
  });
  // Get context value
  const contextValue = useContext(ParkContext);

  // Initialize navigate function
  const navigate = useNavigate();

  // Throw an error if contextValue is undefined
  if (!contextValue) {
    throw new Error("ParkContext is undefined");
  }

  // Destructure data and setData from contextValue
  const { data, setData } = contextValue;

  // Get selectedFloor from data
  // @ts-ignore
  const selectedFloor = data.selectedFloor;

  // Get currentFloor from data or set to an empty array if undefined
  const currentFloor = data[selectedFloor]
    ? data[selectedFloor].parkingSpots
    : [];

  const handleClick = (spotIdx: number) => {
    // Create a deep copy of data
    const newDatas = JSON.parse(JSON.stringify(data));

    // If the selected spot has free spots, decrement the number of free spots
    if (newDatas[selectedFloor].parkingSpots[spotIdx].freeSpots > 0) {
      newDatas[selectedFloor].parkingSpots[spotIdx].freeSpots--;
    } else {
      // If there are no free spots left, alert the user and return without updating the state
      window.alert("No free spots available");
      return;
    }

    const newVehicle = {
      id: Math.random().toString(),
      parkingFloor: selectedFloor,
      parkingType: newDatas[selectedFloor].parkingSpots[spotIdx].type,
      entryTime: new Date(),
    };

    console.log("newVehicle:", newVehicle); // Debugging line

    // Add the new vehicle to the parkedCar array
    setParkedCar(() => {
      const updatedParkedCar = [newVehicle];
      localStorage.setItem("parkedCar", JSON.stringify(updatedParkedCar));
      return updatedParkedCar;
    });

    // Update the state with the new data
    setData(newDatas);

    // Navigate to the "/leave-parking" route
    navigate("/leave-parking");
  };

  useEffect(() => {
    localStorage.setItem("parkedCar", JSON.stringify(parkedCar));
  }, [parkedCar]);

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
