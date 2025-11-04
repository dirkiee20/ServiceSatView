import RecentFeedback from "../RecentFeedback";

export default function RecentFeedbackExample() {
  const mockItems = [
    {
      id: "1",
      rating: 5,
      category: "service_quality",
      comment: "Excellent service! The team was very responsive and resolved my issue quickly. I'm extremely satisfied with the support I received.",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      rating: 4,
      category: "response_time",
      comment: "Pretty good response time. Could be faster but overall satisfied with the service.",
      timestamp: "5 hours ago",
    },
    {
      id: "3",
      rating: 3,
      category: "problem_resolution",
      comment: "The issue was resolved but it took longer than expected. The team was helpful though.",
      timestamp: "1 day ago",
    },
  ];

  return <RecentFeedback items={mockItems} />;
}
