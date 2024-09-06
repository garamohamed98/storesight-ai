import { Box, Slider } from "@mui/material";
import { useState } from "react";

const RangeSlider = ({rangeSliderValues, handleChange}) => {
  const [value, setValue] = useState([20, 37]);

  const valueText = (value) => `${value} C`;

  return (
    <Box display="flex">
      <Slider
        getAriaLabel={() => "slider"}
        value={rangeSliderValues}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valueText}
        min={0}
        max={100}
      />
    </Box>
  );
};

export default RangeSlider;
