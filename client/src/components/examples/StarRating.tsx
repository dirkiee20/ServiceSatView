import StarRating from "../StarRating";
import { useState } from "react";

export default function StarRatingExample() {
  const [rating, setRating] = useState(4);
  
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground mb-2">Interactive (Large)</p>
        <StarRating rating={rating} onRatingChange={setRating} size="lg" />
        <p className="text-sm mt-2">{rating} out of 5 stars</p>
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Read-only (Medium)</p>
        <StarRating rating={3} readonly size="md" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Read-only (Small)</p>
        <StarRating rating={5} readonly size="sm" />
      </div>
    </div>
  );
}
