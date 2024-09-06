import {
  Box,
  Checkbox,
  FormControl,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import Header from "../../components/Header";
import CustomDataGrid from "../../components/CustomDataGrid";
import DropDownMenu from "../../components/DropDownMenu";
import { MenuItem } from "react-pro-sidebar";
import RangeSlider from "../../components/RangeSlider";
import ColoredLabel, { ColorKey } from "../../components/ColoredLabel";
import { useState } from "react";

const Filters = ({
  handleFilterSearch,
  handleRangeSliderChange,
  rangeSliderValues,
}) => {
  return (
    <DropDownMenu>
      <MenuItem onKeyDown={(e) => e.stopPropagation()}>
        <Typography marginBottom="5px">Queue Length Range</Typography>
        <RangeSlider
          rangeSliderValues={rangeSliderValues}
          handleChange={handleRangeSliderChange}
        />
      </MenuItem>
      <MenuItem onKeyDown={(e) => e.stopPropagation()}>
        <TextField
          id="search-queue"
          label="Search Queue"
          variant="outlined"
          onChange={handleFilterSearch}
        />
      </MenuItem>
      <MenuItem onKeyDown={(e) => e.stopPropagation()}>
        <Typography marginBottom="5px">Queue Status</Typography>
        <FormGroup>
          <FormControl>
            <Box display="flex">
              <Checkbox defaultChecked />
              <ColoredLabel colorKey={ColorKey.GREEN} text="Low Queue Length" />
            </Box>
          </FormControl>
          <FormControl>
            <Box display="flex">
              <Checkbox defaultChecked />
              <ColoredLabel
                colorKey={ColorKey.YELLOW}
                text="Moderate Queue Length"
              />
            </Box>
          </FormControl>
          <FormControl>
            <Box display="flex">
              <Checkbox defaultChecked />
              <ColoredLabel colorKey={ColorKey.RED} text="High Queue Length" />
            </Box>
          </FormControl>
        </FormGroup>
      </MenuItem>
    </DropDownMenu>
  );
};

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
  const [filterModel, setFilterModel] = useState({ items: [] });
  const [rangeSliderValues, setRangeSliderValues] = useState([0, 100]);

  const handleRangeSliderChange = (event, newValue) => {
    setRangeSliderValues(newValue);
    console.log(newValue);
  };

  const handleFilterSearch = (e) => {
    const textField = e.target.value;
    const existingFilterIndex = filterModel.items.findIndex(
      (item) => item.id === 1
    );

    console.log(textField);
    if (textField.trim() === "") {
      if (existingFilterIndex !== -1) {
        setFilterModel((prevFilterModel) => ({
          items: prevFilterModel.items.filter(
            (_, index) => index !== existingFilterIndex
          ),
        }));
      }
    } else {
      setFilterModel((prevFilterModel) => {
        const newItems = [...prevFilterModel.items];

        if (existingFilterIndex !== -1) {
          newItems[existingFilterIndex] = {
            ...newItems[existingFilterIndex],
            value: textField,
          };
        } else {
          newItems.push({
            id: 1,
            field: "queueName",
            operator: "contains",
            value: textField,
          });
        }

        return { items: newItems };
      });
    }
  };

  const handleClearFilter = () => {
    setFilterModel({ items: [] });
  };

  const columns = [
    { field: "queueName", headerName: "Queue Name", flex: 1 },
    {
      field: "realTimeQueueLength",
      headerName: "Real Time Queue Length",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "realTimeQueueStatus",
      headerName: "Real Time Queue Status",
      flex: 1,
      renderCell: ({ row: { realTimeQueueStatus } }) => {
        return (
          <RealTimeQueueStatusLabel
            status={realTimeQueueStatus}
            text={realTimeQueueStatus}
          />
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="Queues Monitoring" />
      <CustomDataGrid
        columns={columns}
        title="Monitor Real-Time Queue Status"
        filters={
          <Filters
            handleFilterSearch={handleFilterSearch}
            handleRangeSliderChange={handleRangeSliderChange}
            rangeSliderValues={rangeSliderValues}
          />
        }
        filterModel={filterModel}
      />
    </Box>
  );
};

export default QueuesMonitoring;
