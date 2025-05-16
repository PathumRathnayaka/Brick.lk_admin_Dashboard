import React, { useState } from 'react';
import { Save } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';

const SettingsPage: React.FC = () => {
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    siteName: 'Brick.lk',
    siteEmail: 'admin@brick.lk',
    enableNotifications: true,
    emailNotifications: true,
    darkMode: false,
    language: 'en',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success
      setSaving(false);
    } catch (error) {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <div>
      <PageHeader
        title="Settings"
        description="Manage your application settings and preferences"
        breadcrumbItems={[
          { label: 'Dashboard', path: '/admin/dashboard' },
          { label: 'Settings' },
        ]}
      />

      <div className="bg-white rounded-lg shadow-sm">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* General Settings */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">General Settings</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="siteName" className="form-label">
                  Site Name
                </label>
                <input
                  type="text"
                  id="siteName"
                  name="siteName"
                  value={settings.siteName}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              
              <div>
                <label htmlFor="siteEmail" className="form-label">
                  Site Email
                </label>
                <input
                  type="email"
                  id="siteEmail"
                  name="siteEmail"
                  value={settings.siteEmail}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              
              <div>
                <label htmlFor="language" className="form-label">
                  Language
                </label>
                <select
                  id="language"
                  name="language"
                  value={settings.language}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="en">English</option>
                  <option value="si">සිංහල</option>
                  <option value="ta">தமிழ்</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="enableNotifications"
                  name="enableNotifications"
                  checked={settings.enableNotifications}
                  onChange={handleChange}
                  className="form-checkbox"
                />
                <label htmlFor="enableNotifications" className="ml-2 block text-sm text-gray-900">
                  Enable Push Notifications
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="emailNotifications"
                  name="emailNotifications"
                  checked={settings.emailNotifications}
                  onChange={handleChange}
                  className="form-checkbox"
                />
                <label htmlFor="emailNotifications" className="ml-2 block text-sm text-gray-900">
                  Enable Email Notifications
                </label>
              </div>
            </div>
          </div>

          {/* Appearance Settings */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Appearance</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="darkMode"
                  name="darkMode"
                  checked={settings.darkMode}
                  onChange={handleChange}
                  className="form-checkbox"
                />
                <label htmlFor="darkMode" className="ml-2 block text-sm text-gray-900">
                  Enable Dark Mode
                </label>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-5 border-t border-gray-200">
            <div className="flex justify-end">
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
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;