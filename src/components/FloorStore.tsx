import React from "react";
import { Button, Space } from "@dnb/eufemia";
import { FaWheelchair, FaCar } from "react-icons/fa";
import { MdFamilyRestroom } from "react-icons/md";
import { AiFillThunderbolt } from "react-icons/ai";
import { FloorStoreProps } from "../types/types";

const FloorStore: React.FC<FloorStoreProps> = ({
  floor,
  floorIdx,
  handleClick,
}) => (
  <div key={floorIdx}>
    <h3>P {floorIdx + 1}</h3>
    <div className="floorCard ">
      {floor.parkingSpots.map((spot: any, spotIdx: number) => (
        <div key={spotIdx}>
          <span
            className={`textMargin ${spot.freeSpots === 0 ? "red" : "green"}`}
          >
            {spot.type === "Hc" && <FaWheelchair />}
            {spot.type === "Family" && <MdFamilyRestroom />}
            {spot.type === "Ev" && <AiFillThunderbolt />}
            {spot.type === "Normal" && <FaCar />} {spot.freeSpots}
          </span>
        </div>
      ))}
    </div>
    <Button
      onClick={() => handleClick(floorIdx)}
      disabled={floor.parkingSpots.every((spot: any) => spot.freeSpots === 0)}
    >
      Select
    </Button>
    <Space bottom="2.5rem" />
  </div>
);

export default FloorStore;
