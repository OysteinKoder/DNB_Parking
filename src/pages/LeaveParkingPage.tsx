import "./leaveParkingPage/style.css";
import { Dialog, H2, P, Space } from "@dnb/eufemia";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function LeaveParkingPage() {
  const [parkingDuration, setParkingDuration] = useState("");
  const [price, setPrice] = useState(0);
  const parkedCar = JSON.parse(localStorage.getItem("parkedCar") || "[]");
  const hourlyRates = JSON.parse(localStorage.getItem("hourlyRates") || "{}");
  const dialogText = `time: ${parkingDuration} price: ${price} kr`;
  const navigate = useNavigate();

  const calculatePrice = () => {
    if (parkedCar[0]) {
      const currentTime = new Date().getTime();
      const entryTime = new Date(parkedCar[0].entryTime).getTime();
      let durationInSeconds = (currentTime - entryTime) / 1000;

      const hours = Math.floor((durationInSeconds % 86400) / 3600)
        .toString()
        .padStart(2, "0");
      const minutes = Math.floor((durationInSeconds % 3600) / 60)
        .toString()
        .padStart(2, "0");
      const seconds = Math.floor(durationInSeconds % 60)
        .toString()
        .padStart(2, "0");

      setParkingDuration(`${hours}:${minutes}:${seconds}`);

      let totalHours = Math.ceil(durationInSeconds / 3600);
      let totalPrice = 0;

      if (totalHours > 0) {
        totalPrice +=
          (hourlyRates.firstHour / 3600) * Math.min(3600, durationInSeconds);
        durationInSeconds -= Math.min(3600, durationInSeconds);
        totalHours--;
      }
      if (totalHours > 0) {
        totalPrice += (hourlyRates.afterFirstHour / 3600) * durationInSeconds;
      }
      setPrice(Math.ceil(totalPrice));
    }
  };

  // updates the price every minute
  useEffect(() => {
    calculatePrice();
    const timer = setInterval(() => {
      calculatePrice();
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <H2>Leave Parking Page</H2>
      <div className="checkoutCard">
        <P>Time: {parkingDuration}</P>
        <Space top="1rem" />
        <P>Price: {price} kr</P>
        <Space top="1rem" />
        <Dialog
          variant="confirmation"
          title="Checkout"
          description={dialogText}
          onConfirm={({ close }: { close: () => void }) => {
            close();
            localStorage.removeItem("parkedCar");
            navigate("/");
          }}
          triggerAttributes={{
            text: "Checkout",
          }}
        />
        <Space top="1rem" />
      </div>
    </div>
  );
}

export default LeaveParkingPage;
