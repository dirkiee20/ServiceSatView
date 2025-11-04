import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, BarChart3, Link as LinkIcon, QrCode, CheckCircle } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="border-b">
        <div className="container mx-auto px-8 py-16 max-w-6xl">
          <div className="text-center space-y-6">
            <h1 className="text-5xl font-bold tracking-tight">
              Customer Satisfaction Feedback Platform
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Collect, analyze, and act on customer feedback with beautiful dashboards
              and easy integration
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Button
                size="lg"
                onClick={() => (window.location.href = "/api/login")}
                data-testid="button-login"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-8 py-16 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <MessageSquare className="h-10 w-10 text-primary mb-4" />
              <CardTitle>Easy Feedback Collection</CardTitle>
              <CardDescription>
                Simple forms with star ratings and categories make it easy for
                customers to share their experience
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <BarChart3 className="h-10 w-10 text-primary mb-4" />
              <CardTitle>Real-Time Analytics</CardTitle>
              <CardDescription>
                View satisfaction metrics instantly with beautiful charts showing
                trends, categories, and distributions
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <LinkIcon className="h-10 w-10 text-primary mb-4" />
              <CardTitle>Unique Feedback Links</CardTitle>
              <CardDescription>
                Get your own unique link to integrate into your website or
                customer communications
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <QrCode className="h-10 w-10 text-primary mb-4" />
              <CardTitle>QR Code Support</CardTitle>
              <CardDescription>
                Generate QR codes for physical locations, receipts, or printed
                materials
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CheckCircle className="h-10 w-10 text-primary mb-4" />
              <CardTitle>Multi-Category Rating</CardTitle>
              <CardDescription>
                Collect feedback across service quality, response time, problem
                resolution, and overall experience
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <MessageSquare className="h-10 w-10 text-primary mb-4" />
              <CardTitle>Detailed Comments</CardTitle>
              <CardDescription>
                Get rich qualitative feedback with comment fields to understand
                the full customer experience
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* How It Works */}
        <div className="mt-16 space-y-8">
          <h2 className="text-3xl font-bold text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto">
                1
              </div>
              <h3 className="text-xl font-semibold">Sign Up</h3>
              <p className="text-muted-foreground">
                Create your free account in seconds
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto">
                2
              </div>
              <h3 className="text-xl font-semibold">Get Your Link</h3>
              <p className="text-muted-foreground">
                Receive a unique feedback link and QR code
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto">
                3
              </div>
              <h3 className="text-xl font-semibold">View Results</h3>
              <p className="text-muted-foreground">
                Track satisfaction in real-time with beautiful dashboards
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">
                Ready to improve customer satisfaction?
              </h2>
              <p className="text-muted-foreground mb-6">
                Start collecting feedback today
              </p>
              <Button
                size="lg"
                onClick={() => (window.location.href = "/api/login")}
                data-testid="button-cta-login"
              >
                Get Started Free
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
