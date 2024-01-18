import { Button } from "@dnb/eufemia";
import { FloorComponentProps, Spot } from "../types/types";
import SpotComponent from "./SpotComponent";

const FloorComponent: React.FC<FloorComponentProps> = ({
  data,
  handleClick,
}) => {
  return (
    <>
      {data.map((floor, floorIdx) =>
        floor.parkingSpots.map((_spot: Spot, spotIdx: number) => (
          <div className="floorCard" key={spotIdx}>
            <Button onClick={() => handleClick(floorIdx, spotIdx)}>park</Button>
            <div className="floorCard">
              {floor.parkingSpots.map((spot: Spot, spotIndex: number) => (
                <SpotComponent key={spotIndex} spot={spot} />
              ))}
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default FloorComponent;
