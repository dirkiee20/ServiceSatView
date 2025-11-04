import DistributionChart from "../DistributionChart";

export default function DistributionChartExample() {
  const mockData = [
    { name: "5 Stars", value: 45 },
    { name: "4 Stars", value: 30 },
    { name: "3 Stars", value: 15 },
    { name: "2 Stars", value: 7 },
    { name: "1 Star", value: 3 },
  ];

  return <DistributionChart data={mockData} />;
}
