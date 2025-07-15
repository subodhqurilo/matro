import React from 'react';

const ShortlistedProfilesPage: React.FC = () => {
  // Example data for shortlisted profiles
  const shortlisted = [
    { name: 'Amit Kumar', reason: 'Good match', image: 'https://randomuser.me/api/portraits/men/2.jpg' },
    { name: 'Sneha Gupta', reason: 'Similar interests', image: 'https://randomuser.me/api/portraits/women/3.jpg' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Shortlisted Profiles</h2>
        <ul className="space-y-4">
          {shortlisted.map((profile, idx) => (
            <li key={idx} className="flex items-center gap-4 p-4 bg-yellow-50 rounded-xl">
              <img src={profile.image} alt={profile.name} className="w-14 h-14 rounded-full object-cover" />
              <div>
                <div className="font-semibold text-gray-800">{profile.name}</div>
                <div className="text-sm text-gray-500">{profile.reason}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShortlistedProfilesPage; 