import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Package } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import DataTable from '../../components/ui/DataTable';
import { Product } from '../../types';
import { products } from '../../data/products';

const ProductsPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  
  const itemsPerPage = 10;
  
  useEffect(() => {
    // Simulating API call to fetch products
    const timer = setTimeout(() => {
      setAllProducts(products);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };
  
  // Filter products based on search query
  const filteredProducts = searchQuery
    ? allProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allProducts;
  
  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // DataTable columns definition
  const columns = [
    {
      header: 'Product',
      accessor: (product: Product) => product,
      cell: (product: Product) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-md overflow-hidden">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{product.name}</div>
            <div className="text-sm text-gray-500">{product.id}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Category',
      accessor: 'category',
      cell: (product: Product) => (
        <div>
          <div className="text-sm font-medium">{product.category}</div>
          <div className="text-xs text-gray-500">{product.subcategory}</div>
        </div>
      ),
    },
    {
      header: 'Brand',
      accessor: 'brand',
      sortable: true,
    },
    {
      header: 'Price',
      accessor: 'price',
      sortable: true,
      cell: (product: Product) => (
        <div className="text-sm font-medium">
          Rs. {product.price.toLocaleString()}
        </div>
      ),
    },
    {
      header: 'Stock',
      accessor: 'stock',
      sortable: true,
      cell: (product: Product) => (
        <div className="flex items-center">
          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
            product.stock > 20
              ? 'bg-green-100 text-green-800'
              : product.stock > 0
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </span>
        </div>
      ),
    },
    {
      header: 'Actions',
      accessor: (product: Product) => product,
      cell: (product: Product) => (
        <div className="flex space-x-2">
          <Link
            to={`/admin/products/edit/${product.id}`}
            className="text-blue-600 hover:text-blue-800"
            title="Edit product"
          >
            <Edit size={18} />
          </Link>
          <button
            className="text-red-600 hover:text-red-800"
            title="Delete product"
            onClick={() => handleDeleteProduct(product.id)}
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];
  
  const handleDeleteProduct = (id: string) => {
    // In a real application, you would call an API to delete the product
    if (window.confirm('Are you sure you want to delete this product?')) {
      setAllProducts(allProducts.filter(product => product.id !== id));
    }
  };

  return (
    <div>
      <PageHeader
        title="Products"
        description="Manage your product inventory"
        breadcrumbItems={[
          { label: 'Dashboard', path: '/admin/dashboard' },
          { label: 'Products' },
        ]}
        actions={
          <Link
            to="/admin/products/new"
            className="btn btn-primary flex items-center"
          >
            <Plus size={16} className="mr-1" />
            Add Product
          </Link>
        }
      />

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <DataTable<Product>
          data={paginatedProducts}
          columns={columns}
          keyField="id"
          loading={loading}
          pagination={{
            currentPage,
            totalPages,
            onPageChange: setCurrentPage,
          }}
          searchable
          onSearch={handleSearch}
          emptyMessage="No products found. Add your first product to get started."
        />
      </div>
    </div>
  );
};

export default ProductsPage;