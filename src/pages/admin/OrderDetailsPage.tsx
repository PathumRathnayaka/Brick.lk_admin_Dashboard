import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Package, User, Calendar, DollarSign, ShoppingBag } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface OrderDetails {
  id: string;
  customerName: string;
  customerEmail: string;
  orderDate: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  total: number;
  items: OrderItem[];
  shippingAddress: string;
  paymentMethod: string;
}

const OrderDetailsPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<OrderDetails | null>(null);

  useEffect(() => {
    // Simulating API call to fetch order details
    const timer = setTimeout(() => {
      setOrder({
        id: orderId || 'ORD001',
        customerName: 'John Doe',
        customerEmail: 'john@example.com',
        orderDate: '2024-01-20T10:00:00Z',
        status: 'pending',
        total: 1250.00,
        items: [
          {
            id: 'ITEM001',
            name: 'Premium Cement',
            quantity: 2,
            price: 500.00,
            image: '/images/products/cement.jpg'
          },
          {
            id: 'ITEM002',
            name: 'Steel Bars',
            quantity: 1,
            price: 250.00,
            image: '/images/products/steel.jpg'
          }
        ],
        shippingAddress: '123 Main St, Colombo, Sri Lanka',
        paymentMethod: 'Credit Card'
      });
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [orderId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div>
      <PageHeader
        title={`Order #${order.id}`}
        description="View and manage order details"
        breadcrumbItems={[
          { label: 'Dashboard', path: '/admin/dashboard' },
          { label: 'Orders', path: '/admin/orders' },
          { label: `Order #${order.id}` },
        ]}
        actions={
          <Link
            to="/admin/orders"
            className="btn btn-secondary flex items-center"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Orders
          </Link>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Order Summary */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <div className="flex-shrink-0 h-16 w-16 bg-gray-100 rounded-md overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-sm font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Information */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Order Information</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <Package size={16} className="text-gray-400 mr-2" />
                <span className="text-sm">#{order.id}</span>
              </div>
              <div className="flex items-center">
                <User size={16} className="text-gray-400 mr-2" />
                <span className="text-sm">{order.customerName}</span>
              </div>
              <div className="flex items-center">
                <Calendar size={16} className="text-gray-400 mr-2" />
                <span className="text-sm">
                  {new Date(order.orderDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center">
                <DollarSign size={16} className="text-gray-400 mr-2" />
                <span className="text-sm">{order.paymentMethod}</span>
              </div>
              <div className="flex items-center">
                <ShoppingBag size={16} className="text-gray-400 mr-2" />
                <span className="text-sm">{order.shippingAddress}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Order Status</h2>
            <select
              value={order.status}
              onChange={(e) => {
                // In a real app, this would update the order status via API
                console.log('Update status to:', e.target.value);
              }}
              className="w-full p-2 border rounded-md"
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage; 