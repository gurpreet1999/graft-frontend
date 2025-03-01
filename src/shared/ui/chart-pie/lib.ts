import {
  ComposeOption,
  LegendComponentOption,
  PieSeriesOption,
  TitleComponentOption,
  TooltipComponentOption,
} from "echarts";
import { CallbackDataParams } from "echarts/types/dist/shared";

import { Theme } from "shared/ui/Theme/ThemeContext";

type ECOption = ComposeOption<
  | PieSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | LegendComponentOption
>;

export const getOptions = ({
  theme,
  hospitalityNumber,
  constructionNumber,
  industrialNumber,
  width,
}: {
  theme: Theme;
  hospitalityNumber: number;
  constructionNumber: number;
  industrialNumber: number;
  width: number;
}) => {
  const options: ECOption = {
    padding: 0,
    title: {
      text: (
        hospitalityNumber +
        constructionNumber +
        industrialNumber
      ).toString(),
      left: "center",
      top: "center",
      textStyle: {
        color: theme === "light" ? "#1e3f5f" : "#ffffff",
        fontSize: width > 768 ? 56 : 32,
        fontWeight: "bold",
      },
    },
    tooltip: {
      trigger: "item",
      formatter: (params: CallbackDataParams | CallbackDataParams[]) => {
        if (Array.isArray(params)) {
          params = params[0];
        }
        return `
          <div style="color:${theme === "light" ? "#1e3f5f" : "#ffffff"}; font-size: 1rem; padding: 8px">
            <div style="font-weight: bold;">${params.seriesName || "Total"}</div>
            <div style="display: flex; align-items: center;">
              <div style="width: 10px; height: 10px; border-radius: 50%; background: ${params.color}; margin-right: 5px;"></div>
              ${params.name}: ${params.value}
            </div>
          </div>
        `;
      },
      backgroundColor: theme === "light" ? "#fff" : "#2d2d2d",
      borderColor: "#2d2d2d",
      textStyle: {
        color: "#ffffff",
      },
      ...(width < 768 && { position: ["20%", "0%"] }),
    },
    legend: {
      show: false,
    },
    series: [
      {
        name: "Total",
        type: "pie",
        radius: ["80%", "95%"],
        avoidLabelOverlap: false,
        startAngle: 270,
        color: "#0099ff",
        showEmptyCircle: true,
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: false,
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          {
            value: hospitalityNumber,
            name: "Hospitality",
            itemStyle: { color: "#38B6FF", borderRadius: "50%" },
          },
          {
            value: constructionNumber,
            name: "Construction",
            itemStyle: {
              color: "#F25219",
              borderRadius: "50%",
            },
          },
          {
            value: industrialNumber,
            name: "Industrial",
            itemStyle: {
              color: "#20A62E",
              borderRadius: "50%",
            },
          },
        ],
      },
    ],
  };

  return options;
};
