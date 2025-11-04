import MetricCard from "@/components/MetricCard";
import TrendChart from "@/components/TrendChart";
import CategoryChart from "@/components/CategoryChart";
import DistributionChart from "@/components/DistributionChart";
import RecentFeedback from "@/components/RecentFeedback";
import { Star, MessageSquare, TrendingUp, Award } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Feedback } from "@shared/schema";
import { formatDistanceToNow } from "date-fns";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";

const categoryLabels: Record<string, string> = {
  service_quality: "Service Quality",
  response_time: "Response Time",
  problem_resolution: "Problem Resolution",
  overall_experience: "Overall Experience",
};

export default function ResultsPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { toast } = useToast();

  // Redirect to login if not authenticated - Replit Auth integration
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, authLoading, toast]);

  const { data: feedbackList = [], isLoading, error } = useQuery<Feedback[]>({
    queryKey: ["/api/feedback"],
    retry: false,
  });

  // Handle unauthorized error
  useEffect(() => {
    if (error && isUnauthorizedError(error as Error)) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
    }
  }, [error, toast]);

  if (authLoading || isLoading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <p className="text-muted-foreground">Loading feedback data...</p>
      </div>
    );
  }

  // Calculate statistics
  const totalResponses = feedbackList.length;
  const averageRating =
    totalResponses > 0
      ? (feedbackList.reduce((sum, f) => sum + f.rating, 0) / totalResponses).toFixed(1)
      : "0.0";

  // Category breakdown
  const categoryStats: Record<string, { total: number; sum: number }> = {};
  feedbackList.forEach((f) => {
    if (!categoryStats[f.category]) {
      categoryStats[f.category] = { total: 0, sum: 0 };
    }
    categoryStats[f.category].total++;
    categoryStats[f.category].sum += f.rating;
  });

  const categoryData = Object.entries(categoryStats).map(([category, stats]) => ({
    category: categoryLabels[category] || category,
    rating: parseFloat((stats.sum / stats.total).toFixed(1)),
  }));

  // Find top category
  const topCategory =
    categoryData.length > 0
      ? categoryData.reduce((max, curr) => (curr.rating > max.rating ? curr : max))
      : null;

  // Rating distribution
  const ratingCounts = [0, 0, 0, 0, 0];
  feedbackList.forEach((f) => {
    if (f.rating >= 1 && f.rating <= 5) {
      ratingCounts[f.rating - 1]++;
    }
  });

  const distributionData = [
    { name: "5 Stars", value: ratingCounts[4] },
    { name: "4 Stars", value: ratingCounts[3] },
    { name: "3 Stars", value: ratingCounts[2] },
    { name: "2 Stars", value: ratingCounts[1] },
    { name: "1 Star", value: ratingCounts[0] },
  ];

  // Trend data (last 30 entries grouped by date)
  const trendData = feedbackList
    .slice(0, 30)
    .reverse()
    .reduce(
      (acc: Array<{ date: string; rating: number; count: number }>, feedback) => {
        const date = new Date(feedback.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
        const existing = acc.find((item) => item.date === date);
        if (existing) {
          existing.rating =
            (existing.rating * existing.count + feedback.rating) / (existing.count + 1);
          existing.count++;
        } else {
          acc.push({ date, rating: feedback.rating, count: 1 });
        }
        return acc;
      },
      []
    )
    .map((item) => ({ date: item.date, rating: parseFloat(item.rating.toFixed(1)) }));

  // Recent feedback for display
  const recentFeedbackItems = feedbackList.slice(0, 10).map((f) => ({
    id: f.id,
    rating: f.rating,
    category: f.category,
    comment: f.comment,
    timestamp: formatDistanceToNow(new Date(f.createdAt), { addSuffix: true }),
  }));

  // Calculate response rate (mock calculation for now)
  const responseRate = totalResponses > 0 ? "89%" : "0%";

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Customer Satisfaction Insights</h1>
        <p className="text-muted-foreground">Real-time feedback and satisfaction metrics</p>
      </div>

      {totalResponses === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No feedback received yet.</p>
          <p className="text-muted-foreground text-sm mt-2">
            Share your feedback link with customers to start collecting responses!
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Average Rating"
              value={averageRating}
              subtitle="Out of 5.0"
              icon={Star}
            />
            <MetricCard
              title="Total Responses"
              value={totalResponses.toLocaleString()}
              icon={MessageSquare}
            />
            <MetricCard title="Response Rate" value={responseRate} icon={TrendingUp} trend="This month" />
            <MetricCard
              title="Top Category"
              value={topCategory?.category || "N/A"}
              subtitle={topCategory ? `${topCategory.rating} average` : undefined}
              icon={Award}
            />
          </div>

          {trendData.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TrendChart data={trendData} />
              {categoryData.length > 0 && <CategoryChart data={categoryData} />}
            </div>
          )}

          {distributionData.some((d) => d.value > 0) && <DistributionChart data={distributionData} />}

          {recentFeedbackItems.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Recent Feedback</h2>
              <RecentFeedback items={recentFeedbackItems} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
