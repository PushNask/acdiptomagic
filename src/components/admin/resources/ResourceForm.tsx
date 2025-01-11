import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";

interface ResourceFormProps {
  onSubmit: (formData: any, coverImage: File | null) => Promise<void>;
  isSubmitting: boolean;
  onCancel: () => void;
}

const ResourceForm = ({ onSubmit, isSubmitting, onCancel }: ResourceFormProps) => {
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    file_url: "",
  });

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData, coverImage);
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
        <Input
          id="category"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          required
        />
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
        <Label htmlFor="file_url">File URL</Label>
        <Input
          id="file_url"
          value={formData.file_url}
          onChange={(e) =>
            setFormData({ ...formData, file_url: e.target.value })
          }
          required
        />
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
          {isSubmitting ? "Creating..." : "Create Resource"}
        </Button>
      </div>
    </form>
  );
};

export default ResourceForm;