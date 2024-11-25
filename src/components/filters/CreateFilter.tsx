import React, { useState } from 'react';
import { Filter, X, Video, Image as ImageIcon, Headphones, FileText } from 'lucide-react';

interface CreateFilterProps {
  onFilterChange: (filters: {
    contentType: string[];
    status: string[];
  }) => void;
}

const CreateFilter: React.FC<CreateFilterProps> = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    contentType: [] as string[],
    status: [] as string[]
  });

  const contentTypes = [
    { id: 'video', label: 'Video', icon: Video },
    { id: 'image', label: 'Image', icon: ImageIcon },
    { id: 'audio', label: 'Audio', icon: Headphones },
    { id: 'text', label: 'Text', icon: FileText }
  ];

  const statuses = ['draft', 'in-progress', 'review', 'published'];

  const handleFilterChange = (category: keyof typeof filters, value: string) => {
    const newFilters = { ...filters };
    const array = newFilters[category];
    
    if (array.includes(value)) {
      newFilters[category] = array.filter(item => item !== value);
    } else {
      newFilters[category] = [...array, value];
    }
    
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="fixed bottom-20 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-navy-blue text-white p-3 rounded-full shadow-lg transition-transform duration-300 hover:scale-110"
      >
        <Filter size={24} />
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl p-6 w-80">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Filter Content</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-2">Content Type</h4>
              {contentTypes.map(type => (
                <label
                  key={type.id}
                  className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.contentType.includes(type.id)}
                    onChange={() => handleFilterChange('contentType', type.id)}
                    className="form-checkbox h-4 w-4 text-navy-blue rounded border-gray-300 focus:ring-navy-blue"
                  />
                  <type.icon size={20} className="ml-2 mr-2 text-navy-blue" />
                  <span className="ml-2">{type.label}</span>
                </label>
              ))}
            </div>

            <div>
              <h4 className="font-semibold mb-2">Status</h4>
              {statuses.map(status => (
                <label
                  key={status}
                  className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.status.includes(status)}
                    onChange={() => handleFilterChange('status', status)}
                    className="form-checkbox h-4 w-4 text-navy-blue rounded border-gray-300 focus:ring-navy-blue"
                  />
                  <span className="ml-2 capitalize">{status}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateFilter;