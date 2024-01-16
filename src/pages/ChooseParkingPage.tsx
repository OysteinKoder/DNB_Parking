import { FaWheelchair, FaCar } from "react-icons/fa";
import { MdFamilyRestroom } from "react-icons/md";
import { Button, Space } from "@dnb/eufemia";
import { AiFillThunderbolt } from "react-icons/ai";
import { useContext } from "react";
import { ParkContext } from "../context/context";
import { useNavigate } from "react-router-dom";

function ChooseParkingPage() {
  const contextValue = useContext(ParkContext);

  if (!contextValue) {
    // Handle the case where the context value is undefined
    // For example, you could throw an error or return null from the component
    throw new Error("ParkContext is undefined");
  }
  const { data, setData } = contextValue;
  const parking = data.selectedFloor.parkingSpots;
  console.log(parking);

  const handleClick = (spotIndex: number) => {
    setData((prevData) => {
      // Create a deep copy of prevData
      const newData = JSON.parse(JSON.stringify(prevData));

      // Access the selected floor directly
      const selectedFloor = newData.selectedFloor;

      if (!selectedFloor) {
        // If the selected floor is not found, return the previous data
        return prevData;
      }

      if (selectedFloor.parkingSpots[spotIndex].freeSpots === 0) {
        // If there are no free spots left, return the previous data
        return prevData;
      }

      // Decrement the number of free spots
      selectedFloor.parkingSpots[spotIndex].freeSpots--;

      // Return the updated data
      return newData;
    });
  };
  return (
    <div className="floor">
      {parking.map((spot, spotIdx) => {
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
