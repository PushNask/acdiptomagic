import { Button } from "@/components/ui/button";

export const Newsletter = () => {
  return (
    <div>
      <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
      <p className="text-gray-400 mb-4">
        Subscribe to our newsletter for the latest updates and insights.
      </p>
      <div className="flex flex-col space-y-2">
        <input
          type="email"
          placeholder="Enter your email"
          className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-brand-green"
          aria-label="Email for newsletter"
        />
        <Button variant="default">Subscribe</Button>
      </div>
    </div>
  );
};