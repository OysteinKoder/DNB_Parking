import { P } from "@dnb/eufemia";
import { HourlyRatesType } from "../types/types";

const RatesDisplay: React.FC<{ hourlyRates: HourlyRatesType }> = ({
  hourlyRates,
}) => (
  <div className="capacityCard">
    <P>Current Rates Per Hour:</P>
    <div className="row">
      <P>1Hr: {hourlyRates.firstHour} </P>
      <P>2Hr: {hourlyRates.secondHour} </P>
      <P>3Hr - &: {hourlyRates.followingHours} </P>
      {/* Add more rates here if necessary */}
    </div>
  </div>
);

export default RatesDisplay;
