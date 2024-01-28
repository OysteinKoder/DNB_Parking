import "./leaveParkingPage/style.css";
import { Button, H2, P, Space } from "@dnb/eufemia";
import { useEffect, useState } from "react";

function LeaveParkingPage() {
  //states
  const [parkingDuration, setParkingDuration] = useState("");
  const [price, setPrice] = useState(0);

  const parkedCar = JSON.parse(localStorage.getItem("parkedCar") || "[]");
  const hourlyRates = JSON.parse(localStorage.getItem("hourlyRates") || "{}");

  //reloads page every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      window.location.reload();
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // calculates the parking duration and price
  useEffect(() => {
    if (parkedCar[0]) {
      const currentTime = new Date().getTime();
      const entryTime = new Date(parkedCar[0].entryTime).getTime();
      let durationInSeconds = (currentTime - entryTime) / 1000;

      const days = Math.floor(durationInSeconds / 86400);
      const hours = Math.floor((durationInSeconds % 86400) / 3600);
      const minutes = Math.floor((durationInSeconds % 3600) / 60);
      const seconds = Math.floor(durationInSeconds % 60);

      setParkingDuration(`${days}:${hours}:${minutes}:${seconds}`);

      let totalHours = Math.ceil(durationInSeconds / 3600);
      let totalPrice = 0;

      if (totalHours > 0) {
        totalPrice +=
          (hourlyRates.firstHour / 3600) * Math.min(3600, durationInSeconds);
        durationInSeconds -= Math.min(3600, durationInSeconds);
        totalHours--;
      }

      if (totalHours > 0) {
        totalPrice +=
          (hourlyRates.secondHour / 3600) * Math.min(3600, durationInSeconds);
        durationInSeconds -= Math.min(3600, durationInSeconds);
        totalHours--;
      }

      totalPrice += totalHours * hourlyRates.followingHours;

      setPrice(parseFloat(totalPrice.toFixed(2)));
    }
  }, [parkedCar, hourlyRates]);

  return (
    <div>
      <H2>Leave Parking Page</H2>
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
