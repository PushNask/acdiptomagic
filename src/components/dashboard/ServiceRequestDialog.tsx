import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { ContextualHelp } from "@/components/shared/ContextualHelp";
import { Check, ChevronRight, Calendar, FileText, DollarSign } from "lucide-react";

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
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    startDate: "",
    description: "",
    budget: "",
    additionalNotes: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const validateStep = () => {
    const newErrors: Record<string, string> = {};

    switch (currentStep) {
      case 1:
        if (!formData.startDate) {
          newErrors.startDate = "Start date is required";
        }
        break;
      case 2:
        if (!formData.description || formData.description.length < 10) {
          newErrors.description = "Please provide a detailed description (min. 10 characters)";
        }
        break;
      case 3:
        if (!formData.budget) {
          newErrors.budget = "Please select a budget range";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < totalSteps) {
        setCurrentStep(prev => prev + 1);
        toast({
          title: "Progress Saved",
          description: "Your information has been saved. Let's continue with the next step.",
          duration: 2000,
        });
      }
    } else {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    if (validateStep()) {
      onRequestSubmit();
      toast({
        title: "Request Submitted Successfully!",
        description: "We'll review your request and get back to you within 24 hours.",
        duration: 5000,
      });
      setShowServiceRequest(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Preferred Start Date</label>
              <ContextualHelp context="service-request-date" />
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <Input 
                type="date" 
                value={formData.startDate}
                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                className="flex-1"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Project Description</label>
              <ContextualHelp context="service-request-description" />
            </div>
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <textarea 
                className="w-full min-h-[100px] p-2 border rounded-md" 
                placeholder="Describe your project requirements..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Budget Range</label>
              <ContextualHelp context="service-request-budget" />
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-muted-foreground" />
              <select 
                className="w-full p-2 border rounded-md"
                value={formData.budget}
                onChange={(e) => setFormData({...formData, budget: e.target.value})}
              >
                <option value="">Select a budget range</option>
                <option value="500-1000">$500 - $1,000</option>
                <option value="1000-2500">$1,000 - $2,500</option>
                <option value="2500-5000">$2,500 - $5,000</option>
                <option value="5000+">$5,000+</option>
              </select>
            </div>
            <div className="mt-4">
              <label className="text-sm font-medium">Additional Notes (Optional)</label>
              <textarea 
                className="w-full min-h-[60px] p-2 border rounded-md mt-2" 
                placeholder="Any additional information..."
                value={formData.additionalNotes}
                onChange={(e) => setFormData({...formData, additionalNotes: e.target.value})}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={showServiceRequest} onOpenChange={setShowServiceRequest}>
      <DialogContent className="sm:max-w-[500px] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>Request Service: {selectedService?.title}</DialogTitle>
          <DialogDescription>
            Complete the following steps to submit your service request
          </DialogDescription>
        </DialogHeader>

        <div className="p-6">
          <div className="mb-6">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
          </div>

          <div className="space-y-6">
            {renderStep()}

            {Object.keys(errors).length > 0 && (
              <div className="text-sm text-destructive mt-2">
                {Object.values(errors).map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}
          </div>

          <div className="pt-6 flex justify-between space-x-2">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="min-w-[100px]"
            >
              Back
            </Button>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowServiceRequest(false)}
                className="min-w-[100px]"
              >
                Cancel
              </Button>
              {currentStep < totalSteps ? (
                <Button 
                  onClick={handleNext}
                  className="min-w-[100px]"
                >
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit}
                  className="min-w-[100px]"
                >
                  Submit <Check className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceRequestDialog;
