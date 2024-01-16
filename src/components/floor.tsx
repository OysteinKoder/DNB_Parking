import { FaWheelchair, FaCar } from "react-icons/fa";
import { MdFamilyRestroom } from "react-icons/md";
import { Button, Space } from "@dnb/eufemia";
import { AiFillThunderbolt } from "react-icons/ai";
import { useContext } from "react";
import { ParkContext, Num1 } from "../context/context";

function Floor() {
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
                return { ...spot, freeSpots: spot.freeSpots - 1 };
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
        {data.map((floor, floorIdx) =>
          floor.parkingSpots.map((spot, spotIdx) => (
            <div className="floorCard">
              <Button on_click={() => handleClick(floorIdx, spotIdx)}>
                park
              </Button>
              {floor.parkingSpots.map((spot) => (
                <div key={spot.type}>
                  <span className="floorCardText">
                    {spot.type === "Hc" && <FaWheelchair />}
                    {spot.type === "Family" && <MdFamilyRestroom />}
                    {spot.type === "Ev" && <AiFillThunderbolt />}
                    {spot.type === "Normal" && <FaCar />} {spot.freeSpots}
                  </span>
                </div>
              ))}
            </div>
          ))
        )}
      </>
    );
  } else return <p>Loading</p>;
}

export default Floor;
