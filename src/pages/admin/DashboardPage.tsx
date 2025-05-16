import React, { useEffect, useState } from 'react';
import { 
  BarChart3, 
  ShoppingBag, 
  Users, 
  Package, 
  Truck, 
  Calendar, 
  TrendingUp, 
  TrendingDown,
  Clock,
  DollarSign
} from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/ui/PageHeader';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Dummy data for charts and stats
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Sales 2025',
        data: [32500, 36000, 28000, 43000, 38500, 42000, 48000, 52000, 47000, 53000, 58000, 63000],
        borderColor: '#ea580c',
        backgroundColor: 'rgba(234, 88, 12, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Sales 2024',
        data: [28000, 32000, 24000, 37000, 34000, 36000, 42000, 45000, 40000, 46000, 50000, 54000],
        borderColor: '#94a3b8',
        backgroundColor: 'rgba(148, 163, 184, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const categoryData = {
    labels: ['Building Materials', 'Electrical', 'Plumbing', 'Finishing', 'Tools'],
    datasets: [
      {
        label: 'Sales by Category',
        data: [53000, 37000, 28000, 42000, 16000],
        backgroundColor: [
          'rgba(234, 88, 12, 0.8)',
          'rgba(234, 88, 12, 0.6)',
          'rgba(234, 88, 12, 0.4)',
          'rgba(234, 88, 12, 0.3)',
          'rgba(234, 88, 12, 0.2)',
        ],
        borderWidth: 0,
      },
    ],
  };

  const stats = {
    totalSales: 'Rs. 1,245,600',
    salesChange: '+12.5%',
    totalOrders: 854,
    ordersChange: '+8.2%',
    totalCustomers: 1215,
    customersChange: '+15.3%',
    totalProducts: 567,
    productsChange: '+5.7%',
  };

  const recentOrders = [
    { id: 'ORD-0085', customer: 'Sarath Fernando', date: '2025-06-12', amount: 'Rs. 15,750', status: 'pending' },
    { id: 'ORD-0084', customer: 'Kumari Silva', date: '2025-06-11', amount: 'Rs. 24,300', status: 'processing' },
    { id: 'ORD-0083', customer: 'Nimal Perera', date: '2025-06-10', amount: 'Rs. 8,500', status: 'delivered' },
    { id: 'ORD-0082', customer: 'Amali Gunawardena', date: '2025-06-10', amount: 'Rs. 32,100', status: 'shipped' },
    { id: 'ORD-0081', customer: 'Ranjan Jayasinghe', date: '2025-06-09', amount: 'Rs. 12,850', status: 'delivered' },
  ];

  const lowStockProducts = [
    { id: 'P-0156', name: 'Premium Cement Bag (50kg)', stock: 12, threshold: 20 },
    { id: 'P-0284', name: 'Construction Sand (Cubic Meter)', stock: 8, threshold: 15 },
    { id: 'P-0112', name: 'Dulux Weather Shield Paint (4L)', stock: 5, threshold: 10 },
    { id: 'P-0327', name: 'Steel Reinforcement Bar (12mm)', stock: 25, threshold: 30 },
  ];

  return (
    <div>
      <PageHeader 
        title="Dashboard" 
        description="Overview of your business performance and statistics"
        breadcrumbItems={[{ label: 'Dashboard' }]}
      />

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-orange-600 rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Total Sales</p>
                  <h3 className="text-2xl font-bold text-gray-800">{stats.totalSales}</h3>
                  <div className="flex items-center mt-2">
                    <span className={`text-sm font-medium flex items-center ${stats.salesChange.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stats.salesChange.startsWith('+') ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
                      {stats.salesChange}
                    </span>
                    <span className="text-gray-500 text-xs ml-1">vs last month</span>
                  </div>
                </div>
                <div className="bg-orange-100 rounded-lg p-2">
                  <DollarSign size={24} className="text-orange-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Total Orders</p>
                  <h3 className="text-2xl font-bold text-gray-800">{stats.totalOrders}</h3>
                  <div className="flex items-center mt-2">
                    <span className={`text-sm font-medium flex items-center ${stats.ordersChange.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stats.ordersChange.startsWith('+') ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
                      {stats.ordersChange}
                    </span>
                    <span className="text-gray-500 text-xs ml-1">vs last month</span>
                  </div>
                </div>
                <div className="bg-blue-100 rounded-lg p-2">
                  <ShoppingBag size={24} className="text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Total Customers</p>
                  <h3 className="text-2xl font-bold text-gray-800">{stats.totalCustomers}</h3>
                  <div className="flex items-center mt-2">
                    <span className={`text-sm font-medium flex items-center ${stats.customersChange.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stats.customersChange.startsWith('+') ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
                      {stats.customersChange}
                    </span>
                    <span className="text-gray-500 text-xs ml-1">vs last month</span>
                  </div>
                </div>
                <div className="bg-green-100 rounded-lg p-2">
                  <Users size={24} className="text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Total Products</p>
                  <h3 className="text-2xl font-bold text-gray-800">{stats.totalProducts}</h3>
                  <div className="flex items-center mt-2">
                    <span className={`text-sm font-medium flex items-center ${stats.productsChange.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stats.productsChange.startsWith('+') ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
                      {stats.productsChange}
                    </span>
                    <span className="text-gray-500 text-xs ml-1">vs last month</span>
                  </div>
                </div>
                <div className="bg-purple-100 rounded-lg p-2">
                  <Package size={24} className="text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Sales Overview</h3>
              <Line 
                data={salesData} 
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                      },
                    },
                    x: {
                      grid: {
                        display: false,
                      },
                    },
                  },
                }} 
              />
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Sales by Category</h3>
              <Bar 
                data={categoryData} 
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                      },
                    },
                    x: {
                      grid: {
                        display: false,
                      },
                    },
                  },
                }} 
              />
            </div>
          </div>

          {/* Recent Orders & Low Stock */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
                <Link to="/admin/orders" className="text-sm text-orange-600 hover:text-orange-700 font-medium">View All</Link>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Link to={`/admin/orders/${order.id}`} className="text-orange-600 hover:text-orange-700 font-medium">
                            {order.id}
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{order.customer}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Calendar size={14} className="text-gray-500 mr-1" />
                            {order.date}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium">{order.amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : ''}
                            ${order.status === 'shipped' ? 'bg-blue-100 text-blue-800' : ''}
                            ${order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' : ''}
                            ${order.status === 'pending' ? 'bg-gray-100 text-gray-800' : ''}
                          `}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">Low Stock Products</h3>
                <Link to="/admin/products" className="text-sm text-orange-600 hover:text-orange-700 font-medium">View All</Link>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {lowStockProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap font-medium">{product.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Link to={`/admin/products/edit/${product.id}`} className="text-gray-800 hover:text-orange-600">
                            {product.name}
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Package size={14} className="text-gray-500 mr-1" />
                            {product.stock} items
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${product.stock <= product.threshold / 2 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {product.stock <= product.threshold / 2 ? 'Critical' : 'Low Stock'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Link to="/admin/products/new" className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg flex flex-col items-center justify-center text-center transition-colors">
                <Package size={24} className="text-orange-600 mb-2" />
                <span className="font-medium">Add New Product</span>
              </Link>
              <Link to="/admin/categories/new" className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg flex flex-col items-center justify-center text-center transition-colors">
                <BarChart3 size={24} className="text-orange-600 mb-2" />
                <span className="font-medium">Add New Category</span>
              </Link>
              <Link to="/admin/users" className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg flex flex-col items-center justify-center text-center transition-colors">
                <Users size={24} className="text-orange-600 mb-2" />
                <span className="font-medium">Manage Users</span>
              </Link>
              <Link to="/admin/orders" className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg flex flex-col items-center justify-center text-center transition-colors">
                <Truck size={24} className="text-orange-600 mb-2" />
                <span className="font-medium">View Orders</span>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardPage;