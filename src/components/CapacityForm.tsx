import { Space, Button } from "@dnb/eufemia";
import { CapacityFormProps } from "../types/types";

const CapacityForm: React.FC<CapacityFormProps> = ({
  totalCapacity,
  handleCapacityChange,
  handleCapacitySubmit,
}) => (
  <form onSubmit={handleCapacitySubmit} className="ratesCapacityCard">
    <label className="column">
      Normal:
      <input
        type="number"
        name="Normal"
        value={totalCapacity.Normal}
        onChange={handleCapacityChange}
      />
    </label>
    <label className="column">
      Hc:
      <input
        type="number"
        name="Hc"
        value={totalCapacity.Hc}
        onChange={handleCapacityChange}
      />
    </label>
    <label className="column">
      Ev:
      <input
        type="number"
        name="Ev"
        value={totalCapacity.Ev}
        onChange={handleCapacityChange}
      />
    </label>
    <label className="column">
      Family:
      <input
        type="number"
        name="Family"
        value={totalCapacity.Family}
        onChange={handleCapacityChange}
      />
    </label>
    <Space top="1rem" />
    <Button type="submit">Save Capacity</Button>
  </form>
);

export default CapacityForm;
