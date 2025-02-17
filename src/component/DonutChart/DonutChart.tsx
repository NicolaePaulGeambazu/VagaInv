import { useState, useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import "../../chartSetup";
import { Asset, Portfolio } from "../../types/types";
import { usePortofoliosQuery } from "../hooks/usePortofoliosQuery";
import DatePicker from "../DataPicker/DataPicker";

type GroupMode = "byAsset" | "byType";

interface DonutChartProps {
  assets: Asset[] | undefined;
}

const DonutChart = ({ assets }: DonutChartProps) => {
  const [groupMode, setGroupMode] = useState<GroupMode>("byAsset");
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);

  const {
    data: portfolio,
    isLoading,
    error,
  } = usePortofoliosQuery({
    asOf: selectedDate,
  });

  const getAssetType = (assetName: string): string =>
    assets?.find((a) => a.name === assetName)?.type || "unknown";

  const groupedData = useMemo(() => {
    const groups: Record<string, number> = {};
    const currentPortfolio: Portfolio | undefined = Array.isArray(portfolio)
      ? portfolio[0]
      : portfolio;

    if (!currentPortfolio?.positions?.length) {
      return groups;
    }

    currentPortfolio.positions.forEach((pos: any) => {
      const key = groupMode === "byAsset" ? pos.asset : getAssetType(pos.asset);
      groups[key] = (groups[key] || 0) + pos.quantity;
    });

    return groups;
  }, [portfolio, groupMode, assets]);

  const labels = Object.keys(groupedData);
  const dataPoints = Object.values(groupedData);

  const chartData = {
    labels,
    datasets: [
      {
        data: dataPoints,
        backgroundColor: [
          "#36A2EB",
          "#FF6384",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FFA500",
          "#A0522D",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" as const },
    },
  };

  if (isLoading) return <div>Loading portfolio data...</div>;
  if (error)
    return <div>Error loading portfolio data: {(error as Error).message}</div>;

  return (
    <div className="p-6 max-w-md mx-auto space-y-6 bg-gray-50 rounded-lg shadow-lg">
      <div>
        <DatePicker
          mode="single"
          date={selectedDate}
          onDateChange={setSelectedDate}
          label="Select Date"
        />
      </div>
      <div className="p-4 bg-white rounded-md shadow-md">
        <Doughnut data={chartData} options={chartOptions} />
      </div>
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => setGroupMode("byAsset")}
          className={`px-4 py-2 rounded-md border border-blue-500 font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
            groupMode === "byAsset"
              ? "bg-blue-500 text-white"
              : "text-blue-500 hover:bg-blue-500 hover:text-white"
          }`}
        >
          By Asset
        </button>
        <button
          onClick={() => setGroupMode("byType")}
          className={`px-4 py-2 rounded-md border border-blue-500 font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
            groupMode === "byType"
              ? "bg-blue-500 text-white"
              : "text-blue-500 hover:bg-blue-500 hover:text-white"
          }`}
        >
          By Type
        </button>
      </div>
    </div>
  );
};

export default DonutChart;
