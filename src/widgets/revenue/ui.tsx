import { useEffect, useState } from "react";
import { BillingApi } from "shared/api";
import { Card, CardHeader, DateToggle, Format, LineGraph } from "shared/ui";
import style from "./style.module.css";
import chartIcon from "assets/images/dashboard/ChartLine.svg";
import classNames from "classnames";
import carretLeft from "assets/images/dashboard/CaretLeft.svg";
import ScrollContainer from "react-indiana-drag-scroll";
import { usePageWidth } from "shared/hooks";
import {
  SECONDS_IN_A_YEAR,
  SECONDS_IN_A_MONTH,
  SECONDS_IN_A_WEEK,
  dates,
  formatDate,
} from "./helpers";

const today = new Date();
const oneYearAgo = new Date();
oneYearAgo.setFullYear(today.getFullYear() - 1);

const oneMonthAgo = new Date();
oneMonthAgo.setMonth(today.getMonth() - 1);

const oneWeekAgo = new Date();
oneWeekAgo.setDate(today.getDate() - 7);

export const RevenueStatsChart = () => {
  const width = usePageWidth();

  const [data, setData] = useState();
  const [date, setDate] = useState<Format>("year");
  const [firstDate, setFirstDate] = useState(
    Math.floor(oneYearAgo.getTime() / 1000)
  );
  const [lastDate, setLastDate] = useState(Math.floor(today.getTime() / 1000));

  const handleChangeDateFormat = (date: Format) => {
    if (date === "year") {
      setFirstDate(Math.floor(oneYearAgo.getTime() / 1000));
      setLastDate(Math.floor(today.getTime() / 1000));
    }
    if (date === "month") {
      setFirstDate(Math.floor(oneMonthAgo.getTime() / 1000));
      setLastDate(Math.floor(today.getTime() / 1000));
    }
    if (date === "week") {
      setFirstDate(Math.floor(oneWeekAgo.getTime() / 1000));
      setLastDate(Math.floor(today.getTime() / 1000));
    }
    setDate(date);
  };

  const handlePrev = () => {
    if (date === "year") {
      setFirstDate(firstDate - SECONDS_IN_A_YEAR);
      setLastDate(lastDate - SECONDS_IN_A_YEAR);
    }
    if (date === "month") {
      setFirstDate(firstDate - SECONDS_IN_A_MONTH);
      setLastDate(lastDate - SECONDS_IN_A_MONTH);
    }
    if (date === "week") {
      setFirstDate(firstDate - SECONDS_IN_A_WEEK);
      setLastDate(lastDate - SECONDS_IN_A_WEEK);
    }
  };

  const handleNext = () => {
    if (date === "year") {
      setFirstDate(firstDate + SECONDS_IN_A_YEAR);
      setLastDate(lastDate + SECONDS_IN_A_YEAR);
    }
    if (date === "month") {
      setFirstDate(firstDate + SECONDS_IN_A_MONTH);
      setLastDate(lastDate + SECONDS_IN_A_MONTH);
    }
    if (date === "week") {
      setFirstDate(firstDate + SECONDS_IN_A_WEEK);
      setLastDate(lastDate + SECONDS_IN_A_WEEK);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await BillingApi.getPayouts(firstDate, lastDate);
      setData(res.reverse());
    };

    fetchData();
  }, [date, firstDate, lastDate]);

  return (
    <div className={style.container}>
      <Card className={style.card}>
        <div className={style.header}>
          <CardHeader title="Revenue Stats" image={chartIcon} />
          <DateToggle
            currentDate={date}
            onToggle={handleChangeDateFormat}
            dates={dates}
            isSelect={width < 768}
          />
          <div className={style.header__date}>
            {formatDate(firstDate, date)} - {formatDate(lastDate, date)}
            <div className={style.carrets}>
              <button
                onClick={handlePrev}
                className={classNames(style.carret, style.left)}
              >
                <img src={carretLeft} alt="carret-left" />
              </button>
              <button
                onClick={handleNext}
                className={classNames(style.carret, style.right)}
              >
                <img src={carretLeft} alt="carret-right" />
              </button>
            </div>
          </div>
        </div>
        {data && (
          <ScrollContainer
            className={style.graph}
            hideScrollbars={false}
            vertical={false}
            nativeMobileScroll={true}
          >
            <LineGraph data={data} format={date} />
          </ScrollContainer>
        )}
      </Card>
    </div>
  );
};
