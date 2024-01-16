import { FaWheelchair, FaCar } from "react-icons/fa";
import { MdFamilyRestroom } from "react-icons/md";
import { Button, Space } from "@dnb/eufemia";
import { AiFillThunderbolt } from "react-icons/ai";
import { useContext } from "react";
import { ParkContext } from "../context/context";

function Floor() {
  const contextValue = useContext(ParkContext);

  if (!contextValue) {
    // Handle the case where the context value is undefined
    // For example, you could throw an error or return null from the component
    throw new Error("ParkContext is undefined");
  }

  const { data, setData } = contextValue;

  const handlePark = (idx: number) => {
    // Create a new array with the updated parking data
    const updatedData = data.map((floor, index) => {
      if (index === idx) {
        // This is the floor where we want to park
        // Update the number of free spots for the normal parking spot
        return {
          ...floor,
          parkingSpots: floor.parkingSpots.map((spot) =>
            spot.type === "Normal"
              ? { ...spot, freeSpots: spot.freeSpots - 1 }
              : spot
          ),
        };
      } else {
        // This is not the floor where we want to park, so leave it unchanged
        return floor;
      }
    });

    // Update the state with the new parking data
    setData(updatedData);
    console.log(data[0].parkingSpots[3].freeSpots);
    localStorage.setItem("parkingData", JSON.stringify(updatedData));
  };

  if (data) {
    return (
      <>
        <h2>Floors</h2>
        {data.map((floor, idx) => {
          return (
            <div className="dottedBottom reverse" key={idx}>
              <Space bottom="large" />
              <Button text="Park" variant="secondary" on_click={handlePark} />
              <div className="floorCard">
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
            </div>
          );
        })}
      </>
    );
  } else return <p>Loading</p>;
}

export default Floor;
