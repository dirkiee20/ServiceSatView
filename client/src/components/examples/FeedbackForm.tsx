import FeedbackForm from "../FeedbackForm";
import type { InsertFeedback } from "@shared/schema";

export default function FeedbackFormExample() {
  const handleSubmit = (data: InsertFeedback) => {
    console.log("Feedback submitted:", data);
  };

  return <FeedbackForm onSubmit={handleSubmit} />;
}
