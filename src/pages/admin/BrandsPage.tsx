import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Package } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import DataTable from '../../components/ui/DataTable';
import { Brand } from '../../types';
import { brands } from '../../data/brands';

const BrandsPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [allBrands, setAllBrands] = useState<Brand[]>([]);
  
  useEffect(() => {
    // Simulating API call to fetch brands
    const timer = setTimeout(() => {
      setAllBrands(brands);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // DataTable columns definition
  const columns = [
    {
      header: 'Brand',
      accessor: (brand: Brand) => brand,
      cell: (brand: Brand) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-md overflow-hidden">
            <img
              src={brand.logo}
              alt={brand.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{brand.name}</div>
            <div className="text-sm text-gray-500">{brand.id}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Products',
      accessor: 'productsCount',
      sortable: true,
      cell: (brand: Brand) => (
        <div className="flex items-center">
          <Package size={16} className="text-gray-400 mr-1" />
          <span>{brand.productsCount} products</span>
        </div>
      ),
    },
    {
      header: 'Description',
      accessor: 'description',
      cell: (brand: Brand) => (
        <div className="max-w-md">
          <div className="text-sm text-gray-500 truncate">{brand.description}</div>
        </div>
      ),
    },
    {
      header: 'Actions',
      accessor: (brand: Brand) => brand,
      cell: (brand: Brand) => (
        <div className="flex space-x-2">
          <Link
            to={`/admin/brands/edit/${brand.id}`}
            className="text-blue-600 hover:text-blue-800"
            title="Edit brand"
          >
            <Edit size={18} />
          </Link>
          <button
            className="text-red-600 hover:text-red-800"
            title="Delete brand"
            onClick={() => handleDeleteBrand(brand.id)}
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];
  
  const handleDeleteBrand = (id: string) => {
    // In a real application, you would call an API to delete the brand
    if (window.confirm('Are you sure you want to delete this brand?')) {
      setAllBrands(allBrands.filter(brand => brand.id !== id));
    }
  };

  return (
    <div>
      <PageHeader
        title="Brands"
        description="Manage product brands and manufacturers"
        breadcrumbItems={[
          { label: 'Dashboard', path: '/admin/dashboard' },
          { label: 'Brands' },
        ]}
        actions={
          <Link
            to="/admin/brands/new"
            className="btn btn-primary flex items-center"
          >
            <Plus size={16} className="mr-1" />
            Add Brand
          </Link>
        }
      />

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <DataTable<Brand>
          data={allBrands}
          columns={columns}
          keyField="id"
          loading={loading}
          emptyMessage="No brands found. Add your first brand to get started."
        />
      </div>
    </div>
  );
};

export default BrandsPage;