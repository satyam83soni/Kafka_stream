type ChartConfig = {
  [key: string]: {
    label: string;
    color: string;
  };
};

type DiceStats = {
  one: number;
  two: number;
  three: number;
  four: number;
  five: number;
  six: number;
  total: number;
};

type ChartData = {
  sequence: number;
  value: number;
};

type RollData = {
  sequence: number;
  output: number;
};

export type { ChartConfig, DiceStats, ChartData, RollData };
