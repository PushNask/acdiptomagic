import { Search, Filter, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import ServiceRequestDialog from "./ServiceRequestDialog";
import { availableServices } from "@/data/services";

interface SearchFilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchFilterBar = ({ searchQuery, setSearchQuery }: SearchFilterBarProps) => {
  const { toast } = useToast();
  const [isFiltering, setIsFiltering] = useState(false);
  const [showServiceRequest, setShowServiceRequest] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    if (value.length > 0) {
      setIsFiltering(true);
    }
  };

  const handleNewRequest = () => {
    // Select the first available service as default
    const firstService = Object.values(availableServices)[0][0];
    setSelectedService(firstService);
    setShowServiceRequest(true);
  };

  const handleRequestSubmit = () => {
    toast({
      title: "Request Submitted",
      description: "We'll review your request and get back to you soon.",
      duration: 3000,
    });
    setShowServiceRequest(false);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-4xl mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search services..." 
            className="pl-10 h-11 w-full"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            aria-label="Search services"
          />
          {isFiltering && searchQuery && (
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
              onClick={() => {
                setSearchQuery("");
                setIsFiltering(false);
              }}
              aria-label="Clear search"
            >
              Clear
            </button>
          )}
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center h-11">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem className="cursor-pointer">
                Latest First
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Oldest First
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                High Priority
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Low Priority
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button 
            className="h-11"
            onClick={handleNewRequest}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            New Request
          </Button>
        </div>
      </div>

      <ServiceRequestDialog
        showServiceRequest={showServiceRequest}
        setShowServiceRequest={setShowServiceRequest}
        selectedService={selectedService}
        onRequestSubmit={handleRequestSubmit}
      />
    </>
  );
};

export default SearchFilterBar;