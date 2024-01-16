import { FaWheelchair, FaCar } from "react-icons/fa";
import { MdFamilyRestroom } from "react-icons/md";
import { Button, Space } from "@dnb/eufemia";
import { AiFillThunderbolt } from "react-icons/ai";

type ParkData = {
  parkingSpots: {
    type: string;
    freeSpots: number;
  }[];
}[];

function Floor({ parkData }: { parkData: ParkData }) {
  return (
    <>
      <h2>Floors</h2>
      {parkData.map((floor, idx) => (
        <div className="dottedBottom reverse" key={idx}>
          <Space bottom="large" />
          <Button text="Park" variant="secondary" className="shadow" />
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
      ))}
    </>
  );
}

export default Floor;
