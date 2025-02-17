import { DatePickerProps } from "../../types/types";

const DatePicker = (props: DatePickerProps) => {
  if (props.mode === "range") {
    const {
      fromDate,
      toDate,
      onFromDateChange,
      onToDateChange,
      fromLabel = "From",
      toLabel = "To",
    } = props;
    return (
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 sm:space-x-4 p-4 bg-white rounded shadow">
        <div className="flex items-center">
          <label className="mr-2 font-medium text-gray-700">{fromLabel}:</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => onFromDateChange(e.target.value)}
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex items-center">
          <label className="mr-2 font-medium text-gray-700">{toLabel}:</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => onToDateChange(e.target.value)}
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>
    );
  } else {
    const { date, onDateChange, label = "Date" } = props;
    return (
      <div className="flex items-center p-4 bg-white rounded shadow">
        <label className="mr-2 font-medium text-gray-700">{label}:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => onDateChange(e.target.value)}
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
    );
  }
};

export default DatePicker;
