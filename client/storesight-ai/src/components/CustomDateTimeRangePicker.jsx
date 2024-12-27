import { Box, Typography } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const CustomDateTimeRangePicker = ({value, onChange}) => {
  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker label="start" value={value.start} onChange={(newValue)=>onChange("start",newValue)}/>
        <Typography>-</Typography>
        <DateTimePicker  label="end" value={value.start} onChange={(newValue)=>onChange("end",newValue)}/>
      </LocalizationProvider>
    </Box>
  );
};

export default CustomDateTimeRangePicker;
