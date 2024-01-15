import { FaWheelchair } from "react-icons/fa";

function Floor({ parkingSpots }: { parkingSpots: any[] }) {
  console.log(parkingSpots);
  return (
    <>
      {parkingSpots.map((floor, idx) => {
        return (
          <div className="floorCard" key={idx}>
            <span>{floor.parkingSpots[1]}</span>
          </div>
        );
      })}
    </>
  );
}

export default Floor;
