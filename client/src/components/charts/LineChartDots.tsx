import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getSocket } from "@/socket";
import { useEffect, useState } from "react";
import { ChartData, RollData } from "@/types";

const initialChartData: ChartData[] = [];

const chartConfig: ChartConfig = {
  value: {
    label: "Dice Output",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export function LineChartDots() {
  const [chartData, setChartData] = useState<ChartData[]>(initialChartData);
  const socket = getSocket();

  useEffect(() => {
    if (socket) {
      const handleNewRoll = (data: RollData) => {
        console.log("Received data:", data);

        // Ensure the data is in the expected format
        if (
          data &&
          typeof data.sequence === "number" &&
          typeof data.output === "number"
        ) {
          // Map to chart data format
          setChartData((prevData) => [
            ...prevData,
            { sequence: data.sequence, value: data.output },
          ]);
        } else {
          console.error("Unexpected data format:", data);
        }
      };

      socket.on("NEW_ROLL_LINE", handleNewRoll);

      return () => {
        socket.off("NEW_ROLL_LINE", handleNewRoll);
      };
    }
  }, [socket]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dice Roll Outcomes Over Time</CardTitle>
        <CardDescription>
          Showing the outcomes of dice rolls in sequence
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="sequence"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `Roll ${value}`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
            <Area
              dataKey="value"
              type="linear"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Rolling with a consistent pattern{" "}
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Tracking the outcomes of dice rolls over the last 6 rolls
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
