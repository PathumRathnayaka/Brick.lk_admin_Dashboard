import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, FolderPlus, Grid } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import DataTable from '../../components/ui/DataTable';
import { Category } from '../../types';
import { categories } from '../../data/categories';

const CategoriesPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  
  useEffect(() => {
    // Simulating API call to fetch categories
    const timer = setTimeout(() => {
      setAllCategories(categories);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Calculate total products in each category
  // In a real app, this would come from the API
  const getCategoryProductCount = (category: Category) => {
    // Placeholder implementation
    return Math.floor(Math.random() * 100) + 10;
  };
  
  // DataTable columns definition
  const columns = [
    {
      header: 'Category',
      accessor: (category: Category) => category,
      cell: (category: Category) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-md overflow-hidden">
            <img
              src={category.imageUrl}
              alt={category.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{category.name}</div>
            <div className="text-sm text-gray-500">{category.id}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Subcategories',
      accessor: (category: Category) => category.subcategories.length,
      cell: (category: Category) => (
        <div className="flex items-center">
          <Grid size={16} className="text-gray-400 mr-1" />
          <span>{category.subcategories.length} subcategories</span>
        </div>
      ),
    },
    {
      header: 'Products',
      accessor: (category: Category) => getCategoryProductCount(category),
      cell: (category: Category) => getCategoryProductCount(category),
      sortable: true,
    },
    {
      header: 'Actions',
      accessor: (category: Category) => category,
      cell: (category: Category) => (
        <div className="flex space-x-2">
          <Link
            to={`/admin/categories/edit/${category.id}`}
            className="text-blue-600 hover:text-blue-800"
            title="Edit category"
          >
            <Edit size={18} />
          </Link>
          <button
            className="text-orange-600 hover:text-orange-800"
            title="Add subcategory"
            onClick={() => handleAddSubcategory(category.id)}
          >
            <FolderPlus size={18} />
          </button>
          <button
            className="text-red-600 hover:text-red-800"
            title="Delete category"
            onClick={() => handleDeleteCategory(category.id)}
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];
  
  const handleAddSubcategory = (categoryId: string) => {
    // In a real app, navigate to a form or open a modal
    console.log(`Add subcategory to ${categoryId}`);
  };
  
  const handleDeleteCategory = (id: string) => {
    // In a real application, you would call an API to delete the category
    if (window.confirm('Are you sure you want to delete this category? This will also delete all subcategories.')) {
      setAllCategories(allCategories.filter(category => category.id !== id));
    }
  };

  return (
    <div>
      <PageHeader
        title="Categories"
        description="Manage product categories and subcategories"
        breadcrumbItems={[
          { label: 'Dashboard', path: '/admin/dashboard' },
          { label: 'Categories' },
        ]}
        actions={
          <Link
            to="/admin/categories/new"
            className="btn btn-primary flex items-center"
          >
            <Plus size={16} className="mr-1" />
            Add Category
          </Link>
        }
      />

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <DataTable<Category>
          data={allCategories}
          columns={columns}
          keyField="id"
          loading={loading}
          emptyMessage="No categories found. Add your first category to get started."
        />
      </div>
    </div>
  );
};

export default CategoriesPage;