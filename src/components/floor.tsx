import { FaWheelchair } from "react-icons/fa";
import { MdFamilyRestroom } from "react-icons/md";
import { AiFillThunderbolt } from "react-icons/ai";
import { FaCar } from "react-icons/fa";
import { Button, P, Space } from "@dnb/eufemia";

type ParkData = {
  parkingSpots: {
    type: string;
    freeSpots: number;
  }[];
}[];

function Floor({ parkData }: { parkData: ParkData }) {
  console.log(parkData);
  return (
    <>
      <h2>Floors</h2>
      {parkData.map((floor, idx) => {
        return (
          <div className="dottedBottom reverse" key={idx}>
            <Space bottom="large" />
            <Button text="Park" variant="secondary" className="shadow" />
            <div className="floorCard" key={idx}>
              {floor.parkingSpots.map((spot: any) => {
                return (
                  <div key={spot.type}>
                    <span className="floorCardText">
                      {spot.type === "Hc" && <FaWheelchair />}
                      {spot.type === "Family" && <MdFamilyRestroom />}
                      {spot.type === "Ev" && <AiFillThunderbolt />}
                      {spot.type === "Normal" && <FaCar />} {spot.freeSpots}
                    </span>
                  </div>
                );
              })}
            </div>
            <P>
              {" "}
              <b>P {idx} </b>{" "}
            </P>
          </div>
        );
      })}
    </>
  );
}

export default Floor;
