import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import ResourceForm from "./ResourceForm";

interface EditResourceDialogProps {
  resource: any;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (formData: any, coverImage: File | null, pdfFile: File | null) => Promise<void>;
  isSubmitting: boolean;
}

const EditResourceDialog = ({
  resource,
  isOpen,
  onOpenChange,
  onSubmit,
  isSubmitting,
}: EditResourceDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] w-[95vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Resource</DialogTitle>
        </DialogHeader>
        <ResourceForm
          initialData={resource}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          onCancel={() => onOpenChange(false)}
          mode="edit"
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditResourceDialog;