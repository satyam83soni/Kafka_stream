import { useMemo, useEffect, useState } from "react";
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
import { toASCII } from "punycode";

const initialChartData = [
  { result: "one", value: 4 },
  { result: "two", value: 3 },
  { result: "three", value: 6 },
  { result: "four", value: 3 },
  { result: "five", value: 2 },
  { result: "six", value: 2 },
];

const chartConfig = {
  one: {
    label: "One",
    color: "hsl(var(--chart-1))",
  },
  two: {
    label: "Two",
    color: "hsl(var(--chart-2))",
  },
  three: {
    label: "Three",
    color: "hsl(var(--chart-3))",
  },
  four: {
    label: "Four",
    color: "hsl(var(--chart-4))",
  },
  five: {
    label: "Five",
    color: "hsl(var(--chart-5))",
  },
  six: {
    label: "Six",
    color: "hsl(var(--chart-6))",
  },
} satisfies ChartConfig;

function transformSocketData(data) {
  const keys = ["one", "two", "three", "four", "five", "six"];
  return keys.map((key) => ({ result: key, value: data[key] }));
}

export function BarChartMixed() {
  const [chartData, setChartData] = useState(initialChartData);
  const [total, setTotal] = useState(0);

  const socket = useMemo(() => getSocket(), []);

  useEffect(() => {
    if (socket) {
      socket.on("DICE_STATS", (data) => {
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
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
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
