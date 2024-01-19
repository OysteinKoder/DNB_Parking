import { useContext } from "react";
import { ParkContext } from "../context/context";
import FloorComponent from "./FloorComponent";

function Floors() {
  const contextValue = useContext(ParkContext);
  if (!contextValue) {
    throw new Error("ParkContext is undefined");
  }

  const { data, setData } = contextValue;

  const handleClick = (floorIdx: number, spotIdx: number) => {
    setData((prevData) => {
      // New array with the updated parking data and free spots
      const updatedData = prevData.map((floor, index) => {
        if (index === floorIdx) {
          return {
            ...floor,
            parkingSpots: floor.parkingSpots.map(
              (spot: { freeSpots: number }, spotIndex: number) => {
                if (spotIndex === spotIdx) {
                  return { ...spot, freeSpots: spot.freeSpots - 1 };
                } else {
                  return spot;
                }
              }
            ),
          };
        } else {
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
        <FloorComponent data={data} handleClick={handleClick} />
      </>
    );
  } else return <p>Loading</p>;
}

export default Floors;
