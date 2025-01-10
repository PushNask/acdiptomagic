import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { HelpCircle } from "lucide-react";
import { useHelpContent } from "@/hooks/useHelpContent";
import { Button } from "@/components/ui/button";

interface ContextualHelpProps {
  context: string;
}

export const ContextualHelp = ({ context }: ContextualHelpProps) => {
  const { data: helpContent, isLoading } = useHelpContent(context);

  if (isLoading || !helpContent?.length) return null;

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <HelpCircle className="h-4 w-4" />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        {helpContent.map((item) => (
          <div key={item.id} className="space-y-2">
            <h4 className="font-semibold">{item.topic}</h4>
            <p className="text-sm text-muted-foreground">{item.content}</p>
          </div>
        ))}
      </HoverCardContent>
    </HoverCard>
  );
};