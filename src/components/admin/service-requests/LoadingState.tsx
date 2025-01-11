import { AlertCircle } from "lucide-react";

export const LoadingState = () => {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="flex items-center gap-2">
        <AlertCircle className="h-5 w-5 text-muted-foreground animate-pulse" />
        <span className="text-muted-foreground">Loading requests...</span>
      </div>
    </div>
  );
};