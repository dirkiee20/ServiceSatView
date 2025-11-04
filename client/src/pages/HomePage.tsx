import FeedbackForm from "@/components/FeedbackForm";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { InsertFeedback } from "@shared/schema";

export default function HomePage() {
  const { toast } = useToast();

  const createFeedbackMutation = useMutation({
    mutationFn: async (data: InsertFeedback) => {
      const res = await apiRequest("POST", "/api/feedback", data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/feedback"] });
      toast({
        title: "Feedback submitted",
        description: "Thank you for your feedback!",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (data: InsertFeedback) => {
    createFeedbackMutation.mutate(data);
  };

  return (
    <div className="p-8">
      <FeedbackForm onSubmit={handleSubmit} />
    </div>
  );
}
