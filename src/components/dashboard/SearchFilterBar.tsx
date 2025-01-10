import { Search, Filter, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchFilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchFilterBar = ({ searchQuery, setSearchQuery }: SearchFilterBarProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search services..." 
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <Button variant="outline" className="flex items-center">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          New Request
        </Button>
      </div>
    </div>
  );
};

export default SearchFilterBar;