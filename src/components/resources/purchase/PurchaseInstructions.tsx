import { DialogDescription } from "@/components/ui/dialog";

interface PurchaseInstructionsProps {
  selectedResource: any;
}

const PurchaseInstructions = ({ selectedResource }: PurchaseInstructionsProps) => {
  return (
    <div className="space-y-4">
      <DialogDescription>
        Follow these steps to get your copy of {selectedResource?.title}:
      </DialogDescription>
      <div className="space-y-2">
        <p className="text-sm">
          1. Contact our sales team at <span className="font-medium">+237 671 154 588</span>
        </p>
        <p className="text-sm">
          2. Reference the resource: {selectedResource?.title}
        </p>
        <p className="text-sm">
          3. Price: ${selectedResource?.price?.toFixed(2)}
        </p>
        <p className="text-sm">
          4. You'll receive an 8-character purchase code within 24 hours after payment confirmation.
        </p>
      </div>
    </div>
  );
};

export default PurchaseInstructions;