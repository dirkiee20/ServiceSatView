import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import StarRating from "./StarRating";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FeedbackItem {
  id: string;
  rating: number;
  category: string;
  comment: string;
  timestamp: string;
}

interface RecentFeedbackProps {
  items: FeedbackItem[];
}

const categoryLabels: Record<string, string> = {
  service_quality: "Service Quality",
  response_time: "Response Time",
  problem_resolution: "Problem Resolution",
  overall_experience: "Overall Experience",
};

export default function RecentFeedback({ items }: RecentFeedbackProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <Card
          key={item.id}
          data-testid={`card-feedback-${index}`}
          className="hover-elevate transition-shadow"
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <StarRating rating={item.rating} readonly size="sm" />
                  <Badge variant="secondary" className="text-xs">
                    {categoryLabels[item.category] || item.category}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{item.timestamp}</p>
              </div>
            </div>
            <div>
              <p className="text-sm">
                {expandedId === item.id ? item.comment : truncateText(item.comment, 120)}
              </p>
              {item.comment.length > 120 && (
                <button
                  data-testid={`button-expand-${index}`}
                  onClick={() => toggleExpand(item.id)}
                  className="text-sm text-primary hover:underline mt-2 flex items-center gap-1"
                >
                  {expandedId === item.id ? (
                    <>
                      Show less <ChevronUp className="w-3 h-3" />
                    </>
                  ) : (
                    <>
                      Read more <ChevronDown className="w-3 h-3" />
                    </>
                  )}
                </button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
