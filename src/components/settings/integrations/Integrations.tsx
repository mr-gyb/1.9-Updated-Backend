import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import IntegrationsGrid from './IntegrationsGrid';

const Integrations: React.FC = () => {
  return (
    <div className="bg-white min-h-screen text-navy-blue">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <Link to="/settings" className="mr-4 text-navy-blue">
            <ChevronLeft size={24} />
          </Link>
          <h1 className="text-3xl font-bold text-navy-blue">Integrations</h1>
        </div>
        <p className="text-gray-600 mb-8">
          Connect your favorite tools and services to enhance your workflow.
        </p>
        <IntegrationsGrid />
      </div>
    </div>
  );
};

export default Integrations;