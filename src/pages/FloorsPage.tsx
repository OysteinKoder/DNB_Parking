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
    throw new Error("ParkContext is undefined");
  }

  const { data, setData } = contextValue;

  const handleClick = (floorIdx: number) => {
    setData((prevData) => ({ ...prevData, selectedFloor: floorIdx }));
    navigate("/choose-parking");
  };

  const renderFloor = (floor: any, floorIdx: number) => (
    <div key={floorIdx}>
      <h3>P {floorIdx + 1}</h3>
      <div className="floorCard">
        {floor.parkingSpots.map((spot: any, spotIdx: number) => (
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
      <Button onClick={() => handleClick(floorIdx)}>Select</Button>
      <Space bottom="2.5rem" />
    </div>
  );

  return (
    <div>
      <h2>Floors</h2>
      {data.length === 3
        ? data.slice(0, 3).map(renderFloor)
        : Object.keys(data)
            .filter((key) => key !== "selectedFloor")
            .map((key) =>
              renderFloor((data as Record<string, any>)[key], parseInt(key))
            )}
    </div>
  );
}
export default FloorsPage;
