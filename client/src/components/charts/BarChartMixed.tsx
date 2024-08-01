import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

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
import { DiceStats } from "../../types";

const initialChartData = [
  { result: "one", value: 0 },
  { result: "two", value: 0 },
  { result: "three", value: 0 },
  { result: "four", value: 0 },
  { result: "five", value: 0 },
  { result: "six", value: 0 },
];

const colors = [
  "hsl(10, 70%, 50%)",
  "hsl(60, 70%, 50%)",
  "hsl(120, 70%, 50%)",
  "hsl(180, 70%, 50%)",
  "hsl(240, 70%, 50%)",
  "hsl(300, 70%, 50%)",
];

const chartConfig: ChartConfig = {
  one: {
    label: "One",
    color: colors[0],
  },
  two: {
    label: "Two",
    color: colors[1],
  },
  three: {
    label: "Three",
    color: colors[2],
  },
  four: {
    label: "Four",
    color: colors[3],
  },
  five: {
    label: "Five",
    color: colors[4],
  },
  six: {
    label: "Six",
    color: colors[5],
  },
} satisfies ChartConfig;

console.log(chartConfig);

function transformSocketData(data: DiceStats) {
  const keys = ["one", "two", "three", "four", "five", "six"];
  return keys.map((key) => ({
    result: key,
    value: data[key as keyof DiceStats],
  }));
}

export function BarChartMixed() {
  const [chartData, setChartData] = useState(initialChartData);
  const [total, setTotal] = useState(0);

  const socket = getSocket();

  useEffect(() => {
    if (socket) {
      socket.on("DICE_STATS", (data: DiceStats) => {
        console.log("Received data:", data);
        setChartData(transformSocketData(data));
        setTotal(data.total);
      });
    }
    return () => {
      socket?.off("DICE_STATS");
    };
  }, [socket]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dice Frequency Distribution Chart</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="result"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              // tickFormatter={(value) =>
              //   chartConfig[value as keyof typeof chartConfig]?.label || ""
              // }
            />
            <XAxis dataKey="value" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="value" layout="vertical" radius={5} fill="#8884d8" />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Showing total results for {total} dice rolls{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total results for {total} dice rolls
        </div>
      </CardFooter>
    </Card>
  );
}
