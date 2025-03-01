import React from "react";
import ReactECharts from "echarts-for-react";
import customSymbol from "assets/images/dashboard/dot.svg";
import { usePageWidth } from "shared/hooks";

export interface DataPoint {
  id: string;
  amount: number;
  currency: string;
  created: number;
  arrival_date: number;
}

export type Format = "year" | "month" | "week";

const aggregateData = (
  data: DataPoint[],
  format: "year" | "month" | "week"
) => {
  const groupedData: { [key: string]: number } = {};

  data.forEach((d) => {
    const date = new Date(d.created * 1000);
    let key: string;
    switch (format) {
      case "year":
        key = date.toLocaleString("en-US", { month: "short" });
        break;
      case "month":
        key = getWeekInMonth(date);
        break;
      case "week":
        key = date.toLocaleString("en-US", { weekday: "long" });
        break;
      default:
        key = date.toLocaleString("en-US", { month: "short", year: "numeric" });
        break;
    }

    if (!groupedData[key]) {
      groupedData[key] = 0;
    }

    groupedData[key] += d.amount;
  });

  return Object.keys(groupedData).map((key) => ({
    key,
    amount: parseFloat(groupedData[key].toFixed(2)),
  }));
};

const getWeekInMonth = (date: Date) => {
  const start = new Date(date.getFullYear(), date.getMonth(), 1);
  const diff = date.getTime() - start.getTime();
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  const week = Math.ceil(diff / oneWeek);
  return `Week ${week} of ${date.toLocaleString("en-US", { month: "short", year: "numeric" })}`;
};

const getGraphWidth = (width: number) => {
  if (width < 425) {
    return "600px";
  }
  if (width < 768) {
    return "800px";
  }
  if (width < 1440) {
    return "1470px";
  }
  if (width > 1920) {
    return "100%";
  }
};

export const LineGraph = ({
  data,
  format,
}: {
  data: DataPoint[];
  format: Format;
}) => {
  const width = usePageWidth();

  const aggregatedData = aggregateData(data, format);

  const option = {
    tooltip: {
      trigger: "axis",
      formatter: (params: any) => {
        const date = params[0].axisValue;
        return `${date}: ${params[0].data} GBP`;
      },
    },
    grid: {
      left: "0.2%",
      right: "0.2%",
      top: "3%",
      bottom: "3%",
      containLabel: true,
    },
    minorSplitLine: {
      show: true,
    },
    xAxis: {
      type: "category",
      data: aggregatedData.map((d) => d.key),
      axisLine: {
        lineStyle: {
          type: "dashed",
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: "#13273F",
        },
      },
    },
    yAxis: {
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: "#13273F",
        },
      },
      type: "value",
    },
    series: [
      {
        data: aggregatedData.map((d) => d.amount),
        type: "line",
        smooth: false,
        symbol: `image://${customSymbol}`,
        symbolSize: 15,
        symbolStyle: {
          filter: "drop-shadow(0px 0px 16px #38B6FF)",
        },
        lineType: "dashed",
        lineStyle: {
          color: "#38B6FF",
          width: 2,
        },
        areaStyle: {
          color: "rgb(56, 182, 255, 0.20)",
        },
      },
    ],
  };

  return (
    <ReactECharts
      option={option}
      style={{
        height: 456,
        width: getGraphWidth(width),
        padding: 0,
        margin: 0,
      }}
    />
  );
};
