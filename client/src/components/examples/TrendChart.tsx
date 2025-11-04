import TrendChart from "../TrendChart";

export default function TrendChartExample() {
  const mockData = [
    { date: "Jan 1", rating: 3.8 },
    { date: "Jan 5", rating: 4.0 },
    { date: "Jan 10", rating: 4.2 },
    { date: "Jan 15", rating: 4.1 },
    { date: "Jan 20", rating: 4.3 },
    { date: "Jan 25", rating: 4.5 },
    { date: "Jan 30", rating: 4.3 },
  ];

  return <TrendChart data={mockData} />;
}
