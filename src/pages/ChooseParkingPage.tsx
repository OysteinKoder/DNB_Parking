import { FaWheelchair, FaCar } from "react-icons/fa";
import { MdFamilyRestroom } from "react-icons/md";
import { Anchor, Button } from "@dnb/eufemia";
import { AiFillThunderbolt } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { ParkContext } from "../context/context";
import { useNavigate } from "react-router";
import { Spot } from "../types/types";

function ChooseParkingPage() {
  const [parkedCar, setParkedCar] = useState(() => {
    const savedParkedCar = localStorage.getItem("parkedCar");
    return savedParkedCar ? JSON.parse(savedParkedCar) : [];
  });
  const contextValue = useContext(ParkContext);
  const navigate = useNavigate();
  if (!contextValue) {
    throw new Error("ParkContext is undefined");
  }

  // Destructure data and setData from contextValue
  const { data, setData } = contextValue;
  // @ts-ignore
  const selectedFloor = data.selectedFloor;
  const currentFloor = data[selectedFloor]
    ? data[selectedFloor].parkingSpots
    : [];

  // Update the free spots in the selected floor and add the new vehicle to the parkedCar array, + save to localStorage
  const handleClick = (spotIdx: number) => {
    const newDatas = JSON.parse(JSON.stringify(data));
    if (newDatas[selectedFloor].parkingSpots[spotIdx].freeSpots > 0) {
      newDatas[selectedFloor].parkingSpots[spotIdx].freeSpots--;
    } else {
      window.alert("No free spots available");
      return;
    }

    const newVehicle = {
      id: Math.random().toString(),
      parkingFloor: selectedFloor,
      parkingType: newDatas[selectedFloor].parkingSpots[spotIdx].type,
      entryTime: new Date(),
    };

    setParkedCar(() => {
      const updatedParkedCar = [newVehicle];
      localStorage.setItem("parkedCar", JSON.stringify(updatedParkedCar));
      return updatedParkedCar;
    });
    setData(newDatas);
    navigate("/leave-parking");
  };

  // Save parkedCar to localStorage when parkedCar changes
  useEffect(() => {
    localStorage.setItem("parkedCar", JSON.stringify(parkedCar));
  }, [parkedCar]);

  return (
    <div className="floor">
      <div>
        <h2>P {selectedFloor + 1}</h2>
        <Anchor icon="chevron_left" iconPosition="left" href="/">
          {" "}
          Back
        </Anchor>
      </div>
      {currentFloor.map((spot: Spot, spotIdx: number) => (
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
