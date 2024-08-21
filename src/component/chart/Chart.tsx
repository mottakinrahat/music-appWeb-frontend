"use client";

import { Area, AreaChart, CartesianGrid, XAxis, Dot } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

interface ChartInfc {
  data: Array<object>;
}

export function Chart({ data }: ChartInfc) {
  const chartConfig = {
    gain: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  const CustomDot = (props: any) => (
    <Dot {...props} r={4} fill="#00CCD0" stroke="#00CCD0" />
  );
  return (
    <Card className="border-0 shadow-none w-full">
      <CardContent className="border-0">
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid
              vertical={true}
              horizontal={false}
              horizontalFill={["#000000"]}
            />
            <XAxis
              dataKey="frequency"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 5)}
            />
            {/* <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            /> */}
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00CCD0" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#00CCD0" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <Area
              dataKey="gain"
              type="linear"
              fill="url(#fillDesktop)"
              fillOpacity={1}
              stroke="#00CCD0"
              dot={<CustomDot />}
            >
              {/* <LabelList
                dataKey="desktop"
                position="top"
                fill="#00CCD0"
                fontSize={12}
              /> */}
            </Area>
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
