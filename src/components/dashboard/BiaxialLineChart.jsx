import { LineChart } from "@mui/x-charts/LineChart";

export default function BiaxialLineChart({ series = [], xLabels = [] }) {
  return (
    <LineChart
      width={500}
      height={300}
      series={series}
      xAxis={[{ scaleType: "point", data: xLabels }]}
    />
  );
}
