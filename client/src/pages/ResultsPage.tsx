import MetricCard from "@/components/MetricCard";
import TrendChart from "@/components/TrendChart";
import CategoryChart from "@/components/CategoryChart";
import DistributionChart from "@/components/DistributionChart";
import RecentFeedback from "@/components/RecentFeedback";
import { Star, MessageSquare, TrendingUp, Award } from "lucide-react";

export default function ResultsPage() {
  const trendData = [
    { date: "Jan 1", rating: 3.8 },
    { date: "Jan 5", rating: 4.0 },
    { date: "Jan 10", rating: 4.2 },
    { date: "Jan 15", rating: 4.1 },
    { date: "Jan 20", rating: 4.3 },
    { date: "Jan 25", rating: 4.5 },
    { date: "Jan 30", rating: 4.3 },
  ];

  const categoryData = [
    { category: "Service Quality", rating: 4.6 },
    { category: "Response Time", rating: 4.2 },
    { category: "Problem Resolution", rating: 4.1 },
    { category: "Overall Experience", rating: 4.3 },
  ];

  const distributionData = [
    { name: "5 Stars", value: 45 },
    { name: "4 Stars", value: 30 },
    { name: "3 Stars", value: 15 },
    { name: "2 Stars", value: 7 },
    { name: "1 Star", value: 3 },
  ];

  const recentFeedbackItems = [
    {
      id: "1",
      rating: 5,
      category: "service_quality",
      comment: "Excellent service! The team was very responsive and resolved my issue quickly. I'm extremely satisfied with the support I received and would definitely recommend this service to others.",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      rating: 4,
      category: "response_time",
      comment: "Pretty good response time. Could be faster but overall satisfied with the service provided by the team.",
      timestamp: "5 hours ago",
    },
    {
      id: "3",
      rating: 3,
      category: "problem_resolution",
      comment: "The issue was resolved but it took longer than expected. The team was helpful though and kept me updated throughout the process.",
      timestamp: "1 day ago",
    },
    {
      id: "4",
      rating: 5,
      category: "overall_experience",
      comment: "Outstanding experience from start to finish. Very professional team!",
      timestamp: "1 day ago",
    },
    {
      id: "5",
      rating: 4,
      category: "service_quality",
      comment: "Good service quality, met my expectations. Would use again.",
      timestamp: "2 days ago",
    },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Customer Satisfaction Insights</h1>
        <p className="text-muted-foreground">
          Real-time feedback and satisfaction metrics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Average Rating"
          value="4.3"
          subtitle="Out of 5.0"
          icon={Star}
          trend="+0.3 from last month"
        />
        <MetricCard
          title="Total Responses"
          value="1,247"
          icon={MessageSquare}
          trend="+12% this month"
        />
        <MetricCard
          title="Response Rate"
          value="89%"
          icon={TrendingUp}
          trend="This month"
        />
        <MetricCard
          title="Top Category"
          value="Service Quality"
          subtitle="4.6 average"
          icon={Award}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TrendChart data={trendData} />
        <CategoryChart data={categoryData} />
      </div>

      <DistributionChart data={distributionData} />

      <div>
        <h2 className="text-2xl font-semibold mb-4">Recent Feedback</h2>
        <RecentFeedback items={recentFeedbackItems} />
      </div>
    </div>
  );
}
