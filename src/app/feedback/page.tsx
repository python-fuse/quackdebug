import FeedbackForm from "@/components/feedback/FeedbackForm";
import React from "react";
import Link from "next/link";
import { ArrowLeft, MessageCircle, ThumbsUp } from "lucide-react";

const page = () => {
  return (
    <div className="min-h-screen bg-secondary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              We Value Your Feedback
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              QuackDebug is built for developers like you. Help us make it
              better by sharing your thoughts, suggestions, or reporting any
              issues you encounter.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-primary/10 p-2 rounded-full">
                  <MessageCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Your voice shapes our product</h3>
                  <p className="text-muted-foreground">
                    Many of our features come directly from user feedback and
                    suggestions.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 bg-primary/10 p-2 rounded-full">
                  <ThumbsUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Quick implementation</h3>
                  <p className="text-muted-foreground">
                    We regularly review all feedback and implement valuable
                    suggestions quickly.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <FeedbackForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
