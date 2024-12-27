import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

const BarChart = () => {
  const chartRef = useRef(null); // Create a ref to attach to the canvas element

  useEffect(() => {
    const data = [
      { year: 2010, count: 10 },
      { year: 2011, count: 20 },
      { year: 2012, count: 15 },
      { year: 2013, count: 25 },
      { year: 2014, count: 22 },
      { year: 2015, count: 30 },
      { year: 2016, count: 28 },
    ];

    const chart = new Chart(chartRef.current, {
      type: "bar",
      data: {
        labels: data.map((row) => row.year),
        datasets: [
          {
            label: "Acquisitions by Year",
            data: data.map((row) => row.count),
            backgroundColor: "rgba(75, 192, 192, 1)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        maintainAspectRatio: false, // Allow the chart to fill the container's dimensions
      },
    });

    return () => chart.destroy();
  }, []);

  // Wrap the canvas with a container div to control the size
  return (
    <div style={{ width: "500px", height: "300px" }}> {/* Set the desired dimensions here */}
      <canvas ref={chartRef} />
    </div>
  );
};

export default BarChart;
