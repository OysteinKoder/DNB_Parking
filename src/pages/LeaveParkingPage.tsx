import { Anchor, Button, Input, P, Space } from "@dnb/eufemia";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function LeaveParkingPage() {
  const [parkedCar, setparkedCar] = useState(() => {
    const savedparkedCar = localStorage.getItem("parkedCar");
    return savedparkedCar ? JSON.parse(savedparkedCar) : [];
  });

  const [hourlyRates, setHourlyRates] = useState<HourlyRatesType>(() => {
    const storedRates = localStorage.getItem("hourlyRates");
    return storedRates
      ? JSON.parse(storedRates)
      : { firstHour: 30, secondHour: 15, followingHours: 5 };
  });

  const [parkingDuration, setParkingDuration] = useState(0);
  const [testTime, setTestTime] = useState(0);
  const [price, setPrice] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const duration = testTime !== 0 ? testTime : parkingDuration;
    let calculatedPrice = 0;
    const fullHours = Math.floor(duration);
    const partialHour = duration % 1;

    if (fullHours >= 1) {
      calculatedPrice += hourlyRates.firstHour;
    }
    if (fullHours >= 2) {
      calculatedPrice += hourlyRates.secondHour;
    }
    if (fullHours > 2) {
      calculatedPrice += (fullHours - 2) * hourlyRates.followingHours;
    }
    if (partialHour > 0) {
      if (fullHours === 0) {
        calculatedPrice += partialHour * hourlyRates.firstHour;
      } else if (fullHours === 1) {
        calculatedPrice += partialHour * hourlyRates.secondHour;
      } else {
        calculatedPrice += partialHour * hourlyRates.followingHours;
      }
    }
    setPrice(calculatedPrice);
  }, [parkingDuration, hourlyRates, testTime]);

  useEffect(() => {
    if (parkedCar[0]) {
      const currentTime = new Date().getTime();
      const entryTime = new Date(parkedCar[0].entryTime).getTime();
      const duration = currentTime - entryTime;
      // Convert the duration from milliseconds to hours
      setParkingDuration(Math.round(duration / 1000 / 60 / 60));
    }
  }, [parkedCar]);
  return (
    <div>
      <h1>Leave Parking Page</h1>
      <div className="checkoutCard">
        <P>Time : {testTime !== 0 ? testTime : parkingDuration} hours</P>
        <Space top="1rem" />
        <P>Price : {price} kr</P>
        <Space top="1rem" />
        <Button
          text="Checkout"
          on_click={() => {
            window.alert(
              "thank you for parking, the price is: " +
                price +
                " kr. " +
                "Now we could redirect to payment page"
            );
          }}
        />
        <Space top="1rem" />
        <Input
          type="number"
          placeholder="Test time"
          onChange={(e) => {
            setTestTime(Number(e.target.value));
          }}
        />
      </div>
    </div>
  );
}

export default LeaveParkingPage;
