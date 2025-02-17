import React, { useState } from "react";
import { usePortofoliosQuery } from "../hooks/usePortofoliosQuery";
import { Asset } from "../../types/types";
import DatePicker from "../DataPicker/DataPicker";
import PositionsTable from "./PositionTable";

type Mode = "single" | "range";

const PositionsTableContainer: React.FC<{ assets: Asset[] | undefined }> = ({
  assets,
}) => {
  const [mode, setMode] = useState<Mode>("single");

  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);

  const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState(today);

  const params =
    mode === "single" ? { asOf: selectedDate } : { from: fromDate, to: toDate };

  const { data: portfolio, isLoading, error } = usePortofoliosQuery(params);

  const positions = portfolio?.positions || [];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-4 flex items-center justify-center gap-8">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name="mode"
            value="single"
            checked={mode === "single"}
            onChange={() => setMode("single")}
            className="form-radio h-5 w-5 text-blue-500"
          />
          <span className="text-gray-700">Single Day</span>
        </label>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name="mode"
            value="range"
            checked={mode === "range"}
            onChange={() => setMode("range")}
            className="form-radio h-5 w-5 text-blue-500"
          />
          <span className="text-gray-700">Date Range</span>
        </label>
      </div>

      <div className="mb-4">
        {mode === "single" ? (
          <DatePicker
            mode="single"
            date={selectedDate}
            onDateChange={setSelectedDate}
            label="Select Date"
          />
        ) : (
          <DatePicker
            mode="range"
            fromDate={fromDate}
            toDate={toDate}
            onFromDateChange={setFromDate}
            onToDateChange={setToDate}
          />
        )}
      </div>

      {isLoading && <div className="text-center">Loading positions...</div>}
      {error && (
        <div className="text-center text-red-600">
          Error: {(error as Error).message}
        </div>
      )}
      {portfolio && <PositionsTable positions={positions} assets={assets} />}
    </div>
  );
};

export default PositionsTableContainer;
