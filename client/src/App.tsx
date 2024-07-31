import { useState } from "react";
import { BarChartMixed } from "./components/charts/BarChartMixed";
import { LineChartDots } from "./components/charts/LineChartDots";
import { Button } from "./components/ui/button";
import { SocketProvider } from "./socket";
import { handleSubmit , handleStop , handleClear } from "./lib/utils";

const App = () => {
  const [isChart, setIsChart] = useState(false);
  const [times, setTimes] = useState("");



  return (
    <SocketProvider>
      <div className="flex p-12 justify-around items-center">
        <div className="flex flex-col" >
        <Button className="px-2 py-1 rounded-lg mb-4" onClick={() => setIsChart(!isChart)}>Toggle Chart</Button>
        <Button onClick={() => {handleClear()}}>Clear</Button>
        </div>
        <div className="flex flex-col">
          <input
            type="number"
            id="numberInput"
            name="numberInput"
            value={times}
            onChange={(e) => setTimes(e.target.value)}
            required
            className="border border-black px-2 py-1 rounded-lg mb-4 "
          />
          <Button
            className="px-2 py-1 rounded-lg mb-4"
            onClick={() => {
              handleSubmit(Number(times));
              setTimes("");
            }}
          >
            Stream Numbers
          </Button>
          <Button onClick={() => {handleStop()}}>Stop</Button>
        </div>
      </div>
      <div className="flex gap-4 w-screen justify-center">
        {isChart && <BarChartMixed key="bar-chart" />}
        {isChart && <LineChartDots key="line-chart" />}
      </div>
    </SocketProvider>
  );
};

export default App;
