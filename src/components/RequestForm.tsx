
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BlurContainer from './ui/BlurContainer';
import { Medicine } from './MedicineCard';
import { toast } from 'sonner';

interface RequestFormProps {
  medicine: Medicine;
  onClose: () => void;
  onSubmit: (data: RequestFormData) => void;
}

export interface RequestFormData {
  medicineId: string;
  quantity: number;
  notes: string;
  urgent: boolean;
}

const RequestForm = ({ medicine, onClose, onSubmit }: RequestFormProps) => {
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [urgent, setUrgent] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (quantity < 1) {
      toast.error('Quantity must be at least 1');
      return;
    }
    
    onSubmit({
      medicineId: medicine.id,
      quantity,
      notes,
      urgent
    });
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
      <BlurContainer className="w-full max-w-md max-h-[90vh] overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-medilink-black">Request Medicine</h2>
          <button 
            onClick={onClose}
            className="text-medilink-darkGray hover:text-medilink-black transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="mb-6 p-3 bg-medilink-lightBlue rounded-lg">
          <div className="font-medium">{medicine.name}</div>
          <div className="text-sm text-medilink-darkGray">{medicine.manufacturer} • {medicine.dosage}</div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-medilink-darkGray mb-1">
              Quantity
            </label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-medilink-blue focus:ring-1 focus:ring-medilink-blue outline-none"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-medilink-darkGray mb-1">
              Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-medilink-blue focus:ring-1 focus:ring-medilink-blue outline-none resize-none min-h-[100px]"
            />
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="urgent"
              checked={urgent}
              onChange={(e) => setUrgent(e.target.checked)}
              className="h-4 w-4 text-medilink-blue border-gray-300 rounded focus:ring-medilink-blue"
            />
            <label htmlFor="urgent" className="ml-2 block text-sm text-medilink-darkGray">
              Mark as urgent
            </label>
          </div>
          
          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-medilink-blue hover:bg-medilink-darkBlue"
            >
              Submit Request
            </Button>
          </div>
        </form>
      </BlurContainer>
    </div>
  );
};

export default RequestForm;
