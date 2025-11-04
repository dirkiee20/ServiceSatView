import MetricCard from "../MetricCard";
import { Star, MessageSquare, TrendingUp, Award } from "lucide-react";

export default function MetricCardExample() {
  return (
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
  );
}
