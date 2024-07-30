import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import { BarChartMixed } from "./components/charts/BarChartMixed";
import { LineChartDots } from "./components/charts/LineChartDots";

const App = () => {
  const [isChart, setIsChart] = useState(false);
  const [role, setRole] = useState(0);

  return (
    <>
      <div className="flex p-12 justify-center items-center">
        <Button onClick={() => setIsChart(!isChart)}>
          Toggle Chart {role}
        </Button>
      </div>

      <div className="flex gap-4 w-screen justify-center">
        {isChart && <BarChartMixed />}
        {isChart && <LineChartDots />}
      </div>
    </>
  );
};

export default App;
