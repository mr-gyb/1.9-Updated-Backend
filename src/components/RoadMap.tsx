import React, { useState } from 'react';
import { ChevronLeft, Plus, X, Globe, MessageCircle, DollarSign, FileText, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Section {
  title: string;
  color: string;
  icon: React.ElementType;
  items: string[];
}

const RoadMap: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const sections: Record<string, Section> = {
    culture: {
      title: 'CULTURE',
      color: 'bg-navy-blue',
      icon: Globe,
      items: [
        'Vision and mission statements',
        'Core values and brand personality',
        'Logo, brand colors, and overall aesthetic',
        'Defined target audience and ideal customer profile'
      ]
    },
    content: {
      title: 'CONTENT',
      color: 'bg-gold',
      icon: FileText,
      items: [
        'Consistent messaging across channels',
        'Educational and problem-solving media',
        'Engaging storytelling and brand voice',
        'Strategic content calendar for audience needs'
      ]
    },
    community: {
      title: 'COMMUNITY',
      color: 'bg-navy-blue',
      icon: MessageCircle,
      items: [
        'Interactive spaces (forums, events)',
        'Gamification and feedback loops',
        'Member engagement strategies',
        'Community guidelines and moderation'
      ]
    },
    commerce: {
      title: 'COMMERCE',
      color: 'bg-gold',
      icon: DollarSign,
      items: [
        'Sales funnels',
        'Advertising strategies',
        'Automation systems',
        'Analytics and reporting'
      ]
    }
  };

  const handleSectionClick = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="bg-white min-h-screen text-navy-blue">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <Link to="/dashboard" className="mr-4 text-navy-blue">
            <ChevronLeft size={24} />
          </Link>
          <h1 className="text-3xl font-bold text-navy-blue">4Cs = Profit Off Passion Journey</h1>
        </div>

        <div className="space-y-8">
          {Object.entries(sections).map(([key, section]) => (
            <div
              key={key}
              className={`transform transition-all duration-300 ${
                expandedSection === key ? 'scale-105' : ''
              }`}
            >
              <div
                className={`${section.color} text-white p-6 rounded-lg shadow-lg cursor-pointer hover:opacity-90 transition-opacity`}
                onClick={() => handleSectionClick(key)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <section.icon className="h-6 w-6" />
                    <h2 className="text-2xl font-bold">{section.title}</h2>
                  </div>
                  {expandedSection === key ? (
                    <X size={24} />
                  ) : (
                    <Plus size={24} />
                  )}
                </div>

                {expandedSection === key && (
                  <div className="mt-4 space-y-2 text-sm">
                    {section.items.map((item, index) => (
                      <div
                        key={index}
                        className="bg-white bg-opacity-10 p-3 rounded-lg flex items-center space-x-2"
                      >
                        <Check className="h-4 w-4" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoadMap;