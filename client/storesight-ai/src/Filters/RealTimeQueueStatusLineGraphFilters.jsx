import { Box, InputLabel, Select, Typography, MenuItem } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import DropDownMenu from "../components/DropDownMenu";
import CustomDateTimeRangePicker from "../components/CustomDateTimeRangePicker";

const menuItemStyle = {
  display: "block",
  "&:hover": {
    backgroundColor: "transparent",
  },
};

const RealTimeQueueStatusLineGraphFilters = ({
  timeWindow,
  updateFrequency,
  dateRange,
  handleTimeWindowChange,
  handleUpdateFrequency,
  handleDateRange,
}) => {
  return (
    <DropDownMenu>
      <MenuItem
        onKeyDown={(e) => e.stopPropagation()}
        disableTouchRipple
        sx={menuItemStyle}
      >
        <Box sx={{ minWidth: 250 }}>
          <FormControl fullWidth>
            <InputLabel id="time-window-select">Time Window</InputLabel>
            <Select
              labelId="time-window-select"
              id="time-window-select"
              value={timeWindow}
              label="Last 1 Minute"
              onChange={handleTimeWindowChange}
            >
              <MenuItem value={1}>Last 1 Minute</MenuItem>
              <MenuItem value={5}>Last 5 Minutes</MenuItem>
              <MenuItem value={15}>Last 15 Minutes</MenuItem>
              <MenuItem value={60}>Last 1 Hour</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </MenuItem>
      <MenuItem
        onKeyDown={(e) => e.stopPropagation()}
        disableTouchRipple
        sx={menuItemStyle}
      >
        <Box sx={{ minWidth: 250 }}>
          <FormControl fullWidth>
            <InputLabel id="update-frequency-select">
              Update frequency
            </InputLabel>
            <Select
              labelId="update-frequency-select"
              id="update-frequency-select"
              value={updateFrequency}
              label="Every Second"
              onChange={handleUpdateFrequency}
            >
              <MenuItem value={1}>Every Second</MenuItem>
              <MenuItem value={60}>Every Minute</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </MenuItem>
      <MenuItem
        onKeyDown={(e) => e.stopPropagation()}
        disableTouchRipple
        sx={menuItemStyle}
      >
        <Typography marginBottom="5px">Date And Time Picker</Typography>
        <CustomDateTimeRangePicker value={dateRange} onChange={handleDateRange}/>
      </MenuItem>
    </DropDownMenu>
  );
};

export default RealTimeQueueStatusLineGraphFilters;
