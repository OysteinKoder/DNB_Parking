import { P } from "@dnb/eufemia";
import { HourlyRatesType } from "../types/types";
import { useParkingStore } from "../state/store";

const RatesDisplay: React.FC<HourlyRatesType> = () => {
  const hourlyRates = useParkingStore((state) => state.hourlyRates);
  return (
    <div className="capacityCard">
      <P>Current Rates Per Hour:</P>
      <div className="row">
        <P>1Hr: {hourlyRates.firstHour} </P>
        <P>2Hr: {hourlyRates.secondHour} </P>
        <P>3Hr - &: {hourlyRates.followingHours} </P>
      </div>
    </div>
  );
};

export default RatesDisplay;
