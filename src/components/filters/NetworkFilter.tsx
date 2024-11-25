import React, { useState, useCallback } from 'react';
import { Filter, X, MapPin, Users, Star } from 'lucide-react';

interface NetworkFilterProps {
  onFilterChange: (filters: {
    experience: string[];
    rating: number | null;
    location: string[];
  }) => void;
}

const NetworkFilter: React.FC<NetworkFilterProps> = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    experience: [] as string[],
    rating: null as number | null,
    location: [] as string[]
  });

  const experienceLevels = ['beginner', 'intermediate', 'proficient', 'advanced', 'expert'];
  const locations = ['Remote', 'Local', 'International'];

  // Memoize the filter change handler
  const handleFilterChange = useCallback((category: keyof typeof filters, value: any) => {
    setFilters(prevFilters => {
      const newFilters = { ...prevFilters };
      
      if (category === 'rating') {
        newFilters.rating = newFilters.rating === value ? null : value;
      } else {
        const array = newFilters[category] as string[];
        if (array.includes(value)) {
          newFilters[category] = array.filter(item => item !== value);
        } else {
          newFilters[category] = [...array, value];
        }
      }
      
      // Call onFilterChange with the new filters
      onFilterChange(newFilters);
      return newFilters;
    });
  }, [onFilterChange]);

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
            <h3 className="font-bold text-lg">Filter Network</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-2 flex items-center">
                <Users size={18} className="mr-2" />
                Experience Level
              </h4>
              {experienceLevels.map(level => (
                <label
                  key={level}
                  className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.experience.includes(level)}
                    onChange={() => handleFilterChange('experience', level)}
                    className="form-checkbox h-4 w-4 text-navy-blue rounded border-gray-300 focus:ring-navy-blue"
                  />
                  <span className="ml-2 capitalize">{level}</span>
                </label>
              ))}
            </div>

            <div>
              <h4 className="font-semibold mb-2 flex items-center">
                <Star size={18} className="mr-2" />
                Minimum Rating
              </h4>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map(rating => (
                  <button
                    key={rating}
                    onClick={() => handleFilterChange('rating', rating)}
                    className={`flex items-center w-full p-2 rounded transition-colors ${
                      filters.rating === rating ? 'bg-navy-blue text-white' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex">
                      {[...Array(rating)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={filters.rating === rating ? 'fill-current' : 'text-yellow-400 fill-current'}
                        />
                      ))}
                    </div>
                    <span className="ml-2">& Up</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2 flex items-center">
                <MapPin size={18} className="mr-2" />
                Location
              </h4>
              {locations.map(location => (
                <label
                  key={location}
                  className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.location.includes(location)}
                    onChange={() => handleFilterChange('location', location)}
                    className="form-checkbox h-4 w-4 text-navy-blue rounded border-gray-300 focus:ring-navy-blue"
                  />
                  <span className="ml-2">{location}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NetworkFilter;