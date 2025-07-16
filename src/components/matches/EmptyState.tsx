import React from 'react';
import { Heart } from 'lucide-react';

interface EmptyStateProps {
  activeTab: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ activeTab }) => (
  <div className="text-center py-16">
    <div className="bg-gray-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
      <Heart className="w-12 h-12 text-gray-400" />
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">No matches found</h3>
    <p className="text-gray-600">
      {activeTab === 'received' && 'New matches will appear here'}
      {activeTab === 'accepted' && 'Your accepted matches will appear here'}
      {activeTab === 'sent' && 'Your sent requests will appear here'}
      {activeTab === 'deleted' && 'Your declined matches will appear here'}
    </p>
  </div>
);

export default EmptyState; 