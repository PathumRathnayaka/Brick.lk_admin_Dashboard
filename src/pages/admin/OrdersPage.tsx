import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Eye } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import DataTable from '../../components/ui/DataTable';

interface Order {
  id: string;
  customerName: string;
  orderDate: string;
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  items: number;
}

const OrdersPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Simulating API call to fetch orders
    const timer = setTimeout(() => {
      setOrders([
        {
          id: 'ORD001',
          customerName: 'John Doe',
          orderDate: '2024-01-20T10:00:00Z',
          total: 1250.00,
          status: 'pending',
          items: 3
        },
        {
          id: 'ORD002',
          customerName: 'Jane Smith',
          orderDate: '2024-01-19T15:30:00Z',
          total: 850.50,
          status: 'completed',
          items: 2
        }
      ]);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const columns = [
    {
      header: 'Order',
      accessor: (order: Order) => order,
      cell: (order: Order) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
            <Package size={20} className="text-gray-500" />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">#{order.id}</div>
            <div className="text-sm text-gray-500">{order.customerName}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Date',
      accessor: 'orderDate',
      cell: (order: Order) => (
        <span className="text-sm text-gray-500">
          {new Date(order.orderDate).toLocaleDateString()}
        </span>
      ),
    },
    {
      header: 'Total',
      accessor: 'total',
      cell: (order: Order) => (
        <span className="text-sm font-medium">
          ${order.total.toFixed(2)}
        </span>
      ),
    },
    {
      header: 'Items',
      accessor: 'items',
      cell: (order: Order) => (
        <span className="text-sm text-gray-500">
          {order.items} items
        </span>
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (order: Order) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          order.status === 'completed' 
            ? 'bg-green-100 text-green-800'
            : order.status === 'processing'
            ? 'bg-blue-100 text-blue-800'
            : order.status === 'cancelled'
            ? 'bg-red-100 text-red-800'
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </span>
      ),
    },
    {
      header: 'Actions',
      accessor: (order: Order) => order,
      cell: (order: Order) => (
        <div className="flex space-x-2">
          <Link
            to={`/admin/orders/${order.id}`}
            className="text-blue-600 hover:text-blue-800"
            title="View order details"
          >
            <Eye size={18} />
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Orders"
        description="Manage customer orders and track their status"
        breadcrumbItems={[
          { label: 'Dashboard', path: '/admin/dashboard' },
          { label: 'Orders' },
        ]}
      />

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <DataTable<Order>
          data={orders}
          columns={columns}
          keyField="id"
          loading={loading}
          emptyMessage="No orders found."
        />
      </div>
    </div>
  );
};

export default OrdersPage; 