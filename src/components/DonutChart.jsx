import { PieChart } from "@mui/x-charts/PieChart";
import { Box, Typography } from "@mui/material";
import NoGraphDataImage from "../assets/graph-no-data.png";

const size = {
  height: 150,
};

const defaultChartData = [
  { id: 1, label: "Connected", value: 2, color: "#03a9f4" },
  { id: 2, label: "Not Connected", value: 2, color: "#e3f2fd" },
];

const NoChartData = () => {
  return (
    <Box
      height={size.height}
      sx={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <img
        src={NoGraphDataImage}
        alt="No Graph data"
        width="70"
        style={{ filter: "grayscale(1)" }}
        loading="lazy"
      />
      <Typography
        variant="subtitle2"
        sx={{ color: "grey" }}>
        No Graph data available!
      </Typography>
    </Box>
  );
};

export default function DonutChart({ data = defaultChartData }) {
  const totalDataValue = data.reduce((accu, currentValue) => {
    return accu + currentValue.value;
  }, 0);

  const chartData = data.map((item) => {
    return { ...item, label: `${item.label} (${item.value})` };
  });

  return (
    <>
      {chartData.length === 0 ? (
        <NoChartData />
      ) : (
        <Box
          height={170}
          sx={{ position: "relative" }}>
          <PieChart
            series={[
              {
                data: chartData,
                innerRadius: 50,
                outerRadius: 70,
                cx: 70,
              },
            ]}
            sx={{ justifyContent: "space-between" }}></PieChart>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              left: 55,
              textAlign: "center",
            }}>
            <strong>{totalDataValue}</strong>
            <p>Total</p>
          </Box>
        </Box>
      )}
    </>
  );
}
