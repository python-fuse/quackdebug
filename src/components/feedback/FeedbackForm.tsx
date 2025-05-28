// components/FeedbackForm.tsx
"use client";

import { useState } from "react";
import { supabase } from "@/supabase";
import { useUser } from "@/contexts/authContext";
import { toast } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Send, Smile } from "lucide-react";

export default function FeedbackForm() {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackType, setFeedbackType] = useState<
    "suggestion" | "issue" | "praise"
  >("suggestion");
  const { user } = useUser();

  const feedbackOptions = [
    {
      id: "suggestion",
      label: "Suggestion",
      icon: <MessageSquare className="h-4 w-4" />,
    },
    {
      id: "issue",
      label: "Issue",
      icon: <MessageSquare className="h-4 w-4 text-destructive" />,
    },
    {
      id: "praise",
      label: "Praise",
      icon: <Smile className="h-4 w-4 text-primary" />,
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) return;

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("feedbacks").insert([
        {
          message,
          user_id: user?.id ? user.id : "",
          feedback_type: feedbackType,
        },
      ]);

      if (error) throw error;

      toast(
        "success",
        "Thank you for your feedback! We appreciate your input."
      );
      setMessage("");
      setFeedbackType("suggestion");
    } catch (error) {
      console.error(error);
      toast(
        "error",
        "There was a problem submitting your feedback. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-xl bg-background rounded-xl shadow-lg border p-8">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-2">
            Share Your Thoughts
          </h2>
          <p className="text-muted-foreground">
            Your feedback helps us improve QuackDebug for everyone.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Feedback Type
            </label>
            <div className="flex flex-wrap gap-2">
              {feedbackOptions.map((option) => (
                <Button
                  key={option.id}
                  type="button"
                  variant={feedbackType === option.id ? "default" : "outline"}
                  className="gap-2"
                  onClick={() => setFeedbackType(option.id as any)}
                >
                  {option.icon}
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="feedback-message"
              className="text-sm font-medium mb-2 block"
            >
              Your Feedback
            </label>
            <Textarea
              id="feedback-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us what you think about QuackDebug..."
              rows={6}
              required
              className="resize-y"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || !message.trim()}
          >
            {isSubmitting ? (
              <>Processing...</>
            ) : (
              <>
                Submit Feedback <Send className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
