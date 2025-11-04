import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, BarChart3, Users, Zap } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">About This Platform</h1>
        <p className="text-muted-foreground">
          A comprehensive customer satisfaction feedback system
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Our Mission</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            We believe that customer feedback is the cornerstone of exceptional service.
            Our platform makes it easy for customers to share their experiences and for
            businesses to gain actionable insights from that feedback.
          </p>
          <p>
            By providing real-time satisfaction metrics and detailed analytics, we help
            organizations continuously improve their customer service and build stronger
            relationships with their clients.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <MessageSquare className="h-8 w-8 text-primary" />
            <CardTitle>Easy Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Simple, intuitive forms that make it easy for customers to share their
              thoughts and rate their experience across multiple categories.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <BarChart3 className="h-8 w-8 text-primary" />
            <CardTitle>Real-Time Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              View satisfaction metrics as they happen with beautiful charts and graphs
              that make data easy to understand and act upon.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Users className="h-8 w-8 text-primary" />
            <CardTitle>Customer-Centric</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Designed with both customers and businesses in mind, ensuring a smooth
              experience for everyone involved in the feedback process.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Zap className="h-8 w-8 text-primary" />
            <CardTitle>Actionable Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Transform feedback into action with categorized responses, trend analysis,
              and detailed breakdowns by service area.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Get Started</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Ready to share your feedback or explore the results? Use the navigation menu
            to get started:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Submit your feedback and rate your experience</li>
            <li>View comprehensive satisfaction results and analytics</li>
            <li>Track trends and improvements over time</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
