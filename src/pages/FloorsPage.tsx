import { FaWheelchair, FaCar } from "react-icons/fa";
import { MdFamilyRestroom } from "react-icons/md";
import { Button, Space } from "@dnb/eufemia";
import { AiFillThunderbolt } from "react-icons/ai";
import { useContext } from "react";
import { ParkContext } from "../context/context";

function FloorsPage() {
  const contextValue = useContext(ParkContext);

  if (!contextValue) {
    // Handle the case where the context value is undefined
    // For example, you could throw an error or return null from the component
    throw new Error("ParkContext is undefined");
  }

  const { data, setData } = contextValue;

  console.log(data);

  const handleClick = (floorIdx: number, spotIdx: number) => {
    console.log("floorIdx:", floorIdx);
    console.log("spotIdx:", spotIdx);
    setData((prevData) => {
      // Create a new array with the updated parking data
      const updatedData = prevData.map((floor, index) => {
        if (index === floorIdx) {
          // This is the floor where we want to park
          // Update the number of free spots for the parking spot
          return {
            ...floor,
            parkingSpots: floor.parkingSpots.map((spot, spotIndex) => {
              if (spotIndex === spotIdx) {
                // This is the spot we want to update
                if (spot.freeSpots === 0) {
                  // If there are no free spots left, show a warning and don't decrement
                  alert(`No spots left of type ${spot.type}`);
                  return spot;
                } else {
                  // If there are free spots left, decrement the number of free spots
                  return { ...spot, freeSpots: spot.freeSpots - 1 };
                }
              } else {
                // This is not the spot we want to update, so leave it unchanged
                return spot;
              }
            }),
          };
        } else {
          // This is not the floor where we want to park, so leave it unchanged
          return floor;
        }
      });

      return updatedData;
    });
  };

  if (data) {
    return (
      <>
        <h2>Floors</h2>
        <div>
          {data.map((floor, floorIdx) => (
            <div key={floorIdx}>
              <h3>P {floorIdx + 1}</h3>
              <div className="floorCard">
                {floor.parkingSpots.map((spot, spotIdx) => (
                  <div key={spotIdx}>
                    <span className="floorCardText">
                      {spot.type === "Hc" && <FaWheelchair />}
                      {spot.type === "Family" && <MdFamilyRestroom />}
                      {spot.type === "Ev" && <AiFillThunderbolt />}
                      {spot.type === "Normal" && <FaCar />} {spot.freeSpots}
                    </span>
                  </div>
                ))}
              </div>
              <Button on_click={() => handleClick(floorIdx, 0)}>park</Button>
              <Space bottom="2.5rem" />
            </div>
          ))}
        </div>
      </>
    );
  } else return <p>Loading</p>;
}

export default FloorsPage;
