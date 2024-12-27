import { Box } from "@mui/material";
import Header from "../../components/Header";
import RealTimeQueueStatusLineGraphFilters from "../../Filters/RealTimeQueueStatusLineGraphFilters";
import {
  realTimeQueueStatus,
  realTimeQueueStatusData,
  realTimeQueueStatusToChartData,
  waitingTimeData,
  waitingTimeDataToChartData,
} from "../../data/mockData";
import LineGraph from "../../components/LineGraph";
import useRealTimeQueueStatusLineGraphFilters from "../../hooks/UseRealTimeQueueStatusLineGraphFilters";
import CustomDataGrid from "../../components/CustomDataGrid";
import ColoredLabel, { ColorKey } from "../../components/ColoredLabel";
import { useMemo } from "react";
import RealTimeQueueStatusTableFilters from "../../Filters/RealTimeQueueStatusTableFilters";
import useRealTimeQueueStatusTableFilters from "../../hooks/useRealTimeQueueStatusTableFilters";
import HorizontalBarGraph from "../../components/HorizontalBarGraph";

const RealTimeQueueStatusLabel = ({ status, text }) => {
  if (status === "Low Queue Length")
    return <ColoredLabel colorKey={ColorKey.GREEN} text={text} />;
  if (status === "Moderate Queue Length")
    return <ColoredLabel colorKey={ColorKey.YELLOW} text={text} />;
  if (status === "High Queue Length")
    return <ColoredLabel colorKey={ColorKey.RED} text={text} />;
  return <ColoredLabel text={text} />;
};

