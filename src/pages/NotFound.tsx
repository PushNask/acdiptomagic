import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] gap-4">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="text-muted-foreground text-lg text-center max-w-md">
        Sorry, the page you are looking for doesn't exist or has been moved.
      </p>
      <div className="flex gap-4">
        <Button onClick={() => navigate(-1)}>Go Back</Button>
        <Button onClick={() => navigate("/")} variant="outline">
          Go Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;