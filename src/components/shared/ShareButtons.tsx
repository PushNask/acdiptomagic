import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Facebook,
  Twitter,
  Linkedin,
  WhatsApp,
  Link as LinkIcon,
} from "lucide-react";

interface ShareButtonsProps {
  url: string;
  title: string;
  description: string;
}

const ShareButtons = ({ url, title, description }: ShareButtonsProps) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  return (
    <div className="flex gap-2 flex-wrap">
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleShare('facebook')}
        className="hover:bg-blue-100"
        title="Share on Facebook"
      >
        <Facebook className="h-4 w-4 text-blue-600" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleShare('twitter')}
        className="hover:bg-sky-100"
        title="Share on Twitter"
      >
        <Twitter className="h-4 w-4 text-sky-500" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleShare('linkedin')}
        className="hover:bg-blue-100"
        title="Share on LinkedIn"
      >
        <Linkedin className="h-4 w-4 text-blue-700" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleShare('whatsapp')}
        className="hover:bg-green-100"
        title="Share on WhatsApp"
      >
        <WhatsApp className="h-4 w-4 text-green-600" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={copyToClipboard}
        className="hover:bg-gray-100"
        title="Copy link"
      >
        <LinkIcon className="h-4 w-4 text-gray-600" />
      </Button>
    </div>
  );
};

export default ShareButtons;