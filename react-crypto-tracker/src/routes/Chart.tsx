import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexCharts from "react-apexcharts";

interface ChartProps {
  coinId: string;
}

interface IHistorycal {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

export default function Chart() {
  const { coinId } = useOutletContext<ChartProps>();
  const { isLoading, data } = useQuery<IHistorycal[]>({
    queryKey: ["coinId", coinId],
    queryFn: () => fetchCoinHistory(coinId),
    refetchInterval: 10000,
  });

  return (
    <>
      <div>
        {isLoading ? (
          "Loading..."
        ) : (
          // apexcharts 패키지를 사용할 일이 있으면 데모를 보는게 좋을지도 모르겠음.
          // 옵션이 너무 많다.
          <ApexCharts
            type="line"
            series={[
              {
                name: "price",
                data: data?.map((price) => price.close) as number[], // 오류가 나서 number로 강제화함
              },
            ]}
            options={{
              theme: {
                mode: "dark",
              },
              chart: {
                height: 300,
                width: 500,
                toolbar: {
                  show: false,
                },
                background: "transparent",
              },
              grid: {
                show: false,
              },
              xaxis: {
                axisTicks: { show: false }, // 이건 선택사항
                axisBorder: { show: false }, // 이건 선택사항
                labels: { show: false },
                categories: data?.map((price) =>
                  new Date(Number(price.time_close) * 1000).toISOString()
                ),
                type: "datetime",
              },
              yaxis: {
                show: false,
              },
              stroke: {
                curve: "smooth",
                width: 5,
              },
              fill: {
                type: "gradient",
                gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
              },
              colors: ["#0fbcf9"],
              tooltip: {
                y: {
                  formatter: (value) => `$${value.toFixed(2)}`,
                },
              },
            }}
          />
        )}
      </div>
    </>
  );
}
