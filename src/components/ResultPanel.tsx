import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ResultPanelProps {
  isLoading: boolean;
  error: string | null;
  children: React.ReactNode;
  className?: string;
}

const ResultPanel: React.FC<ResultPanelProps> = ({ isLoading, error, children, className }) => {
  if (isLoading) {
    return (
      <div className={cn("flex items-center justify-center py-16", className)}>
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-3 text-muted-foreground">Analyzing code...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn("rounded-lg border border-destructive/30 bg-destructive/5 p-4", className)}>
        <p className="text-sm text-destructive font-medium">{error}</p>
      </div>
    );
  }

  return <div className={className}>{children}</div>;
};

export default ResultPanel;
