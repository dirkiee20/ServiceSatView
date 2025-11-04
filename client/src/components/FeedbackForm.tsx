import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import StarRating from "./StarRating";
import { CheckCircle2 } from "lucide-react";
import type { InsertFeedback } from "@shared/schema";

interface FeedbackFormProps {
  onSubmit?: (data: InsertFeedback) => void;
}

type CategoryType = "service_quality" | "response_time" | "problem_resolution" | "overall_experience";

const categories: Array<{ id: CategoryType; label: string }> = [
  { id: "service_quality", label: "Service Quality" },
  { id: "response_time", label: "Response Time" },
  { id: "problem_resolution", label: "Problem Resolution" },
  { id: "overall_experience", label: "Overall Experience" },
];

export default function FeedbackForm({ onSubmit }: FeedbackFormProps) {
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState<CategoryType | "">("");
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating > 0 && category && comment.trim()) {
      onSubmit?.({ rating, category, comment });
      setSubmitted(true);
      setTimeout(() => {
        setRating(0);
        setCategory("");
        setComment("");
        setSubmitted(false);
      }, 2000);
    }
  };

  if (submitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <CheckCircle2 className="w-16 h-16 text-primary mb-4" />
          <h3 className="text-2xl font-semibold mb-2">Thank You!</h3>
          <p className="text-muted-foreground text-center">
            Your feedback has been submitted successfully.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Share Your Feedback</CardTitle>
        <CardDescription>Help us improve by rating your experience</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-medium mb-3 block">
              How would you rate your experience?
            </label>
            <StarRating rating={rating} onRatingChange={setRating} size="lg" />
            {rating > 0 && (
              <p className="text-sm text-muted-foreground mt-2">
                {rating} out of 5 stars
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium mb-3 block">
              What aspect are you rating?
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Badge
                  key={cat.id}
                  variant={category === cat.id ? "default" : "outline"}
                  className="cursor-pointer hover-elevate active-elevate-2"
                  onClick={() => setCategory(cat.id)}
                  data-testid={`category-${cat.id}`}
                >
                  {cat.label}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="comment" className="text-sm font-medium mb-2 block">
              Tell us about your experience
            </label>
            <Textarea
              id="comment"
              data-testid="input-comment"
              placeholder="Tell us about your experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[120px] resize-none"
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground mt-1 text-right">
              {comment.length}/500 characters
            </p>
          </div>

          <Button
            type="submit"
            data-testid="button-submit"
            className="w-full"
            disabled={rating === 0 || !category || !comment.trim()}
          >
            Submit Feedback
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
