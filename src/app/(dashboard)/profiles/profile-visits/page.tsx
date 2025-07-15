import React from 'react';

const ProfileVisitsPage: React.FC = () => {
  // Example data for visited profiles
  const visits = [
    { name: 'Priya Sharma', date: '2024-06-01', image: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { name: 'Anjali Verma', date: '2024-05-28', image: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { name: 'Rohit Singh', date: '2024-05-25', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Profile Visits</h2>
        <ul className="space-y-4">
          {visits.map((visit, idx) => (
            <li key={idx} className="flex items-center gap-4 p-4 bg-gray-100 rounded-xl">
              <img src={visit.image} alt={visit.name} className="w-14 h-14 rounded-full object-cover" />
              <div>
                <div className="font-semibold text-gray-800">{visit.name}</div>
                <div className="text-sm text-gray-500">Visited on {visit.date}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfileVisitsPage; 