import { useTheme } from "shared/ui/Theme/useThemes";
import style from "./ChartPie.module.css";
import ReactECharts from "echarts-for-react";
import { getOptions } from "./lib";
import { usePageWidth } from "shared/hooks";

interface IChartPie {
  hospitalityNumber: number;
  constructionNumber: number;
  industrialNumber: number;
  detailsOnClick?: (sector: string) => void;
}

export const ChartPie = ({
  hospitalityNumber,
  constructionNumber,
  industrialNumber,
  detailsOnClick,
}: IChartPie) => {
  const { theme } = useTheme();

  const width = usePageWidth();

  const full = constructionNumber + hospitalityNumber + industrialNumber;

  const constructionPercentage = (constructionNumber / full) * 100;
  const hospitalityPercentage = (hospitalityNumber / full) * 100;
  const industrialPercentage = (industrialNumber / full) * 100;

  const options = getOptions({
    theme,
    hospitalityNumber,
    constructionNumber,
    industrialNumber,
    width,
  });

  return (
    <div className={style.container}>
      <ReactECharts option={options} className={style.chart} />
      <div className={style.legends}>
        <div className={style.legend}>
          <div className={style.legend__count}>{hospitalityNumber}</div>
          <div className={style.legend__text}>
            <span>Hospitality</span>{" "}
            {detailsOnClick && width > 1077 && (
              <button
                onClick={() => {
                  detailsOnClick("Hospitality");
                }}
              >
                Details
              </button>
            )}
          </div>
          <div
            className={style.legend__bar}
            style={{
              width: `${hospitalityPercentage}%`,
              backgroundColor: "#38B6FF",
            }}
          ></div>
          {detailsOnClick && width <= 1077 && (
            <button
              onClick={() => {
                detailsOnClick("Hospitality");
              }}
            >
              Details
            </button>
          )}
        </div>
        <div className={style.legend}>
          <div className={style.legend__count}>{constructionNumber}</div>
          <div className={style.legend__text}>
            <span>Construction</span>
            {detailsOnClick && width > 1077 && (
              <button
                onClick={() => {
                  detailsOnClick("Construction");
                }}
              >
                Details
              </button>
            )}
          </div>
          <div
            className={style.legend__bar}
            style={{
              width: `${constructionPercentage}%`,
              height: "10px",
              backgroundColor: "#F25219",
            }}
          ></div>
          {detailsOnClick && width <= 1077 && (
            <button
              onClick={() => {
                detailsOnClick("Construction");
              }}
            >
              Details
            </button>
          )}
        </div>
        <div className={style.legend}>
          <div className={style.legend__count}>{industrialNumber}</div>
          <div className={style.legend__text}>
            <span>Industrial & Driving</span>{" "}
            {detailsOnClick && width > 1077 && (
              <button
                onClick={() => {
                  detailsOnClick("Industrial & Driving");
                }}
              >
                Details
              </button>
            )}
          </div>
          <div
            className={style.legend__bar}
            style={{
              width: `${industrialPercentage}%`,
              backgroundColor: "#20A62E",
            }}
          ></div>
          {detailsOnClick && width <= 1077 && (
            <button
              onClick={() => {
                detailsOnClick("Industrial & Driving");
              }}
            >
              Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
