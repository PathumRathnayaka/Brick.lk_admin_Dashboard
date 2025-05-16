import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Upload, Trash2, Plus, X } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import { Category, SubCategory } from '../../types';
import { getCategory } from '../../data/categories';

const CategoryFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Partial<Category>>({
    name: '',
    imageUrl: '',
    subcategories: [],
  });
  
  // For managing subcategories in the form
  const [subcategories, setSubcategories] = useState<Partial<SubCategory>[]>([]);
  const [newSubcategory, setNewSubcategory] = useState<Partial<SubCategory>>({
    name: '',
    imageUrl: '',
  });
  
  useEffect(() => {
    if (isEditMode && id) {
      // In a real app, fetch category data from API
      const categoryData = getCategory(id);
      if (categoryData) {
        setFormData({
          id: categoryData.id,
          name: categoryData.name,
          imageUrl: categoryData.imageUrl,
        });
        setSubcategories(categoryData.subcategories);
      } else {
        setError('Category not found');
      }
    }
    setLoading(false);
  }, [id, isEditMode]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleNewSubcategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSubcategory({
      ...newSubcategory,
      [name]: value,
    });
  };
  
  const addSubcategory = () => {
    if (!newSubcategory.name?.trim()) {
      return;
    }
    
    const subcategoryId = newSubcategory.name
      .toLowerCase()
      .replace(/\s+/g, '-');
    
    const subcategoryToAdd = {
      ...newSubcategory,
      id: subcategoryId,
    };
    
    setSubcategories([...subcategories, subcategoryToAdd as SubCategory]);
    setNewSubcategory({ name: '', imageUrl: '' });
  };
  
  const removeSubcategory = (index: number) => {
    const updatedSubcategories = [...subcategories];
    updatedSubcategories.splice(index, 1);
    setSubcategories(updatedSubcategories);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    
    try {
      // Validate form
      if (!formData.name?.trim() || !formData.imageUrl?.trim()) {
        throw new Error('Please fill all required fields');
      }
      
      // Prepare data for submission
      const categoryId = isEditMode
        ? formData.id
        : formData.name?.toLowerCase().replace(/\s+/g, '-');
      
      const categoryData = {
        ...formData,
        id: categoryId,
        subcategories,
      };
      
      // In a real app, you would submit to an API
      console.log('Submitting category data:', categoryData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success
      navigate('/admin/categories');
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
        title={isEditMode ? 'Edit Category' : 'Add New Category'}
        description={isEditMode ? 'Update category information' : 'Create a new product category'}
        breadcrumbItems={[
          { label: 'Dashboard', path: '/admin/dashboard' },
          { label: 'Categories', path: '/admin/categories' },
          { label: isEditMode ? 'Edit Category' : 'Add Category' },
        ]}
        actions={
          <button
            onClick={() => navigate('/admin/categories')}
            className="btn btn-secondary flex items-center"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Categories
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
                      Category Name <span className="text-red-500">*</span>
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
                    <label htmlFor="imageUrl" className="form-label">
                      Category Image URL <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="imageUrl"
                      name="imageUrl"
                      value={formData.imageUrl}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="https://example.com/image.jpg"
                      required
                    />
                  </div>
                </div>
              </div>
              
              {/* Subcategories */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Subcategories</h2>
                
                {/* List of existing subcategories */}
                <div className="space-y-3 mb-4">
                  {subcategories.length === 0 ? (
                    <p className="text-gray-500 text-sm">No subcategories added yet.</p>
                  ) : (
                    subcategories.map((subcategory, index) => (
                      <div key={index} className="flex items-center bg-gray-50 p-3 rounded-md">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-md overflow-hidden mr-3">
                          {subcategory.imageUrl ? (
                            <img
                              src={subcategory.imageUrl}
                              alt={subcategory.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center bg-gray-200 text-gray-400">
                              <Upload size={16} />
                            </div>
                          )}
                        </div>
                        <div className="flex-grow">
                          <div className="font-medium">{subcategory.name}</div>
                          <div className="text-xs text-gray-500">
                            {subcategory.id}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeSubcategory(index)}
                          className="text-red-600 hover:text-red-800"
                          title="Remove subcategory"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
                
                {/* Add new subcategory */}
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Add New Subcategory</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-1">
                      <input
                        type="text"
                        name="name"
                        value={newSubcategory.name}
                        onChange={handleNewSubcategoryChange}
                        placeholder="Subcategory name"
                        className="form-input text-sm"
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <input
                        type="text"
                        name="imageUrl"
                        value={newSubcategory.imageUrl}
                        onChange={handleNewSubcategoryChange}
                        placeholder="Image URL (optional)"
                        className="form-input text-sm"
                      />
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={addSubcategory}
                        className="btn btn-primary text-sm h-full flex items-center justify-center w-full"
                        disabled={!newSubcategory.name?.trim()}
                      >
                        <Plus size={16} className="mr-1" />
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Preview */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Preview</h2>
              
              <div className="border border-gray-200 rounded-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                  {formData.imageUrl ? (
                    <img
                      src={formData.imageUrl}
                      alt={formData.name || 'Category preview'}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 flex items-center justify-center bg-gray-200 text-gray-400">
                      <Upload size={32} />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900">
                    {formData.name || 'Category Name'}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {subcategories.length} subcategories
                  </p>
                </div>
              </div>
              
              <div className="mt-4 text-sm text-gray-500">
                <p>This preview shows how the category will appear to customers.</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-5 border-t border-gray-200 flex justify-between">
            <button
              type="button"
              onClick={() => navigate('/admin/categories')}
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
                  {isEditMode ? 'Update Category' : 'Create Category'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryFormPage;