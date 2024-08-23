"use client";

import { Area, AreaChart, CartesianGrid, XAxis, Dot, YAxis } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface ChartInfc {
  data: Array<object>;
}

export function Chart({ data }: ChartInfc) {
  const chartConfig = {
    frequency: {
      label: "frequency",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  const CustomDot = (props: any) => (
    <Dot {...props} r={4} fill="#00CCD0" stroke="#00CCD0" />
  );
  return (
    <Card className="border-0 p-0 -mx-10 shadow-none w-full">
      <CardContent className="border-0 p-0">
        <ChartContainer config={chartConfig}>
          <AreaChart data={data} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={true} horizontal={false} />

            <XAxis
              dataKey="frequency"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              domain={["60Hz", "15kHz"]} // Example with string values for domain
            />

            <YAxis
              domain={[-10, 10]}
              tickLine={false}
              axisLine={false}
              tick={false}
              tickMargin={0}
              className="p-0 m-0 w-0"
            />

            <defs>
              <linearGradient id="frequency" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00CCD0" stopOpacity={0.6} />
                <stop offset="50%" stopColor="#00CCD0" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#00CCD0" stopOpacity={0.01} />
              </linearGradient>
            </defs>

            <Area
              dataKey="gain"
              type="linear"
              fill="url(#frequency)"
              fillOpacity={1}
              stroke="#00CCD0"
              dot={<CustomDot />}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
