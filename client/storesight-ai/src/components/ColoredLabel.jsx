import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

export const ColorKey = {
  GREEN: "green",
  YELLOW: "yellow",
  RED: "red",
};

const ColoredLabel = ({ colorKey, text }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const getColors = (key) => {
    switch (key) {
      case ColorKey.GREEN:
        return [colors.green[200], colors.green[600]];
      case ColorKey.YELLOW:
        return [colors.yellow[200], colors.yellow[600]];
      case ColorKey.RED:
        return [colors.red[200], colors.red[600]];
      default:
        return ["none", "none"];
    }
  };

  return (
    <Box
      padding="5px 15px"
      backgroundColor={getColors(colorKey)[0]}
      width="max-content"
      borderRadius="20px"
      m="8px 0"
      color={getColors(colorKey)[1]}
    >
      <Typography>{text}</Typography>
    </Box>
  );
};

export default ColoredLabel;
