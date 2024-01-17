import { Button, Input, P, Space } from "@dnb/eufemia";
import { useEffect, useState } from "react";

function LeaveParkingPage() {
  const [testTime, setTestTime] = useState(0);
  const [parkingDuration, setParkingDuration] = useState(0);
  const [parkedCar] = useState(() => {
    const savedparkedCar = localStorage.getItem("parkedCar");
    return savedparkedCar ? JSON.parse(savedparkedCar) : [];
  });

  const [hourlyRates] = useState(() => {
    const storedRates = localStorage.getItem("hourlyRates");
    return storedRates
      ? JSON.parse(storedRates)
      : { firstHour: 30, secondHour: 15, followingHours: 5 };
  });

  const [price, setPrice] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      window.location.reload();
    }, 5000); // 5000 milliseconds = 5 seconds

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (parkedCar[0]) {
      const currentTime = new Date().getTime();
      const entryTime = new Date(parkedCar[0].entryTime).getTime();
      const duration = (currentTime - entryTime) / 1000 / 60 / 60; // Convert the duration from milliseconds to hours

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
    }
  }, [parkedCar, hourlyRates]);
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
