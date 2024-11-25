import React from 'react';
import { IntegrationTile } from '../../../types/settings';
import { useIntegration } from '../../../hooks/useIntegration';
import { Loader } from 'lucide-react';

interface IntegrationCardProps {
  integration: IntegrationTile;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({ integration }) => {
  const {
    isConnecting,
    status,
    error,
    connect,
    disconnect
  } = useIntegration(integration.name);

  const handleToggleConnection = () => {
    if (status === 'connected') {
      disconnect();
    } else {
      connect();
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex items-center mb-4">
        <img 
          src={integration.logo} 
          alt={`${integration.name} logo`} 
          className="w-12 h-12 mr-4 object-contain" 
        />
        <h2 className="text-xl font-semibold">{integration.name}</h2>
      </div>
      <p className="text-gray-600 mb-4 min-h-[3rem]">{integration.description}</p>
      {error && (
        <p className="text-red-500 text-sm mb-2">{error}</p>
      )}
      <button
        onClick={handleToggleConnection}
        disabled={isConnecting}
        className={`w-full flex justify-center items-center px-4 py-2 rounded-full transition duration-300 ${
          status === 'connected'
            ? 'bg-red-500 text-white hover:bg-red-600'
            : 'bg-navy-blue text-white hover:bg-opacity-90'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {isConnecting ? (
          <>
            <Loader className="animate-spin mr-2" size={20} />
            Connecting...
          </>
        ) : (
          status === 'connected' ? 'Disconnect' : 'Connect'
        )}
      </button>
    </div>
  );
};

export default IntegrationCard;