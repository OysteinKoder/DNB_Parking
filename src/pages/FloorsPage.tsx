import { FaWheelchair, FaCar } from "react-icons/fa";
import { MdFamilyRestroom } from "react-icons/md";
import { Button, Space } from "@dnb/eufemia";
import { AiFillThunderbolt } from "react-icons/ai";
import { useContext } from "react";
import { ParkContext } from "../context/context";
import { useNavigate } from "react-router-dom";

function FloorsPage() {
  const contextValue = useContext(ParkContext);
  const navigate = useNavigate();

  if (!contextValue) {
    // Handle the case where the context value is undefined
    // For example, you could throw an error or return null from the component
    throw new Error("ParkContext is undefined");
  }

  const { data, setData } = contextValue;
  console.log(data);

  const handleClick = (floorIdx: number) => {
    // Set selectedFloor to the index of the selected floor
    setData((prevData) => {
      const updatedData = { ...prevData, selectedFloor: floorIdx };
      return updatedData;
    });

    // Navigate to the "/choose-parking" path
    navigate("/choose-parking");
  };

  let firstThreeFloors = [];
  for (let i = 0; i < 3 && i < data.length; i++) {
    firstThreeFloors.push(data[i]);
  }

  if (data.length === 3) {
    return (
      <>
        <h2>Floors</h2>
        <div>
          {firstThreeFloors.map((floor, floorIdx) => (
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
              <Button on_click={() => handleClick(floorIdx, 0)}>Select</Button>
              <Space bottom="2.5rem" />
            </div>
          ))}
        </div>
      </>
    );
  } else if (data.selectedFloor !== undefined) {
    // data.selectedFloor exists
    console.log(data);
    return (
      <>
        <h2>Floors</h2>
        <div>
          {Object.keys(data).map((key) => {
            if (key === "selectedFloor") return null; // Skip the 'selectedFloor' key

            const floor = data[key];
            return (
              <div key={key}>
                <h3>P {parseInt(key) + 1}</h3>
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
                <Button onClick={() => handleClick(parseInt(key), 0)}>
                  Select
                </Button>
                <Space bottom="2.5rem" />
              </div>
            );
          })}
        </div>
      </>
    );
  } else {
    // data.selectedFloor does not exist
    return <p>error</p>;
  }
}
export default FloorsPage;
