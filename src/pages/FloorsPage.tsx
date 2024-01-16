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

  const handleClick = (floorIdx: number) => {
    // Add the selected floor data to the data state
    setData((prevData) => {
      const updatedData = { ...prevData, selectedFloor: prevData[floorIdx] };
      return updatedData;
    });

    // Navigate to the "/choose-parking" path
    navigate("/choose-parking");
  };

  console.log(data);

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
