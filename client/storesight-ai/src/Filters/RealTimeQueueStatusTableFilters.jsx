import {
  Box,
  Checkbox,
  FormControl,
  FormGroup,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import DropDownMenu from "../components/DropDownMenu";
// import { MenuItem } from "react-pro-sidebar";
import RangeSlider from "../components/RangeSlider";
import ColoredLabel, { ColorKey } from "../components/ColoredLabel";

const menuItemStyle = {
  display: "block",
  "&:hover": {
    backgroundColor: "transparent",
  },
};

const RealTimeQueueStatusTableFilters = ({
  getMinRange,
  getMaxRange,
  handleFilterSearch,
  handleRangeSliderChange,
  rangeSliderValues,
  checkboxChecked,
  handleCheckBox1,
  handleCheckBox2,
  handleCheckBox3
}) => {


  return (
    <DropDownMenu>
      <MenuItem
        onKeyDown={(e) => e.stopPropagation()}
        disableTouchRipple
        sx={menuItemStyle}
      >
        <Typography marginBottom="5px">Queue Length Range</Typography>
        <RangeSlider
          rangeSliderValues={rangeSliderValues}
          handleChange={handleRangeSliderChange}
          unit={"Persons"}
          min={getMinRange}
          max={getMaxRange}
        />
      </MenuItem>
      <MenuItem
        onKeyDown={(e) => e.stopPropagation()}
        disableTouchRipple
        sx={menuItemStyle}
      >
        <TextField
          id="search-queue"
          label="Search Queue"
          variant="outlined"
          onChange={handleFilterSearch}
        />
      </MenuItem>
      <MenuItem
        onKeyDown={(e) => e.stopPropagation()}
        disableTouchRipple
        sx={menuItemStyle}
      >
        <Typography marginBottom="5px">Queue Status</Typography>
        <FormGroup>
          <FormControl>
            <Box display="flex">
              <Checkbox
                checked={checkboxChecked[0]}
                onChange={handleCheckBox1}
              />
              <ColoredLabel colorKey={ColorKey.GREEN} text="Low Queue Length" />
            </Box>
          </FormControl>
          <FormControl>
            <Box display="flex">
              <Checkbox
                checked={checkboxChecked[1]}
                onChange={handleCheckBox2}
              />
              <ColoredLabel
                colorKey={ColorKey.YELLOW}
                text="Moderate Queue Length"
              />
            </Box>
          </FormControl>
          <FormControl>
            <Box display="flex">
              <Checkbox
                checked={checkboxChecked[2]}
                onChange={handleCheckBox3}
              />
              <ColoredLabel colorKey={ColorKey.RED} text="High Queue Length" />
            </Box>
          </FormControl>
        </FormGroup>
      </MenuItem>
    </DropDownMenu>
  );
};

export default RealTimeQueueStatusTableFilters;
