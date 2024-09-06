import { Box, Typography } from "@mui/material";

const Header = ({ title }) => {
  return (
    <Box p="20px" mb="20px">
      <Typography variant="h1" fontWeight="800">
        {title}
      </Typography>
    </Box>
  );
};

export default Header;
