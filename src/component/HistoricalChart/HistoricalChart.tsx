import { useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Portfolio } from "../../types/types";
import { useHistoricalPricesQuery } from "../hooks/useHistoricalPortfolioQuery";
import DatePicker from "../DataPicker/DataPicker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface HistoricalChartProps {
  portfolio: Portfolio | undefined;
}

const HistoricalChart = ({ portfolio }: HistoricalChartProps) => {
  if (!portfolio) return <div>No portfolio available</div>;

  const defaultFrom = portfolio.asOf.split("T")[0];
  const [fromDate, setFromDate] = useState(defaultFrom);
  const [toDate, setToDate] = useState("2023-01-31");

  const assetCodes = useMemo(() => {
    return Array.from(new Set(portfolio.positions.map((pos) => pos.asset)));
  }, [portfolio]);

  const { data, isLoading, error } = useHistoricalPricesQuery({
    assets: assetCodes,
    from: `${fromDate}T00:00:00Z`,
    to: `${toDate}T00:00:00Z`,
  });

  const chartData = useMemo(() => {
    if (!data) return null;

    const grouped: Record<string, { [asset: string]: number }> = {};
    data.forEach((entry) => {
      const day = new Date(entry.timestamp).toISOString().split("T")[0];
      if (!grouped[day]) {
        grouped[day] = {};
      }
      grouped[day][entry.asset] = entry.price;
    });

    const validDates = Object.keys(grouped).filter(
      (day) => day >= fromDate && day <= toDate
    );

    const sortedDates = validDates.sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );

    const totalValues = sortedDates.map((day) =>
      portfolio.positions.reduce((sum, pos) => {
        const assetPrice = grouped[day][pos.asset];
        return sum + (assetPrice ? pos.quantity * assetPrice : 0);
      }, 0)
    );

    return {
      labels: sortedDates,
      datasets: [
        {
          label: "Portfolio Total Value (USD)",
          data: totalValues,
          fill: false,
          borderColor: "#4CAF50",
          backgroundColor: "#4CAF50",
          tension: 0.1,
        },
      ],
    };
  }, [data, portfolio, fromDate, toDate]);

  if (isLoading) return <div>Loading historical prices...</div>;
  if (error)
    return (
      <div>Error loading historical prices: {(error as Error).message}</div>
    );
  if (!chartData) return <div>No historical data available.</div>;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Historical Portfolio Performance" },
    },
  };

  return (
    <div>
      <DatePicker
        mode="range"
        fromDate={fromDate}
        toDate={toDate}
        onFromDateChange={setFromDate}
        onToDateChange={setToDate}
      />

      <div style={{ height: "400px" }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default HistoricalChart;
