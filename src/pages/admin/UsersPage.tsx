import React, { useState, useEffect } from 'react';
import { Users, UserPlus, Edit, Trash2, Mail } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import DataTable from '../../components/ui/DataTable';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  lastLogin: string;
  status: 'active' | 'inactive';
}

const UsersPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Simulating API call to fetch users
    const timer = setTimeout(() => {
      setUsers([
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          role: 'Admin',
          lastLogin: '2024-01-20T10:00:00Z',
          status: 'active'
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          role: 'Manager',
          lastLogin: '2024-01-19T15:30:00Z',
          status: 'active'
        }
      ]);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const columns = [
    {
      header: 'User',
      accessor: (user: User) => user,
      cell: (user: User) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
            <Users size={20} className="text-gray-500" />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{user.name}</div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Role',
      accessor: 'role',
      cell: (user: User) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {user.role}
        </span>
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (user: User) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          user.status === 'active' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
        </span>
      ),
    },
    {
      header: 'Last Login',
      accessor: 'lastLogin',
      cell: (user: User) => (
        <span className="text-sm text-gray-500">
          {new Date(user.lastLogin).toLocaleDateString()}
        </span>
      ),
    },
    {
      header: 'Actions',
      accessor: (user: User) => user,
      cell: (user: User) => (
        <div className="flex space-x-2">
          <button
            className="text-blue-600 hover:text-blue-800"
            title="Edit user"
            onClick={() => handleEditUser(user.id)}
          >
            <Edit size={18} />
          </button>
          <button
            className="text-gray-600 hover:text-gray-800"
            title="Send email"
            onClick={() => handleSendEmail(user.email)}
          >
            <Mail size={18} />
          </button>
          <button
            className="text-red-600 hover:text-red-800"
            title="Delete user"
            onClick={() => handleDeleteUser(user.id)}
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  const handleEditUser = (id: string) => {
    console.log('Edit user:', id);
  };

  const handleSendEmail = (email: string) => {
    console.log('Send email to:', email);
  };

  const handleDeleteUser = (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  return (
    <div>
      <PageHeader
        title="Users"
        description="Manage system users and their permissions"
        breadcrumbItems={[
          { label: 'Dashboard', path: '/admin/dashboard' },
          { label: 'Users' },
        ]}
        actions={
          <button className="btn btn-primary flex items-center">
            <UserPlus size={16} className="mr-1" />
            Add User
          </button>
        }
      />

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <DataTable<User>
          data={users}
          columns={columns}
          keyField="id"
          loading={loading}
          emptyMessage="No users found. Add your first user to get started."
        />
      </div>
    </div>
  );
};

export default UsersPage;