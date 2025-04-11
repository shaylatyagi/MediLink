
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import OrderCard, { OrderStatus } from '@/components/OrderCard';
import { orders } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const TrackOrders = () => {
  const isMobile = useIsMobile();
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all');
  
  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Navbar />
      
      <div className={`pt-8 pb-16 ${isMobile ? 'pl-4 pr-4 pt-20' : 'pl-72 pr-8'}`}>
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-medilink-black">Track Orders</h1>
          <p className="text-medilink-darkGray mt-1">View and track your medicine orders</p>
        </header>
        
        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
            className={filter === 'all' ? 'bg-medilink-blue hover:bg-medilink-darkBlue' : ''}
          >
            All Orders
          </Button>
          <Button
            variant={filter === 'pending' ? 'default' : 'outline'}
            onClick={() => setFilter('pending')}
            className={filter === 'pending' ? 'bg-amber-500 hover:bg-amber-600' : 'text-amber-600 border-amber-200 hover:bg-amber-50'}
          >
            Pending
          </Button>
          <Button
            variant={filter === 'processing' ? 'default' : 'outline'}
            onClick={() => setFilter('processing')}
            className={filter === 'processing' ? 'bg-blue-500 hover:bg-blue-600' : 'text-blue-600 border-blue-200 hover:bg-blue-50'}
          >
            Processing
          </Button>
          <Button
            variant={filter === 'shipping' ? 'default' : 'outline'}
            onClick={() => setFilter('shipping')}
            className={filter === 'shipping' ? 'bg-purple-500 hover:bg-purple-600' : 'text-purple-600 border-purple-200 hover:bg-purple-50'}
          >
            Shipping
          </Button>
          <Button
            variant={filter === 'delivered' ? 'default' : 'outline'}
            onClick={() => setFilter('delivered')}
            className={filter === 'delivered' ? 'bg-green-500 hover:bg-green-600' : 'text-green-600 border-green-200 hover:bg-green-50'}
          >
            Delivered
          </Button>
        </div>
        
        {filteredOrders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 text-center">
            <p className="text-lg text-medilink-darkGray">No orders with this status.</p>
            <Button 
              variant="outline" 
              onClick={() => setFilter('all')} 
              className="mt-4"
            >
              View All Orders
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrders;
