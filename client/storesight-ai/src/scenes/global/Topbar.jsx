import { useTheme } from "@emotion/react";
import { ColorModeContext, tokens } from "../../theme";
import { useContext } from "react";
import { Box, IconButton } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box display="flex" justifyContent="end" sx={{boxShadow: "0px 0px 9px rgba(0, 0, 0, 0.2)", p: "1rem 2rem 1rem 2rem !important"}} backgroundColor={colors.primary[500]}>
      {/* IconButtons */}
      <Box display="flex" >
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark"?<DarkModeOutlinedIcon sx={{color:colors.secondary[500]}}/> :<LightModeOutlinedIcon sx={{color:colors.secondary[500]}}/>}
        </IconButton>
        <IconButton>
          <NotificationsIcon sx={{color:colors.secondary[500]}}/>
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
