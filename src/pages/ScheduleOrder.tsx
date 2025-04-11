
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import BlurContainer from '@/components/ui/BlurContainer';
import { Button } from '@/components/ui/button';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle,
  ChevronRight
} from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { orders } from '@/lib/data';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';

const timeSlots = [
  '9:00 AM - 11:00 AM',
  '11:00 AM - 1:00 PM', 
  '2:00 PM - 4:00 PM',
  '4:00 PM - 6:00 PM'
];

const ScheduleOrder = () => {
  const isMobile = useIsMobile();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeSlot, setTimeSlot] = useState<string | undefined>(undefined);
  const [selectedOrderId, setSelectedOrderId] = useState<string | undefined>(undefined);
  
  const availableOrders = orders.filter(order => 
    order.status !== 'delivered' && !order.estimatedDelivery
  );
  
  const selectedOrder = availableOrders.find(order => order.id === selectedOrderId);
  
  const handleSchedule = () => {
    if (!date || !timeSlot || !selectedOrderId) {
      toast.error('Please select an order, date, and time slot');
      return;
    }
    
    // In a real app, we would send this data to a backend API
    console.log('Schedule:', { orderId: selectedOrderId, date, timeSlot });
    
    toast.success('Delivery scheduled successfully!', {
      description: `Your order will be delivered on ${format(date, 'MMMM d, yyyy')} between ${timeSlot}.`
    });
    
    // Reset the form
    setDate(undefined);
    setTimeSlot(undefined);
    setSelectedOrderId(undefined);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Navbar />
      
      <div className={`pt-8 pb-16 ${isMobile ? 'pl-4 pr-4 pt-20' : 'pl-72 pr-8'}`}>
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-medilink-black">Schedule Delivery</h1>
          <p className="text-medilink-darkGray mt-1">Choose when you want your orders delivered</p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <BlurContainer>
            <h2 className="text-xl font-semibold text-medilink-black mb-6">Select Order</h2>
            
            {availableOrders.length > 0 ? (
              <div className="space-y-3">
                {availableOrders.map((order) => (
                  <div 
                    key={order.id}
                    className={cn(
                      "p-4 rounded-lg border transition-all cursor-pointer",
                      selectedOrderId === order.id
                        ? "border-medilink-blue bg-medilink-lightBlue/50"
                        : "border-gray-200 bg-white/50 hover:border-medilink-blue/50"
                    )}
                    onClick={() => setSelectedOrderId(order.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-medilink-black">{order.medicineName}</div>
                        <div className="text-sm text-medilink-darkGray mt-1">
                          Order #{order.id.slice(-6)} • Qty: {order.quantity}
                        </div>
                      </div>
                      
                      {selectedOrderId === order.id && (
                        <CheckCircle size={20} className="text-medilink-blue" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white/50 p-6 rounded-lg text-center">
                <p className="text-medilink-darkGray">No orders available for scheduling.</p>
              </div>
            )}
          </BlurContainer>
          
          <BlurContainer>
            <h2 className="text-xl font-semibold text-medilink-black mb-6">Delivery Details</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-medilink-darkGray mb-2">
                  Select Date
                </label>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-medilink-darkGray mb-2">
                  Select Time Slot
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot}
                      type="button"
                      variant="outline"
                      className={cn(
                        "justify-start",
                        timeSlot === slot && "border-medilink-blue bg-medilink-lightBlue/50 text-medilink-blue"
                      )}
                      onClick={() => setTimeSlot(slot)}
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      {slot}
                    </Button>
                  ))}
                </div>
              </div>
              
              {selectedOrder && (
                <div className="bg-medilink-lightBlue/50 p-4 rounded-lg">
                  <div className="font-medium text-medilink-black mb-1">Order Summary</div>
                  <div className="text-sm text-medilink-darkGray">{selectedOrder.medicineName}</div>
                  <div className="text-sm text-medilink-darkGray">Quantity: {selectedOrder.quantity}</div>
                </div>
              )}
              
              <Button 
                onClick={handleSchedule}
                disabled={!date || !timeSlot || !selectedOrderId}
                className="w-full bg-medilink-blue hover:bg-medilink-darkBlue"
              >
                Schedule Delivery
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </BlurContainer>
        </div>
      </div>
    </div>
  );
};

export default ScheduleOrder;
