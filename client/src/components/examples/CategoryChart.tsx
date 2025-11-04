import CategoryChart from "../CategoryChart";

export default function CategoryChartExample() {
  const mockData = [
    { category: "Service Quality", rating: 4.6 },
    { category: "Response Time", rating: 4.2 },
    { category: "Problem Resolution", rating: 4.1 },
    { category: "Overall Experience", rating: 4.3 },
  ];

  return <CategoryChart data={mockData} />;
}
