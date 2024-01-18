import { P } from "@dnb/eufemia";
import { AiFillThunderbolt } from "react-icons/ai";
import { FaCar, FaWheelchair } from "react-icons/fa";
import { MdFamilyRestroom } from "react-icons/md";
import { CapacityDisplayType } from "../types/types";

const CapacityDisplay: React.FC<CapacityDisplayType> = ({ totalCapacity }) => (
  <div className="capacityCard">
    <P> Max Capacity per P:</P>
    <div className="row">
      <P>
        <FaCar />: {totalCapacity.Normal}
        {"  "}
      </P>
      <P>
        <FaWheelchair />: {totalCapacity.Hc}
        {"  "}
      </P>
      <P>
        <AiFillThunderbolt />: {totalCapacity.Ev}
        {"  "}
      </P>
      <P>
        <MdFamilyRestroom />: {totalCapacity.Family}
        {"  "}
      </P>
    </div>
  </div>
);

export default CapacityDisplay;
