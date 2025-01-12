import React from 'react';
import { cn } from "@/lib/utils";

interface AnnouncementBannerProps {
  className?: string;
}

const AnnouncementBanner: React.FC<AnnouncementBannerProps> = ({ className }) => {
  return (
    <div className={cn(
      "bg-primary text-primary-foreground py-2 px-4 text-center text-sm font-medium",
      className
    )}>
      🎯 New Year's Sale: Save 40% on Business Plan - Order Now
    </div>
  );
};

export default AnnouncementBanner;