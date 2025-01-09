import { useState } from 'react';
import { X, Phone } from 'lucide-react';

const AnnouncementBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-brand-blue text-white px-4 py-2 flex items-center justify-center relative">
      <div className="flex items-center gap-2 text-sm md:text-base max-w-screen-xl mx-auto">
        <span className="font-medium">On Sale:</span>
        <span className="hidden md:inline">"The Ultimate Guide to Importing Goods from China Without Traveling: A Step-by-Step Manual for Success"</span>
        <span className="md:hidden">"Ultimate China Import Guide"</span>
        <span className="hidden md:flex items-center gap-1">
          <Phone className="h-4 w-4" />
          Order Now: +237 - 671 154 588
        </span>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-brand-blue/80 rounded-full transition-colors"
        aria-label="Close announcement"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default AnnouncementBanner;