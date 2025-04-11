
import React from 'react';
import { Calendar, Clock, Package, CheckCircle, AlertTriangle, Truck } from 'lucide-react';
import { cn } from '@/lib/utils';
import BlurContainer from './ui/BlurContainer';
import { format } from 'date-fns';

export type OrderStatus = 'pending' | 'processing' | 'shipping' | 'delivered';

export interface Order {
  id: string;
  medicineName: string;
  quantity: number;
  orderedAt: Date;
  status: OrderStatus;
  estimatedDelivery?: Date;
  urgent: boolean;
}

interface OrderCardProps {
  order: Order;
  className?: string;
}

const statusConfig = {
  pending: {
    label: 'Order Pending',
    icon: Package,
    color: 'text-amber-600',
    bgColor: 'bg-amber-100'
  },
  processing: {
    label: 'Processing',
    icon: CheckCircle,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  shipping: {
    label: 'Shipping',
    icon: Truck,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  },
  delivered: {
    label: 'Delivered',
    icon: CheckCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  }
};

const OrderCard = ({ order, className }: OrderCardProps) => {
  const status = statusConfig[order.status];
  
  return (
    <BlurContainer 
      className={cn(
        "transition-all duration-300 hover:shadow-xl overflow-hidden",
        className
      )}
      padding="none"
    >
      <div className={cn(
        "py-3 px-6",
        order.urgent ? 'bg-red-50 border-b border-red-100' : 'bg-medilink-lightBlue/50 border-b border-medilink-lightBlue'
      )}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="font-medium text-medilink-black">Order #{order.id.slice(-6)}</div>
            
            {order.urgent && (
              <div className="ml-3 flex items-center text-xs font-medium text-red-800 bg-red-100 px-2 py-1 rounded-full">
                <AlertTriangle size={12} className="mr-1" />
                Urgent
              </div>
            )}
          </div>
          
          <div className={cn(
            "flex items-center text-sm font-medium px-3 py-1 rounded-full",
            status.bgColor,
            status.color
          )}>
            <status.icon size={14} className="mr-1" />
            <span>{status.label}</span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-semibold text-medilink-black mb-1">{order.medicineName}</h3>
        <p className="text-sm text-medilink-darkGray">Quantity: {order.quantity}</p>
        
        <div className="flex flex-col gap-2 mt-4">
          <div className="flex items-center text-sm text-medilink-darkGray">
            <Calendar size={16} className="mr-2 text-medilink-blue" />
            <span>Ordered on {format(order.orderedAt, 'MMM d, yyyy')}</span>
          </div>
          
          {order.estimatedDelivery && (
            <div className="flex items-center text-sm text-medilink-darkGray">
              <Truck size={16} className="mr-2 text-medilink-blue" />
              <span>Est. delivery by {format(order.estimatedDelivery, 'MMM d, yyyy')}</span>
            </div>
          )}
          
          <div className="flex items-center text-sm text-medilink-darkGray">
            <Clock size={16} className="mr-2 text-medilink-blue" />
            <span>Last updated: {format(new Date(), 'h:mm a')}</span>
          </div>
        </div>
      </div>
    </BlurContainer>
  );
};

export default OrderCard;
