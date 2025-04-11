
import React from 'react';
import { Check, X, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import BlurContainer from './ui/BlurContainer';
import { Button } from '@/components/ui/button';

export interface Medicine {
  id: string;
  name: string;
  manufacturer: string;
  dosage: string;
  inStock: boolean;
  price: number;
}

interface MedicineCardProps {
  medicine: Medicine;
  onRequest?: (medicine: Medicine) => void;
  className?: string;
}

const MedicineCard = ({ medicine, onRequest, className }: MedicineCardProps) => {
  return (
    <BlurContainer 
      className={cn("transition-all duration-300 hover:shadow-xl", className)}
      padding="sm"
    >
      <div className="flex flex-col">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-medilink-black">{medicine.name}</h3>
            <p className="text-sm text-medilink-darkGray">{medicine.manufacturer}</p>
            <p className="text-sm text-medilink-darkGray mt-1">{medicine.dosage}</p>
          </div>
          
          <div 
            className={cn(
              "flex items-center px-3 py-1 rounded-full text-sm font-medium",
              medicine.inStock 
                ? "bg-green-100 text-green-800" 
                : "bg-red-100 text-red-800"
            )}
          >
            {medicine.inStock ? (
              <>
                <Check size={14} className="mr-1" />
                <span>In Stock</span>
              </>
            ) : (
              <>
                <X size={14} className="mr-1" />
                <span>Out of Stock</span>
              </>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <span className="font-semibold text-medilink-blue">
            ${medicine.price.toFixed(2)}
          </span>
          
          {!medicine.inStock && onRequest && (
            <Button 
              onClick={() => onRequest(medicine)}
              variant="outline"
              className="text-medilink-blue border-medilink-blue hover:bg-medilink-lightBlue hover:text-medilink-blue"
              size="sm"
            >
              <AlertCircle size={16} className="mr-1" />
              Request
            </Button>
          )}
        </div>
      </div>
    </BlurContainer>
  );
};

export default MedicineCard;
