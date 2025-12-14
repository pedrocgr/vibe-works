import * as React from "react";
import { useState, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils.js";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div>Navigation</div>
        </div>
      </div>
    </nav>
  );
};

export { Navigation };
