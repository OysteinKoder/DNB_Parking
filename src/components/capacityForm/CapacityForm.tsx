import { Space, Button } from "@dnb/eufemia";
import { CapacityFormProps } from "../../types/types";

import "./style.css";
import { useParkingStore } from "../../state/store";

type CapacityFormProps = {
  totalCapacity: Capacity;
  handleCapacityChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCapacitySubmit: () => void;
};

const CapacityForm: React.FC<CapacityFormProps> = ({
  totalCapacity,
  handleCapacityChange,
}) => {
  const setTotalCapacity = useParkingStore((state) => state.setTotalCapacity);

  const changeStoreCapacity = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const normalCapacity = form.elements.namedItem(
      "Normal"
    ) as HTMLInputElement;
    const hcCapacity = form.elements.namedItem("Hc") as HTMLInputElement;
    const evCapacity = form.elements.namedItem("Ev") as HTMLInputElement;

    setTotalCapacity({
      Normal: normalCapacity.value,
      Hc: hcCapacity.value,
      Ev: evCapacity.value,
    });
  };

  return (
    <form onSubmit={changeStoreCapacity} className="ratesCapacityCard">
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
};

export default CapacityForm;
