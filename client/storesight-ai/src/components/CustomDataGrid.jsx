import {
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { useState } from "react";
import { realTimeQueueStatusData } from "../data/mockData";

const CustomDataGrid = ({ title, columns, filters, filterModel }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      backgroundColor={colors.primary[500]}
      borderRadius="8px"
      boxShadow="0px 0px 5px rgba(0, 0, 0, 0.1)"
    >
      <Box p="20px" display="flex" justifyContent="space-between">
        <Typography variant="h2" fontWeight="700">
          {title}
        </Typography>
        {filters}
      </Box>
      <Box
        height="60vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            fontWeight: "500",
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: colors.primary[600],
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "700",
          },
        }}
      >
        <DataGrid
          rows={realTimeQueueStatusData}
          columns={columns}
          getRowId={(row) => row.queueName}
          filterModel={filterModel}
          disableColumnMenu={true}
        />
      </Box>
    </Box>
  );
};

export default CustomDataGrid;
