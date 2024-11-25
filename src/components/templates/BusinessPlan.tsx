import React, { useState } from 'react';
import { ChevronLeft, Save, Edit2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const BusinessPlan: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="bg-white min-h-screen text-navy-blue">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Link to="/road-map" className="mr-4 text-navy-blue">
              <ChevronLeft size={24} />
            </Link>
            <h1 className="text-3xl font-bold text-navy-blue">Business Plan</h1>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-navy-blue text-white px-4 py-2 rounded-full flex items-center"
          >
            {isEditing ? <Save size={20} className="mr-2" /> : <Edit2 size={20} className="mr-2" />}
            {isEditing ? 'Save Changes' : 'Edit Plan'}
          </button>
        </div>
        
        <div className="bg-gray-100 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
          <p>The Business Plan template is under development.</p>
        </div>
      </div>
    </div>
  );
};

export default BusinessPlan;