const QueuesMonitoring = () => {
  const {
    filterModel,
    onFilterModelChange,
    getMinRange,
    getMaxRange,
    handleFilterSearch,
    handleRangeSliderChange,
    rangeSliderValues,
    checkboxChecked,
    handleCheckBox1,
    handleCheckBox2,
    handleCheckBox3,
  } = useRealTimeQueueStatusTableFilters(realTimeQueueStatusData);

  console.log("the error: " + checkboxChecked);

  const {
    timeWindow,
    updateFrequency,
    dateRange,
    filteredData,
    handleTimeWindowChange,
    handleUpdateFrequency,
    handleDateRange,
  } = useRealTimeQueueStatusLineGraphFilters(realTimeQueueStatus);

  const {
    timeWindow: averageWaitingTimeTimeWindow,
    updateFrequency: averageWaitingTimeupdateFrequency,
    dateRange: averageWaitingTimedateRange,
    filteredData: averageWaitingTimeFilteredData,
    handleTimeWindowChange: averageWaitingTimehandleTimeWindowChange,
    handleUpdateFrequency: averageWaitingTimeHandleUpdateFrequency,
    handleDateRange: averageWaitingTimeHandleDateRange,
  } = useRealTimeQueueStatusLineGraphFilters(waitingTimeData);

  console.log(
    "is the data filtered?: " + realTimeQueueStatusToChartData(filteredData)
  );
  const rangeOnlyOperators = useMemo(() => {
    const operator = {
      label: "Between",
      value: "between",
      getApplyFilterFn: (filterItem) => {
        if (!Array.isArray(filterItem.value) || filterItem.value.length !== 2) {
          return null;
        }
        if (filterItem.value[0] == null || filterItem.value[1] == null) {
          return null;
        }
        return (value) => {
          console.log("what ?");

          return (
            value != null &&
            filterItem.value[0] <= value &&
            value <= filterItem.value[1]
          );
        };
      },
    };

    return [operator];
  }, []);

  const equalOnlyOperators = useMemo(() => {
    const operator = {
      label: "Equal",
      value: "equal",
      getApplyFilterFn: (filterItem) => {
        if (!Array.isArray(filterItem.value) || filterItem.value.length !== 3) {
          return null;
        }
        if (
          filterItem.value[0] == null ||
          filterItem.value[1] == null ||
          filterItem.value == null
        ) {
          return null;
        }
        return (value) => {
          return (
            value != null &&
            (filterItem.value[0] === value ||
              filterItem.value[1] === value ||
              filterItem.value[2] === value)
          );
        };
      },
    };

    return [operator];
  }, []);

  return (
    <Box
      m="20px"
      display="grid"
      gap="20px"
      gridTemplateColumns="repeat(12, 1fr)"
    >
      <Box gridColumn="span 12">
        <Header title="Queues Monitoring" />
      </Box>
      <Box gridColumn="span 12">
        <CustomDataGrid
          columns={[
            {
              field: "queueName",
              headerName: "Queue Name",
              flex: 1,
              filterable: true,
            },
            {
              field: "realTimeQueueLength",
              headerName: "Real Time Queue Length",
              type: "number",
              headerAlign: "left",
              align: "left",
              flex: 1,
              filterable: true,
              filterOperators: rangeOnlyOperators,
            },
            {
              field: "realTimeQueueStatus",
              headerName: "Real Time Queue Status",
              flex: 1,
              filterOperators: equalOnlyOperators,
              renderCell: ({ row: { realTimeQueueStatus } }) => {
                return (
                  <RealTimeQueueStatusLabel
                    status={realTimeQueueStatus}
                    text={realTimeQueueStatus}
                  />
                );
              },
            },
          ]}
          rows={realTimeQueueStatusData}
          title="Monitor Real-Time Queue Status"
          filters={
            <RealTimeQueueStatusTableFilters
              getMinRange={getMinRange}
              getMaxRange={getMaxRange}
              handleFilterSearch={handleFilterSearch}
              handleRangeSliderChange={handleRangeSliderChange}
              rangeSliderValues={rangeSliderValues}
              checkboxChecked={checkboxChecked}
              handleCheckBox1={handleCheckBox1}
              handleCheckBox2={handleCheckBox2}
              handleCheckBox3={handleCheckBox3}
            />
          }
          filterModel={filterModel}
          onFilterModelChange={onFilterModelChange}
        />
      </Box>
      <Box gridColumn="span 6">
        <LineGraph
          title="Real-Time Queue Status: Queues Length Over Timer"
          xData={realTimeQueueStatusToChartData(filteredData).labels}
          yData={realTimeQueueStatusToChartData(filteredData).data}
          xTitle="Time Period "
          yTitle="Queue Length"
          flag="Current Number Of Queues"
          lowLimit={4}
          mediumLimit={7}
          filters={
            <RealTimeQueueStatusLineGraphFilters
              timeWindow={timeWindow}
              updateFrequency={updateFrequency}
              dateRange={dateRange}
              handleTimeWindowChange={handleTimeWindowChange}
              handleUpdateFrequency={handleUpdateFrequency}
              handleDateRange={handleDateRange}
            />
          }
        />
      </Box>
      <Box gridColumn="span 6">
        <LineGraph
          title="Real-Time Average Waiting Time: Trends Over Time"
          xData={
            waitingTimeDataToChartData(averageWaitingTimeFilteredData).labels
          }
          yData={
            waitingTimeDataToChartData(averageWaitingTimeFilteredData).data
          }
          xTitle="Time Period "
          yTitle="Average Waiting Time (Minutes)"
          flag="Average waiting time per time period"
          lowLimit={4}
          mediumLimit={7}
          filters={
            <RealTimeQueueStatusLineGraphFilters
              timeWindow={averageWaitingTimeTimeWindow}
              updateFrequency={averageWaitingTimeupdateFrequency}
              dateRange={averageWaitingTimedateRange}
              handleTimeWindowChange={averageWaitingTimehandleTimeWindowChange}
              handleUpdateFrequency={averageWaitingTimeHandleUpdateFrequency}
              handleDateRange={averageWaitingTimeHandleDateRange}
            />
          }
        />
      </Box>
      <Box gridColumn="span 6">
        <HorizontalBarGraph />
      </Box>
    </Box>
  );
};

export default QueuesMonitoring;
