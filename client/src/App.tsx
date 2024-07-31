import { useState } from "react";
import { BarChartMixed } from "./components/charts/BarChartMixed";
import { LineChartDots } from "./components/charts/LineChartDots";
import { Button } from "./components/ui/button";
import { SocketProvider } from "./socket";

const App = () => {
  const [isChart, setIsChart] = useState(false);

  return (
    <SocketProvider>
      <div className="flex p-12 justify-center items-center">
        <Button onClick={() => setIsChart(!isChart)}>Toggle Chart</Button>
      </div>
      <div className="flex gap-4 w-screen justify-center">
        {isChart && <BarChartMixed key="bar-chart" />}
        {isChart && <LineChartDots key="line-chart" />}
      </div>
    </SocketProvider>
  );
};

export default App;
