import { useState } from "react";
import { MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-xl w-80 md:w-96 h-[500px] flex flex-col">
          <div className="p-4 bg-brand-green text-white rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">AcDiToPush Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:text-gray-200 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            {/* Chat messages will go here */}
            <div className="bg-gray-100 rounded-lg p-3 mb-2">
              <p className="text-sm">
                Hello! How can I help you today?
              </p>
            </div>
          </div>
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green"
              />
              <Button variant="default">Send</Button>
            </div>
          </div>
        </div>
      ) : (
        <Button
          variant="default"
          size="icon"
          className="rounded-full h-12 w-12 shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};

export default ChatBot;