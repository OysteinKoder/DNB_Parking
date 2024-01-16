import { FaWheelchair, FaCar } from "react-icons/fa";
import { MdFamilyRestroom } from "react-icons/md";
import { Button, Space } from "@dnb/eufemia";
import { AiFillThunderbolt } from "react-icons/ai";
import { useContext } from "react";
import { ParkContext } from "../context/context";

function ChooseParkingPage() {
  const contextValue = useContext(ParkContext);

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
    // Create a deep copy of data
    const newData = JSON.parse(JSON.stringify(data));

    // Check if the selected spot has free spots
    if (newData[selectedFloor].parkingSpots[spotIdx].freeSpots > 0) {
      // Decrement the number of free spots
      newData[selectedFloor].parkingSpots[spotIdx].freeSpots--;
    } else {
      // If there are no free spots left, return without updating the state
      console.warn("No free spots available");
      return;
    }

    // Update the state with the new data
    setData(newData);
  };

  return (
    <div className="floor">
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
