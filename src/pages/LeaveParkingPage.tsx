import { Button, P, Space } from "@dnb/eufemia";
import { useEffect, useState } from "react";

function LeaveParkingPage() {
  const [parkingDuration, setParkingDuration] = useState("");
  const [price, setPrice] = useState(0);

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
      const durationInSeconds = (currentTime - entryTime) / 1000;

      const totalSeconds = durationInSeconds;
      let remainingSeconds = totalSeconds;

      const days = Math.floor(durationInSeconds / 86400);
      const hours = Math.floor((durationInSeconds % 86400) / 3600);
      const minutes = Math.floor((durationInSeconds % 3600) / 60);
      const seconds = Math.floor(durationInSeconds % 60);

      const formattedTime = `${days}:${hours}:${minutes}:${seconds}`;

      setParkingDuration(formattedTime);

      // Calculate price based on hourly rates and duration
      let totalHours = Math.ceil(durationInSeconds / 3600); // Round up to the nearest hour
      let totalPrice = 0;

      if (totalHours > 0) {
        totalPrice +=
          (hourlyRates.firstHour / 3600) * Math.min(3600, remainingSeconds); // Increment price gradually for the first hour
        remainingSeconds -= Math.min(3600, remainingSeconds);
        totalHours--;
      }

      if (totalHours > 0) {
        totalPrice +=
          (hourlyRates.secondHour / 3600) * Math.min(3600, remainingSeconds); // Increment price gradually for the second hour
        remainingSeconds -= Math.min(3600, remainingSeconds);
        totalHours--;
      }

      totalPrice += totalHours * hourlyRates.followingHours;

      // Round the price to two decimal places
      totalPrice = parseFloat(totalPrice.toFixed(2));

      setPrice(totalPrice);
    }
  }, [parkedCar, hourlyRates]);

  return (
    <div>
      <h1>Leave Parking Page</h1>
      <div className="checkoutCard">
        <P>Time : {parkingDuration}</P>
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
      </div>
    </div>
  );
}

export default LeaveParkingPage;
