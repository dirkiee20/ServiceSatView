import FeedbackForm from "@/components/FeedbackForm";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { InsertFeedback, Template } from "@shared/schema";
import { useParams } from "wouter";

export default function PublicFeedbackPage() {
  const { toast } = useToast();
  const params = useParams<{ linkId: string }>();
  const linkId = params.linkId;

  const { data: templates = [] } = useQuery<Template[]>({
    queryKey: [`/api/templates/public/${linkId}`],
  });

  const createFeedbackMutation = useMutation({
    mutationFn: async (data: InsertFeedback) => {
      const res = await apiRequest("POST", `/api/feedback/submit/${linkId}`, data);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Feedback submitted",
        description: "Thank you for your feedback!",
      });
    },
    onError: (error: Error) => {
      const message = error.message.includes("404")
        ? "Invalid feedback link. Please check the URL."
        : "Failed to submit feedback. Please try again.";
      
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (data: InsertFeedback) => {
    createFeedbackMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="w-full">
        <FeedbackForm onSubmit={handleSubmit} templates={templates} />
      </div>
    </div>
  );
}
