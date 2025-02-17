import { useState } from "react";
import { usePortofoliosQuery } from "../hooks/usePortofoliosQuery";
import { useAssetsQuery } from "../hooks/useAssetsQuery";
import DonutChart from "../DonutChart/DonutChart";
import HistoricalChart from "../HistoricalChart/HistoricalChart";
import Sidebar from "../Sidebar/Sidebar";
import PositionsTableContainer from "../PositionTable.tsx/PositionTableContainer";

const Dashboard = () => {
  const [activeView, setActiveView] = useState("donut");

  const {
    data: portfolio,
    isLoading: portfolioLoading,
    error: portfolioError,
  } = usePortofoliosQuery({ asOf: "2023-01-01" });
  const {
    data: assets,
    isLoading: assetsLoading,
    error: assetsError,
  } = useAssetsQuery();

  if (portfolioLoading || assetsLoading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );

  if (portfolioError || assetsError)
    return (
      <div className="flex min-h-screen items-center justify-center text-red-600">
        <div className="text-xl font-semibold">
          Error: {portfolioError?.message || assetsError?.message}
        </div>
      </div>
    );

  return (
    <div className="min-h-screen flex">
      <Sidebar activeView={activeView} onSelectView={setActiveView} />
      <div className="flex flex-col flex-1 bg-gray-50">
        <main className="flex-1 p-6">
          {activeView === "donut" && portfolio && assets && (
            <DonutChart assets={assets} />
          )}
          {activeView === "positions" && portfolio && assets && (
            <PositionsTableContainer assets={assets} />
          )}
          {activeView === "historical" && portfolio && (
            <HistoricalChart portfolio={portfolio} />
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
