import { Space, Button, P } from "@dnb/eufemia";
import { RatesFormProps } from "../types/types";

const RatesForm: React.FC<RatesFormProps> = ({
  hourlyRates,
  handleRateChange,
  handleRateSubmit,
}) => (
  <form onSubmit={handleRateSubmit} className="ratesCapacityCard">
    <P>Change Rates</P>
    <label className="column">
      1 Hr:
      <input
        type="number"
        name="firstHour"
        value={hourlyRates.firstHour}
        onChange={handleRateChange}
      />
    </label>
    <div>
      <label className="column">
        2 Hr:
        <input
          type="number"
          name="secondHour"
          value={hourlyRates.secondHour}
          onChange={handleRateChange}
        />
      </label>
    </div>
    <label className="column">
      After 3rd hour
      <input
        type="number"
        name="followingHours"
        value={hourlyRates.followingHours}
        onChange={handleRateChange}
      />
    </label>
    <Space top="1rem" />
    <Button type="submit">Save Rates</Button>
  </form>
);

export default RatesForm;
