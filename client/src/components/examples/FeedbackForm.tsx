import FeedbackForm from "../FeedbackForm";

export default function FeedbackFormExample() {
  const handleSubmit = (data: { rating: number; category: string; comment: string }) => {
    console.log("Feedback submitted:", data);
  };

  return <FeedbackForm onSubmit={handleSubmit} />;
}
