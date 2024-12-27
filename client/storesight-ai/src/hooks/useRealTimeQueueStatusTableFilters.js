import { useState } from "react";
import { clearFilter, changeFilter, addFilter } from "../utils/filterUtils";

const getLengthRange = (realTimeQueueStatusData) => {
  const { min, max } = realTimeQueueStatusData.reduce(
    (acc, current) => {
      const length = current.realTimeQueueLength;
      acc.min = Math.min(acc.min, length);
      acc.max = Math.max(acc.max, length);
      return acc;
    },
    { min: Infinity, max: -Infinity }
  );
  return { min, max };
};

const useRealTimeQueueStatusTableFilters = (realTimeQueueStatusData) => {
  const [filterModel, setFilterModel] = useState({ items: [] });
  const [rangeSliderValues, setRangeSliderValues] = useState([
    getLengthRange(realTimeQueueStatusData).min,
    getLengthRange(realTimeQueueStatusData).max,
  ]);
  const [checkboxChecked, setChecked] = useState([true, true, true]);
  const getMinRange = getLengthRange(realTimeQueueStatusData).min;
  const getMaxRange = getLengthRange(realTimeQueueStatusData).max;
  console.log("MaxRange : " + getMaxRange);

  const handleRangeSliderChange = (event, newValue) => {
    console.log("Range Slider Changed:", newValue);
    setRangeSliderValues(newValue);
    const existingFilterIndex = filterModel.items.findIndex(
      (item) => item.id === 2
    );
    console.log("ExistingFilterIndex : " + existingFilterIndex);

    if (
      newValue[0] === getLengthRange(realTimeQueueStatusData).min &&
      newValue[1] === getLengthRange(realTimeQueueStatusData).max
    ) {
      if (existingFilterIndex !== -1) {
        clearFilter(setFilterModel, existingFilterIndex);
      }
    } else {
      if (existingFilterIndex !== -1) {
        changeFilter(setFilterModel, existingFilterIndex, newValue);
      } else {
        addFilter(
          setFilterModel,
          2,
          "realTimeQueueLength",
          "between",
          newValue
        );
        console.log("we are adding filter ");
      }
    }
    console.log("Filter Model : " + filterModel.items[0]);
  };

  const handleFilterSearch = (e) => {
    const textField = e.target.value;
    const existingFilterIndex = filterModel.items.findIndex(
      (item) => item.id === 1
    );

    if (textField.trim() === "") {
      if (existingFilterIndex !== -1) {
        clearFilter(setFilterModel, existingFilterIndex);
      }
    } else {
      if (existingFilterIndex !== -1) {
        changeFilter(setFilterModel, existingFilterIndex, textField);
      } else {
        addFilter(setFilterModel, 1, "queueName", "contains", textField);
      }
    }
  };

  const handleCheckBoxfilter = (checked) => {
    const existingFilterIndex = filterModel.items.findIndex(
      (item) => item.id === 3
    );
    var filterText = ["", "", ""];
    if (checked[0]) filterText[0] = "Low Queue Length";
    if (checked[1]) filterText[1] = "Moderate Queue Length";
    if (checked[2]) filterText[2] = "High Queue Length";
    console.log(filterText);

    if (checked[0] && checked[1] && checked[2]) {
      if (existingFilterIndex !== -1) {
        console.log("clear filter");

        clearFilter(setFilterModel, existingFilterIndex);
      }
    } else {
      if (existingFilterIndex !== -1) {
        console.log("change filter");
        changeFilter(setFilterModel, existingFilterIndex, filterText);
      } else {
        console.log("create filter");
        addFilter(
          setFilterModel,
          3,
          "realTimeQueueStatus",
          "equal",
          filterText
        );
      }
    }
  };

  const handleCheckBox1 = (e) => {
    setChecked((value) => {
      handleCheckBoxfilter([e.target.checked, value[1], value[2]]);
      return [e.target.checked, value[1], value[2]];
    });
  };
  const handleCheckBox2 = (e) => {
    setChecked((value) => {
      handleCheckBoxfilter([value[0], e.target.checked, value[2]]);
      return [value[0], e.target.checked, value[2]];
    });
  };
  const handleCheckBox3 = (e) => {
    setChecked((value) => {
      handleCheckBoxfilter([value[0], value[1], e.target.checked]);
      return [value[0], value[1], e.target.checked];
    });
  };

  const onFilterModelChange = (newModel) => {
    console.log("New filter model:", newModel);
    setFilterModel(newModel);
  };

  return {
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
  };
};

export default useRealTimeQueueStatusTableFilters;
