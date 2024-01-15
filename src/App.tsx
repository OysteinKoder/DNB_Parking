import "./App.css";
import { H1, Space } from "@dnb/eufemia";
import Floor from "./components/floor";
import parkData from "./data/parkingData.json";

function App() {
  return (
    <>
      <H1>DNB Park</H1>
      <Space bottom="large" />
      <div className="pageContainer">
        <Floor parkData={parkData} />
      </div>
    </>
  );
}

export default App;
