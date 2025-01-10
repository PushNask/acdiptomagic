import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface ServiceRequestDialogProps {
  showServiceRequest: boolean;
  setShowServiceRequest: (show: boolean) => void;
  selectedService: any;
  onRequestSubmit: () => void;
}

const ServiceRequestDialog = ({ 
  showServiceRequest, 
  setShowServiceRequest, 
  selectedService,
  onRequestSubmit 
}: ServiceRequestDialogProps) => {
  return (
    <Dialog open={showServiceRequest} onOpenChange={setShowServiceRequest}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Request Service: {selectedService?.title}</DialogTitle>
          <DialogDescription>
            Fill out the details below to request this service
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Preferred Start Date</label>
            <Input type="date" className="w-full" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Project Description</label>
            <textarea 
              className="w-full min-h-[100px] p-2 border rounded-md" 
              placeholder="Describe your project requirements..."
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Budget Range</label>
            <select className="w-full p-2 border rounded-md">
              <option>$500 - $1,000</option>
              <option>$1,000 - $2,500</option>
              <option>$2,500 - $5,000</option>
              <option>$5,000+</option>
            </select>
          </div>
          <div className="pt-4 flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowServiceRequest(false)}>
              Cancel
            </Button>
            <Button onClick={onRequestSubmit}>Submit Request</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceRequestDialog;