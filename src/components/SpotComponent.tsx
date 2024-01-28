import { AiFillThunderbolt } from "react-icons/ai";
import { FaWheelchair, FaCar } from "react-icons/fa";
import { MdFamilyRestroom } from "react-icons/md";
import { Spot } from "../types/types";

const SpotComponent = ({ spot }: { spot: Spot }) => (
  <div>
    <span className={`textMargin ${spot.freeSpots === 0 ? "red" : "green"}`}>
      {spot.type === "Hc" && <FaWheelchair />}
      {spot.type === "Family" && <MdFamilyRestroom />}
      {spot.type === "Ev" && <AiFillThunderbolt />}
      {spot.type === "Normal" && <FaCar />} {spot.freeSpots}
    </span>
  </div>
);

export default SpotComponent;
