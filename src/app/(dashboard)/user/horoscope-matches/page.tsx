import React from 'react';
import { Heart, X } from 'lucide-react';
import CircularProgress from '../../profiles/_components/CircularProgress';

interface UserDetail {
  label: string;
  value: string;
  bgColor: string;
}

interface CompatibilityParam {
  name: string;
  description: string;
  score: number;
  maxScore: number;
  color: string;
}

const CompatibilityCard: React.FC = () => {
  const userDetails: UserDetail[] = [
    { label: 'Time of Birth', value: '08:00 AM', bgColor: 'bg-pink-100' },
    { label: 'Place of Birth', value: 'Delhi, Delhi-NCR, India', bgColor: 'bg-blue-100' },
    { label: 'Manglik', value: 'Don\'t Know', bgColor: 'bg-purple-100' },
    { label: 'Rashi', value: 'Leo', bgColor: 'bg-yellow-100' },
    { label: 'Nakshatra', value: 'Mrigasira', bgColor: 'bg-green-100' }
  ];

  const compatibilityParams: CompatibilityParam[] = [
    { name: 'Bhakoot', description: 'Love', score: 2, maxScore: 7, color: '#ec4899' },
    { name: 'Varna', description: 'Compatibility', score: 1, maxScore: 1, color: '#f97316' },
    { name: 'Nadi', description: 'Health', score: 2, maxScore: 8, color: '#06b6d4' },
    { name: 'Maitri', description: 'Mental Compatibility', score: 2, maxScore: 5, color: '#84cc16' },
    { name: 'Vashya', description: 'Dominance', score: 2, maxScore: 2, color: '#eab308' },
    { name: 'Gana', description: 'Temperament', score: 2, maxScore: 6, color: '#8b5cf6' },
    { name: 'Tara', description: 'Destiny', score: 2, maxScore: 3, color: '#a855f7' },
    { name: 'Yoni', description: 'Physical Compatibility', score: 2, maxScore: 4, color: '#dc2626' }
  ];

  const totalScore = compatibilityParams.reduce((sum, param) => sum + param.score, 0);
  const maxTotalScore = compatibilityParams.reduce((sum, param) => sum + param.maxScore, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Close button */}
        <div className="flex justify-end mb-4">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Main card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          {/* Header */}
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-8">
            Your Compatibility with Shivank G
          </h1>

          {/* Profile section */}
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              {/* Female profile */}
              <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg border-4 border-white">
                <img 
                  src="https://images.pexels.com/photos/3671083/pexels-photo-3671083.jpeg?auto=compress&cs=tinysrgb&w=400" 
                  alt="Female profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Dotted line with rings and heart */}
              <div className="absolute top-12 left-20 w-32 h-0 border-t-2 border-dotted border-pink-300"></div>
              <div className="absolute top-8 left-28 bg-white rounded-full p-2 shadow-lg">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 rounded-full border-2 border-pink-400"></div>
                  <Heart className="w-4 h-4 text-pink-500 fill-current" />
                  <div className="w-3 h-3 rounded-full border-2 border-pink-400"></div>
                </div>
              </div>
              
              {/* Male profile */}
              <div className="absolute top-0 left-40 w-24 h-24 rounded-full overflow-hidden shadow-lg border-4 border-white">
                <img 
                  src="https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400" 
                  alt="Male profile" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Score */}
          <div className="text-center mb-8">
            <div className="text-5xl font-bold text-pink-500 mb-2">
              {totalScore}.5/{maxTotalScore}
            </div>
          </div>

          {/* Predictions section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Predictions are based on your details.
            </h2>
            
            <div className="flex flex-wrap gap-3">
              {userDetails.map((detail, index) => (
                <div key={index} className={`${detail.bgColor} rounded-full px-4 py-2 text-sm`}>
                  <span className="font-medium text-gray-700">{detail.label}:</span>
                  <span className="ml-1 text-gray-600">{detail.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Compatibility parameters grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {compatibilityParams.map((param, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-3">
                  <CircularProgress
                    value={param.score}
                    max={param.maxScore}
                    color={param.color}
                    size={80}
                    strokeWidth={8}
                  />
                </div>
                <h3 className="font-medium text-gray-700 mb-1">
                  {param.name} - {param.description}
                </h3>
                <div className="text-xl font-bold" style={{ color: param.color }}>
                  {param.score}/{param.maxScore}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompatibilityCard;