import React from 'react';
import Navbar from '@/components/Navbar';
import BlurContainer from '@/components/ui/BlurContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Package, Calendar, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { orders } from '@/lib/data';
import { useIsMobile } from '@/hooks/use-mobile';
const Dashboard = () => {
  const isMobile = useIsMobile();
  const pendingOrders = orders.filter(order => order.status === 'pending' || order.status === 'processing').length;
  const urgentOrders = orders.filter(order => order.urgent).length;
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Navbar />      
      <div className={`pt-8 pb-16 ${isMobile ? 'pl-4 pr-4 pt-20' : 'pl-72 pr-8'}`}>
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-medilink-black">Dashboard</h1>
          <p className="text-medilink-darkGray mt-1">Welcome back to Medilink</p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center text-medilink-darkGray">
                <Package size={18} className="mr-2 text-medilink-blue" />
                Active Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div className="text-3xl font-bold text-medilink-black">{pendingOrders}</div>
                <Button variant="outline" asChild>
                  <Link to="/track-orders" className="text-medilink-blue border-medilink-blue hover:bg-medilink-lightBlue hover:text-medilink-blue">
                    View All
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center text-medilink-darkGray">
                <AlertTriangle size={18} className="mr-2 text-red-500" />
                Urgent Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div className="text-3xl font-bold text-medilink-black">{urgentOrders}</div>
                <Button variant="outline" asChild>
                  <Link to="/track-orders" className="text-red-500 border-red-500 hover:bg-red-50 hover:text-red-500">
                    View All
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center text-medilink-darkGray">
                <Calendar size={18} className="mr-2 text-medilink-blue" />
                Upcoming Deliveries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div className="text-3xl font-bold text-medilink-black">2</div>
                <Button variant="outline" asChild>
                  <Link to="/schedule-order" className="text-medilink-blue border-medilink-blue hover:bg-medilink-lightBlue hover:text-medilink-blue">
                    Schedule
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <BlurContainer>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-medilink-black">Quick Actions</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link to="/search">
                <Card className="bg-medilink-lightBlue/50 hover:bg-medilink-lightBlue transition-colors border-0 h-full">
                  <CardContent className="flex flex-col items-center justify-center p-6 h-full">
                    <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full mb-3 text-medilink-blue">
                      <Search size={24} />
                    </div>
                    <h3 className="text-lg font-medium text-medilink-black">Search Medicines</h3>
                    <p className="text-sm text-medilink-darkGray text-center mt-1">
                      Find and request medicines
                    </p>
                  </CardContent>
                </Card>
              </Link>
              <Link to="/track-orders">
                <Card className="bg-medilink-lightBlue/50 hover:bg-medilink-lightBlue transition-colors border-0 h-full">
                  <CardContent className="flex flex-col items-center justify-center p-6 h-full">
                    <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full mb-3 text-medilink-blue">
                      <Package size={24} />
                    </div>
                    <h3 className="text-lg font-medium text-medilink-black">Track Orders</h3>
                    <p className="text-sm text-medilink-darkGray text-center mt-1">
                      View and track your orders
                    </p>
                  </CardContent>
                </Card>
              </Link>
              <Link to="/schedule-order">
                <Card className="bg-medilink-lightBlue/50 hover:bg-medilink-lightBlue transition-colors border-0 h-full">
                  <CardContent className="flex flex-col items-center justify-center p-6 h-full">
                    <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full mb-3 text-medilink-blue">
                      <Calendar size={24} />
                    </div>
                    <h3 className="text-lg font-medium text-medilink-black">Schedule Delivery</h3>
                    <p className="text-sm text-medilink-darkGray text-center mt-1">
                      Plan your medicine deliveries
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </BlurContainer>
          <BlurContainer>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-medilink-black">Recent Activity</h2>
              <Button variant="outline" size="sm" asChild>
                <Link to="/track-orders" className="text-medilink-darkGray">
                  View All
                </Link>
              </Button>
            </div>
            <div className="space-y-4">
              {orders.slice(0, 3).map((order) => (
                <div 
                  key={order.id} 
                  className="bg-white/50 p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium text-medilink-black">{order.medicineName}</div>
                      <div className="text-sm text-medilink-darkGray mt-1">
                        Ordered {order.orderedAt.toLocaleDateString()}
                      </div>
                    </div>
                    <div 
                      className={`text-xs font-medium px-2 py-1 rounded-full 
                        ${order.status === 'pending' ? 'bg-amber-100 text-amber-600' : ''}
                        ${order.status === 'processing' ? 'bg-blue-100 text-blue-600' : ''}
                        ${order.status === 'shipping' ? 'bg-purple-100 text-purple-600' : ''}
                        ${order.status === 'delivered' ? 'bg-green-100 text-green-600' : ''}
                      `}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </BlurContainer>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;