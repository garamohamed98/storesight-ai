import { Box, Slider } from "@mui/material";

const RangeSlider = ({rangeSliderValues, handleChange, unit,min,max}) => {

  const valueText = (value) => `${value} ${unit}`;

  return (
    <Box display="flex">
      <Slider
        getAriaLabel={() => "slider"}
        value={rangeSliderValues}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valueText}
        valueLabelFormat={valueText}
        min={min}
        max={max}
      />
    </Box>
  );
};

export default RangeSlider;
