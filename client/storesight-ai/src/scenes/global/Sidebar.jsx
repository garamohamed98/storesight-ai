import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import EngineeringIcon from "@mui/icons-material/Engineering";
import PeopleIcon from "@mui/icons-material/People";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import InventoryIcon from "@mui/icons-material/Inventory";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SettingsIcon from "@mui/icons-material/Settings";

const Item = ({ title, to, icon, selected, setSelected, isCollapsed }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [ishover, setHover] = useState(false);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color:colors.white[500],
        backgroundColor: ishover ? colors.black[400] : "transparent",
        margin: "10px",
        borderRadius: "5px",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      {!isCollapsed && <Typography>{title}</Typography>}
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.black[500]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent",
        },
        "& .pro-inner-item": {
          padding: "15px 0px 15px 12px !important",
        },
        "& .pro-inner-item:hover": {
          color: `${colors.green[500]} !important`,
        },
        "& .pro-menu-item-active": {
          color: `${colors.green[500]} !important`,
        },
        "& .pro-icon": {
          animation: "none !important",
          transform: "none !important", 
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu>
          {/* Logo And Menu */}
          <MenuItem
            onClick={() => setCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{ padding: "0px 10px 0px 10px", color: colors.white[500] }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box display="flex" justifyContent="center" alignItems="center">
                  <img
                    alt="storesight-ai-logo"
                    src={"../../assets/storesight-ai-logo.png"}
                  />
                </Box>
                <IconButton>
                  <MenuOutlinedIcon sx={{color: `${colors.white[500]} !important`}}/>
                </IconButton>
              </Box>
            )}
          </MenuItem>
          <hr style={{ opacity: "8%" }} />

          {/* Menu Items */}
          <Box>
            <Item
              title="Dashboard"
              to="/"
              icon={<DashboardIcon />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <Item
              title="Customer Profiles"
              to="/customer"
              icon={<PersonIcon />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <Item
              title="Selsperson Performance"
              to="/Selsperson"
              icon={<EngineeringIcon />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <Item
              title="Queues Monitoring"
              to="/queuesMonitoring"
              icon={<PeopleIcon />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <Item
              title="Interaction Monitoring"
              to="/interaction"
              icon={<QuestionAnswerIcon />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <Item
              title="Restocking & Inventory"
              to="/restocking"
              icon={<InventoryIcon />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <Item
              title="Reports & Insights"
              to="/reports"
              icon={<AssignmentIcon />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <Item
              title="Settings & Configuration"
              to="/settings"
              icon={<SettingsIcon />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
