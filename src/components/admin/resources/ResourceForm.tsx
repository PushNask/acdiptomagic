import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, File } from "lucide-react";

interface ResourceFormProps {
  onSubmit: (formData: any, coverImage: File | null, pdfFile: File | null) => Promise<void>;
  isSubmitting: boolean;
  onCancel: () => void;
  initialData?: any;
  mode?: 'create' | 'edit';
}

const RESOURCE_CATEGORIES = [
  { id: "business-guides", label: "Business Guides", value: "Business Guides" },
  { id: "training-materials", label: "Training Materials", value: "Training Materials" },
  { id: "industry-reports", label: "Industry Reports", value: "Industry Reports" },
  { id: "career-guidance", label: "Career Guidance", value: "Career Guidance" },
];

const ResourceForm = ({ onSubmit, isSubmitting, onCancel, initialData, mode = 'create' }: ResourceFormProps) => {
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
  });

  useEffect(() => {
    if (initialData && mode === 'edit') {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        category: initialData.category || "",
        price: initialData.price?.toString() || "",
      });
    }
  }, [initialData, mode]);

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverImage(e.target.files[0]);
    }
  };

  const handlePdfFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPdfFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData, coverImage, pdfFile);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select
          value={formData.category}
          onValueChange={(value) => setFormData({ ...formData, category: value })}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {RESOURCE_CATEGORIES.map((category) => (
              <SelectItem key={category.id} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          type="number"
          min="0"
          step="0.01"
          value={formData.price}
          onChange={(e) =>
            setFormData({ ...formData, price: e.target.value })
          }
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="pdf_file">PDF File</Label>
        <div className="flex items-center gap-2">
          <Input
            id="pdf_file"
            type="file"
            accept=".pdf"
            onChange={handlePdfFileChange}
            className="flex-1"
            required={mode === 'create'}
          />
          {pdfFile && (
            <div className="flex items-center gap-2">
              <File className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {pdfFile.name}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="cover_image">Cover Image</Label>
        <div className="flex items-center gap-2">
          <Input
            id="cover_image"
            type="file"
            accept="image/*"
            onChange={handleCoverImageChange}
            className="flex-1"
          />
          {coverImage && (
            <div className="flex items-center gap-2">
              <Upload className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {coverImage.name}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (mode === 'create' ? "Creating..." : "Updating...") : (mode === 'create' ? "Create Resource" : "Update Resource")}
        </Button>
      </div>
    </form>
  );
};

export default ResourceForm;