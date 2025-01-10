import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ServiceDetailsSectionProps {
  services: string;
  notes: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const ServiceDetailsSection = ({ services, notes, onChange }: ServiceDetailsSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="services">Services Description *</Label>
        <Textarea
          id="services"
          name="services"
          value={services}
          onChange={onChange}
          placeholder="Describe the services provided"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Additional Notes</Label>
        <Textarea
          id="notes"
          name="notes"
          value={notes}
          onChange={onChange}
          placeholder="Enter any additional notes"
        />
      </div>
    </div>
  );
};