import { Space, Button, P } from "@dnb/eufemia";
import { RatesFormProps } from "../types/types";
import { useParkingStore } from "../state/store";

const RatesForm: React.FC<RatesFormProps> = () => {
  const setHourlyRates = useParkingStore((state) => state.setHourlyRates);
  const hourlyRates = useParkingStore((state) => state.hourlyRates);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHourlyRates(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const firstHour = Number(event.target.elements.firstHour.value);
    const secondHour = Number(event.target.elements.secondHour.value);
    const followingHours = Number(event.target.elements.followingHours.value);

    console.log(hourlyRates);
    setHourlyRates({ firstHour, secondHour, followingHours });
  };
  return (
    <form className="ratesCapacityCard" onSubmit={handleSubmit}>
      <P>Change Rates</P>
      <label className="column">
        1 Hr:
        <input
          type="number"
          name="firstHour"
          value={hourlyRates.firstHour}
          onChange={handleInputChange}
        />
      </label>
      <div>
        <label className="column">
          2 Hr:
          <input
            type="number"
            name="secondHour"
            value={hourlyRates.secondHour}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <label className="column">
        After 3rd hour
        <input
          type="number"
          name="followingHours"
          value={hourlyRates.followingHours}
          onChange={handleInputChange}
        />
      </label>
      <Space top="1rem" />
      <Button type="submit">Save Rates</Button>
    </form>
  );
};

export default RatesForm;
