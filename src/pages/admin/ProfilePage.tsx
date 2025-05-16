import React from 'react';
import PageHeader from '../../components/ui/PageHeader';

const ProfilePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Profile"
        description="Manage your account settings and preferences"
      />
      
      <div className="bg-white rounded-lg shadow p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
        {/* Profile content will be implemented later */}
        <p className="text-gray-600">Profile settings coming soon...</p>
      </div>
    </div>
  );
};

export default ProfilePage;