import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Users } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import DataTable from '../../components/ui/DataTable';
import { Service } from '../../types';
import { services } from '../../data/services';

const ServicesPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [allServices, setAllServices] = useState<Service[]>([]);
  
  useEffect(() => {
    // Simulating API call to fetch services
    const timer = setTimeout(() => {
      setAllServices(services);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // DataTable columns definition
  const columns = [
    {
      header: 'Service',
      accessor: (service: Service) => service,
      cell: (service: Service) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-md overflow-hidden">
            <img
              src={service.imageUrl}
              alt={service.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{service.name}</div>
            <div className="text-sm text-gray-500">{service.id}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Category',
      accessor: 'category',
      cell: (service: Service) => (
        <div>
          <div className="text-sm font-medium">{service.category}</div>
          <div className="text-xs text-gray-500">{service.subcategory}</div>
        </div>
      ),
    },
    {
      header: 'Providers',
      accessor: 'providerCount',
      sortable: true,
      cell: (service: Service) => (
        <div className="flex items-center">
          <Users size={16} className="text-gray-400 mr-1" />
          <span>{service.providerCount} providers</span>
        </div>
      ),
    },
    {
      header: 'Description',
      accessor: 'description',
      cell: (service: Service) => (
        <div className="max-w-md">
          <div className="text-sm text-gray-500 truncate">{service.description}</div>
        </div>
      ),
    },
    {
      header: 'Actions',
      accessor: (service: Service) => service,
      cell: (service: Service) => (
        <div className="flex space-x-2">
          <Link
            to={`/admin/services/edit/${service.id}`}
            className="text-blue-600 hover:text-blue-800"
            title="Edit service"
          >
            <Edit size={18} />
          </Link>
          <button
            className="text-red-600 hover:text-red-800"
            title="Delete service"
            onClick={() => handleDeleteService(service.id)}
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];
  
  const handleDeleteService = (id: string) => {
    // In a real application, you would call an API to delete the service
    if (window.confirm('Are you sure you want to delete this service?')) {
      setAllServices(allServices.filter(service => service.id !== id));
    }
  };

  return (
    <div>
      <PageHeader
        title="Services"
        description="Manage construction services"
        breadcrumbItems={[
          { label: 'Dashboard', path: '/admin/dashboard' },
          { label: 'Services' },
        ]}
        actions={
          <Link
            to="/admin/services/new"
            className="btn btn-primary flex items-center"
          >
            <Plus size={16} className="mr-1" />
            Add Service
          </Link>
        }
      />

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <DataTable<Service>
          data={allServices}
          columns={columns}
          keyField="id"
          loading={loading}
          emptyMessage="No services found. Add your first service to get started."
        />
      </div>
    </div>
  );
};

export default ServicesPage;