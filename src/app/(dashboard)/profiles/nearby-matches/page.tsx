import React from 'react';

const NearbyMatchesPage: React.FC = () => {
  // Example data for nearby matches
  const matches = [
    { name: 'Karan Patel', distance: '2 km away', image: 'https://randomuser.me/api/portraits/men/4.jpg' },
    { name: 'Meena Joshi', distance: '5 km away', image: 'https://randomuser.me/api/portraits/women/5.jpg' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Nearby Matches</h2>
        <ul className="space-y-4">
          {matches.map((match, idx) => (
            <li key={idx} className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl">
              <img src={match.image} alt={match.name} className="w-14 h-14 rounded-full object-cover" />
              <div>
                <div className="font-semibold text-gray-800">{match.name}</div>
                <div className="text-sm text-gray-500">{match.distance}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NearbyMatchesPage; 