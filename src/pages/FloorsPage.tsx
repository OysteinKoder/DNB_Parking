import { Anchor } from "@dnb/eufemia";
import { useContext } from "react";
import { ParkContext } from "../context/context";
import { useNavigate } from "react-router-dom";
import FloorStore from "../components/FloorStore";

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

  return (
    <div>
      <h2>Floors</h2>
      <Anchor href="/admin-page">Admin Page</Anchor>
      {data.length === 3
        ? data
            .slice(0, 3)
            .map((floor, idx) => (
              <FloorStore
                floor={floor}
                floorIdx={idx}
                handleClick={handleClick}
                key={idx}
              />
            ))
        : Object.keys(data)
            .filter((key) => key !== "selectedFloor")
            .map((key) => (
              <FloorStore
                floor={(data as Record<string, any>)[key]}
                floorIdx={parseInt(key)}
                handleClick={handleClick}
              />
            ))}
    </div>
  );
}
export default FloorsPage;
