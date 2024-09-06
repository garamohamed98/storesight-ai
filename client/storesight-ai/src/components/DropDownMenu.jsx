import { Box, Button, Menu, useTheme } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useState } from "react";
import { tokens } from "../theme";

const DropDownMenu = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Button
        id="customized-filter-button"
        aria-controls={open ? "customized-filter-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        onClick={handleClick}
        startIcon={<FilterListIcon />}
      >
        Filter
      </Button>
      <Menu
        id="customized-filter-menu"
        
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        elevation={0}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: `${colors.primary[500]} !important`,
            padding: "10px 20px",
            boxShadow: "0px 0px 9px rgba(0, 0, 0, 0.2)",
          },
          "& ul": {
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          },
        }}
        
      >
        {children}
      </Menu>
    </Box>
  );
};
export default DropDownMenu;
