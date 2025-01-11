import { AlertCircle } from "lucide-react";

export const ErrorState = () => {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="flex items-center gap-2 text-destructive">
        <AlertCircle className="h-5 w-5" />
        <span>Failed to load service requests. Please try again.</span>
      </div>
    </div>
  );
};