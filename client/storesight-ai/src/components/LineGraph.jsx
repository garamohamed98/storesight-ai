import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineGraph = ({
  xData,
  yData,
  title,
  filters,
  xTitle,
  yTitle,
  flag,
  lowLimit,
  mediumLimit,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: xTitle,
          color: colors.secondary[500],
          font: {
            size: 14,
            weight: 400,
            family: theme.typography.fontFamily,
          },
          padding: {
            top: 10,
            bottom: 10,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: yTitle,
          color: colors.secondary[500],
          font: {
            size: 14,
            weight: 400,
            family: theme.typography.fontFamily,
          },
          padding: { bottom: 10 },
        },
      },
    },
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: false,
      },
    },
  };

  const getPoinColor = (value) => {
    if (value <= lowLimit) return colors.green[500];
    if (value > mediumLimit) return colors.red[500];
    return colors.yellow[500];
  };
  const data = yData;

  const lowData = data.map((value) => (value < lowLimit ? value : null));
  const mediumData = data.map((value) =>
    value >= lowLimit && value <= mediumLimit ? value : null
  );
  const highData = data.map((value) => (value > mediumLimit ? value : null));

  const chartData = {
    labels: xData,
    datasets: [
      {
        label: flag,
        data: data,
        borderColor: colors.blue[500],
        backgroundColor: colors.blue[500],
        pointRadius: 5,
        pointBackgroundColor: data.map((value) => getPoinColor(value)),
        showLine: true,
      },
      {
        label: "Low (Green)",
        data: lowData,
        borderColor: "transparent",
        backgroundColor: colors.green[500],
        pointRadius: 5,
        pointBackgroundColor: colors.green[500],
        showLine: false,
      },
      {
        label: "Medium (Yellow)",
        data: mediumData,
        borderColor: "transparent",
        backgroundColor: colors.yellow[500],
        pointRadius: 5,
        pointBackgroundColor: colors.yellow[500],
        showLine: false,
      },
      {
        label: "High (Red)",
        data: highData,
        borderColor: "transparent",
        backgroundColor: colors.red[500],
        pointRadius: 5,
        pointBackgroundColor: colors.red[500],
        showLine: false,
      },
    ],
  };
  return (
    <Box
      backgroundColor={colors.primary[500]}
      borderRadius="8px"
      boxShadow="0px 0px 5px rgba(0, 0, 0, 0.1)"
    >
      <Box
        p="40px 20px"
        display="flex"
        justifyContent="space-between"
        borderBottom={`1px solid ${colors.black[100]}`}
        alignItems="center"
      >
        <Typography variant="h2" fontWeight="700" color={colors.secondary[300]}>
          {title}
        </Typography>
        {filters}
      </Box>
      <Box p="20px">
      <Line options={options} data={chartData} />
      </Box>
      
    </Box>
  );
};

export default LineGraph;
