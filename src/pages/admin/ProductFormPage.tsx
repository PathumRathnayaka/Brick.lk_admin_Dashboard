import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Upload, Trash2 } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import { Product } from '../../types';
import { getProductById } from '../../data/products';
import { categories } from '../../data/categories';
import { brands } from '../../data/brands';

const ProductFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    category: '',
    subcategory: '',
    brand: '',
    stock: 0,
    rating: 0,
  });
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [availableSubcategories, setAvailableSubcategories] = useState<any[]>([]);
  
  useEffect(() => {
    if (isEditMode && id) {
      // In a real app, fetch product data from API
      const productData = getProductById(id);
      if (productData) {
        setFormData(productData);
        setSelectedCategory(
          categories.find(c => c.name === productData.category)?.id || null
        );
      } else {
        setError('Product not found');
      }
    }
    setLoading(false);
  }, [id, isEditMode]);
  
  useEffect(() => {
    if (selectedCategory) {
      const category = categories.find(c => c.id === selectedCategory);
      if (category) {
        setAvailableSubcategories(category.subcategories);
        
        // If we're not in edit mode, or if we're switching categories, reset subcategory
        if (!isEditMode || category.name !== formData.category) {
          setFormData(prev => ({
            ...prev,
            category: category.name,
            subcategory: '',
          }));
        }
      }
    }
  }, [selectedCategory, isEditMode, formData.category]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle numeric inputs
    if (name === 'price' || name === 'stock') {
      setFormData({
        ...formData,
        [name]: parseFloat(value) || 0,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    
    try {
      // Validate form
      if (!formData.name?.trim() || !formData.category || !formData.brand) {
        throw new Error('Please fill all required fields');
      }
      
      // In a real app, you would submit to an API
      console.log('Submitting product data:', formData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success
      navigate('/admin/products');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-orange-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={isEditMode ? 'Edit Product' : 'Add New Product'}
        description={isEditMode ? 'Update product information' : 'Create a new product listing'}
        breadcrumbItems={[
          { label: 'Dashboard', path: '/admin/dashboard' },
          { label: 'Products', path: '/admin/products' },
          { label: isEditMode ? 'Edit Product' : 'Add Product' },
        ]}
        actions={
          <button
            onClick={() => navigate('/admin/products')}
            className="btn btn-secondary flex items-center"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Products
          </button>
        }
      />

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {error && (
          <div className="bg-red-50 p-4 border-l-4 border-red-500 mb-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Trash2 className="h-5 w-5 text-red-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="form-label">
                      Product Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="form-label">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      className="form-input"
                      required
                    ></textarea>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="price" className="form-label">
                        Price (Rs.) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        min="0"
                        step="0.01"
                        className="form-input"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="stock" className="form-label">
                        Stock Quantity <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        id="stock"
                        name="stock"
                        value={formData.stock}
                        onChange={handleInputChange}
                        min="0"
                        className="form-input"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Classification */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Classification</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="category" className="form-label">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={selectedCategory || ''}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="form-select"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="subcategory" className="form-label">
                      Subcategory
                    </label>
                    <select
                      id="subcategory"
                      name="subcategory"
                      value={formData.subcategory || ''}
                      onChange={handleInputChange}
                      className="form-select"
                      disabled={!selectedCategory}
                    >
                      <option value="">Select a subcategory</option>
                      {availableSubcategories.map((subcategory) => (
                        <option key={subcategory.id} value={subcategory.name}>
                          {subcategory.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="brand" className="form-label">
                      Brand <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="brand"
                      name="brand"
                      value={formData.brand || ''}
                      onChange={handleInputChange}
                      className="form-select"
                      required
                    >
                      <option value="">Select a brand</option>
                      {brands.map((brand) => (
                        <option key={brand.id} value={brand.name}>
                          {brand.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Media */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Media</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="form-label">
                    Product Image <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6 bg-gray-50">
                    {formData.imageUrl ? (
                      <div className="relative w-full">
                        <img
                          src={formData.imageUrl}
                          alt="Product preview"
                          className="w-full h-48 object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, imageUrl: '' })}
                          className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex flex-col items-center justify-center">
                          <Upload className="h-12 w-12 text-gray-400" />
                          <p className="mt-2 text-sm text-gray-600">
                            Drag & drop a file or click to browse
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            PNG, JPG up to 5MB
                          </p>
                        </div>
                        <input
                          type="text"
                          id="imageUrl"
                          name="imageUrl"
                          placeholder="Or enter image URL"
                          value={formData.imageUrl || ''}
                          onChange={handleInputChange}
                          className="form-input mt-4"
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-5 border-t border-gray-200 flex justify-between">
            <button
              type="button"
              onClick={() => navigate('/admin/products')}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary flex items-center"
              disabled={saving}
            >
              {saving ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} className="mr-1" />
                  {isEditMode ? 'Update Product' : 'Create Product'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormPage;