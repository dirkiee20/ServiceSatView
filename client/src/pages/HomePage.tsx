import FeedbackForm from "@/components/FeedbackForm";
import { useToast } from "@/hooks/use-toast";

export default function HomePage() {
  const { toast } = useToast();

  const handleSubmit = (data: { rating: number; category: string; comment: string }) => {
    console.log("Feedback submitted:", data);
    toast({
      title: "Feedback submitted",
      description: "Thank you for your feedback!",
    });
  };

  return (
    <div className="p-8">
      <FeedbackForm onSubmit={handleSubmit} />
    </div>
  );
}
