import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";

const CustomDataGrid = ({
  title,
  columns,
  rows,
  filters,
  filterModel,
  onFilterModelChange,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      backgroundColor={colors.primary[500]}
      borderRadius="8px"
      boxShadow="0px 0px 5px rgba(0, 0, 0, 0.1)"
    >
      <Box p="40px 20px" display="flex" justifyContent="space-between">
        <Typography variant="h2" fontWeight="700" color={colors.secondary[300]}>
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
          rows={rows}
          columns={columns}
          getRowId={(row) => row.queueName}
          filterModel={filterModel}
          disableColumnMenu={true}
          onFilterModelChange={onFilterModelChange}
        />
      </Box>
    </Box>
  );
};

export default CustomDataGrid;
