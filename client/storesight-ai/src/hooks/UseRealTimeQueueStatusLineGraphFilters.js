import dayjs from "dayjs";
import { useEffect, useState } from "react";

const useRealTimeQueueStatusLineGraphFilters = (data) => {
  const [timeWindow, setTimeWindow] = useState(1);
  const [updateFrequency, setUpdateFrequeuncy] = useState(1);
  const [dateRange, setDateRange] = useState({
    start: dayjs(),
    end: dayjs(),
  });
  const [filteredData, setFilteredData] = useState([]);

  const handleTimeWindowChange = (event) => {
    setTimeWindow(event.target.value);
    console.log("Time Window Change: " + event.target.value);
  };

  const handleUpdateFrequency = (event) => {
    setUpdateFrequeuncy(event.target.value);
    console.log("Frequency : " + event.target.value);
  };

  const handleDateRange = (id, newValue) => {
    setDateRange({
      ...dateRange,
      [id]: newValue,
    });
    console.log("Date Range : " + dateRange);
  };

  useEffect(() => {
    console.log("isn't working");
    console.log(data);

    const interval = setInterval(() => {
      var updatedData = data;
      console.log("it's working");

      console.log("Data before filtered : " + updatedData);

      updatedData = updatedData.filter(
        (entry) =>
          dayjs(entry.timestamp).isAfter(dateRange.start) &&
          dayjs(entry.timestamp).isBefore(dateRange.end)
      );

      console.log("data filtered by dateRange" + updatedData);

      const currentTime = dayjs();
      updatedData = updatedData.filter((entry) =>
        dayjs(entry.timestamp).isAfter(
          currentTime.subtract(timeWindow, "minute")
        )
      );

      setFilteredData(updatedData);
    }, updateFrequency * 1000);

    return () => clearInterval(interval);
  }, [timeWindow, updateFrequency, dateRange]);

  return {
    timeWindow,
    updateFrequency,
    dateRange,
    filteredData,
    handleTimeWindowChange,
    handleUpdateFrequency,
    handleDateRange,
  };
};

export default useRealTimeQueueStatusLineGraphFilters;
