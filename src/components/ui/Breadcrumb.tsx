import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex mb-5" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        <li className="inline-flex items-center">
          <Link
            to="/admin/dashboard"
            className="inline-flex items-center text-sm text-gray-500 hover:text-orange-600"
          >
            <Home className="mr-2 h-4 w-4" />
            Dashboard
          </Link>
        </li>
        
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight className="h-4 w-4 text-gray-400" />
            {index === items.length - 1 || !item.path ? (
              <span className="ml-1 text-sm font-medium text-gray-700 md:ml-2">
                {item.label}
              </span>
            ) : (
              <Link
                to={item.path}
                className="ml-1 text-sm text-gray-500 hover:text-orange-600 md:ml-2"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;