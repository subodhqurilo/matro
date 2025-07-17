"use client"
import React, { useState } from 'react';
import { Phone, Clock, X, Users, Check, Send, Trash2, Heart, MessageCircle, UserCheck, UserX } from 'lucide-react';

interface UserProfile {
  id: string;
  name: string;
  profileId: string;
  lastSeen: string;
  age: number;
  height: string;
  caste: string;
  jobTitle: string;
  salary: string;
  education: string;
  location: string;
  languages: string[];
  profileImage: string;
  status: 'sent' | 'received' | 'accepted' | 'deleted';
  requestDate?: string;
  acceptedDate?: string;
  deletedDate?: string;
}

const SentRequests: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'received' | 'accepted' | 'sent' | 'deleted'>('sent');

  const sampleProfiles: UserProfile[] = [
    // Sent Requests
    {
      id: '1',
      name: 'Aaradhya Sharma',
      profileId: 'R9876668',
      lastSeen: 'Last seen an hour ago',
      age: 28,
      height: '5\'5"',
      caste: 'Brahmin',
      jobTitle: 'Software Developer',
      salary: '$5–7 Lakh',
      education: 'B.Tech in computer science',
      location: 'Delhi',
      languages: ['Hindi', 'English'],
      profileImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      status: 'sent',
      requestDate: '2 days ago'
    },
    {
      id: '2',
      name: 'Priya Patel',
      profileId: 'R9876669',
      lastSeen: 'Last seen 2 hours ago',
      age: 26,
      height: '5\'3"',
      caste: 'Patel',
      jobTitle: 'Product Manager',
      salary: '$8–10 Lakh',
      education: 'MBA from IIM',
      location: 'Mumbai',
      languages: ['Hindi', 'English', 'Gujarati'],
      profileImage: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      status: 'sent',
      requestDate: '1 day ago'
    },
    {
      id: '3',
      name: 'Kavya Reddy',
      profileId: 'R9876670',
      lastSeen: 'Last seen 30 minutes ago',
      age: 25,
      height: '5\'4"',
      caste: 'Reddy',
      jobTitle: 'UX Designer',
      salary: '$4–6 Lakh',
      education: 'B.Design from NID',
      location: 'Bangalore',
      languages: ['Telugu', 'English', 'Hindi'],
      profileImage: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      status: 'sent',
      requestDate: '3 hours ago'
    },
    // Received Requests
    {
      id: '4',
      name: 'Ananya Singh',
      profileId: 'R9876671',
      lastSeen: 'Last seen 15 minutes ago',
      age: 27,
      height: '5\'6"',
      caste: 'Rajput',
      jobTitle: 'Marketing Manager',
      salary: '$6–8 Lakh',
      education: 'MBA in Marketing',
      location: 'Pune',
      languages: ['Hindi', 'English', 'Marathi'],
      profileImage: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      status: 'received',
      requestDate: '1 hour ago'
    },
    {
      id: '5',
      name: 'Meera Gupta',
      profileId: 'R9876672',
      lastSeen: 'Last seen 45 minutes ago',
      age: 24,
      height: '5\'2"',
      caste: 'Gupta',
      jobTitle: 'Data Analyst',
      salary: '$4–5 Lakh',
      education: 'M.Sc in Statistics',
      location: 'Hyderabad',
      languages: ['Hindi', 'English', 'Telugu'],
      profileImage: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      status: 'received',
      requestDate: '3 hours ago'
    },
    {
      id: '6',
      name: 'Riya Jain',
      profileId: 'R9876673',
      lastSeen: 'Last seen 2 hours ago',
      age: 29,
      height: '5\'4"',
      caste: 'Jain',
      jobTitle: 'Financial Advisor',
      salary: '$7–9 Lakh',
      education: 'CA, CFA',
      location: 'Chennai',
      languages: ['Hindi', 'English', 'Tamil'],
      profileImage: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      status: 'received',
      requestDate: '5 hours ago'
    },
    // Accepted Requests
    {
      id: '7',
      name: 'Ishita Agarwal',
      profileId: 'R9876674',
      lastSeen: 'Last seen 10 minutes ago',
      age: 26,
      height: '5\'5"',
      caste: 'Agarwal',
      jobTitle: 'HR Manager',
      salary: '$5–6 Lakh',
      education: 'MBA in HR',
      location: 'Gurgaon',
      languages: ['Hindi', 'English'],
      profileImage: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      status: 'accepted',
      acceptedDate: '2 days ago'
    },
    {
      id: '8',
      name: 'Shreya Kapoor',
      profileId: 'R9876675',
      lastSeen: 'Last seen 25 minutes ago',
      age: 28,
      height: '5\'3"',
      caste: 'Kapoor',
      jobTitle: 'Graphic Designer',
      salary: '$3–5 Lakh',
      education: 'B.Des from NIFT',
      location: 'Jaipur',
      languages: ['Hindi', 'English', 'Rajasthani'],
      profileImage: 'https://images.pexels.com/photos/1181717/pexels-photo-1181717.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      status: 'accepted',
      acceptedDate: '1 week ago'
    },
    // Deleted Requests
    {
      id: '9',
      name: 'Neha Malhotra',
      profileId: 'R9876676',
      lastSeen: 'Last seen 3 days ago',
      age: 30,
      height: '5\'6"',
      caste: 'Malhotra',
      jobTitle: 'Business Analyst',
      salary: '$8–10 Lakh',
      education: 'MBA from ISB',
      location: 'Noida',
      languages: ['Hindi', 'English'],
      profileImage: 'https://images.pexels.com/photos/1181562/pexels-photo-1181562.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      status: 'deleted',
      deletedDate: '1 week ago'
    },
    {
      id: '10',
      name: 'Pooja Verma',
      profileId: 'R9876677',
      lastSeen: 'Last seen 5 days ago',
      age: 27,
      height: '5\'4"',
      caste: 'Verma',
      jobTitle: 'Content Writer',
      salary: '$3–4 Lakh',
      education: 'MA in English',
      location: 'Lucknow',
      languages: ['Hindi', 'English'],
      profileImage: 'https://images.pexels.com/photos/1181605/pexels-photo-1181605.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      status: 'deleted',
      deletedDate: '3 days ago'
    }
  ];

  const getTabCounts = () => {
    return {
      received: sampleProfiles.filter(p => p.status === 'received').length,
      accepted: sampleProfiles.filter(p => p.status === 'accepted').length,
      sent: sampleProfiles.filter(p => p.status === 'sent').length,
      deleted: sampleProfiles.filter(p => p.status === 'deleted').length
    };
  };

  const tabCounts = getTabCounts();

  const tabs = [
    { id: 'received', label: 'Received', count: tabCounts.received, icon: Users },
    { id: 'accepted', label: 'Accepted', count: tabCounts.accepted, icon: Check },
    { id: 'sent', label: 'Sent', count: tabCounts.sent, icon: Send },
    { id: 'deleted', label: 'Deleted', count: tabCounts.deleted, icon: Trash2 }
  ];

  const filteredProfiles = sampleProfiles.filter(profile => profile.status === activeTab);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'red';
      case 'received': return 'blue';
      case 'accepted': return 'green';
      case 'deleted': return 'gray';
      default: return 'blue';
    }
  };

  const getActionButtons = (profile: UserProfile) => {
    switch (profile.status) {
      case 'sent':
        return (
          <>
            <button className="flex items-center justify-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors duration-200 border border-blue-200 flex-1 sm:flex-none">
              <Phone size={14} className="sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm font-medium">Call</span>
            </button>
            
            <button className="flex items-center justify-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors duration-200 border border-orange-200 flex-1 sm:flex-none">
              <Clock size={14} className="sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm font-medium">Pending</span>
            </button>
            
            <button className="flex items-center justify-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors duration-200 border border-red-200 flex-1 sm:flex-none">
              <X size={14} className="sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm font-medium">Decline</span>
            </button>
          </>
        );
      
      case 'received':
        return (
          <>
            <button className="flex items-center justify-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors duration-200 border border-green-200 flex-1 sm:flex-none">
              <Heart size={14} className="sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm font-medium">Accept</span>
            </button>
            
            <button className="flex items-center justify-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors duration-200 border border-blue-200 flex-1 sm:flex-none">
              <MessageCircle size={14} className="sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm font-medium">Message</span>
            </button>
            
            <button className="flex items-center justify-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors duration-200 border border-red-200 flex-1 sm:flex-none">
              <X size={14} className="sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm font-medium">Decline</span>
            </button>
          </>
        );
      
      case 'accepted':
        return (
          <>
            <button className="flex items-center justify-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors duration-200 border border-blue-200 flex-1 sm:flex-none">
              <Phone size={14} className="sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm font-medium">Call</span>
            </button>
            
            <button className="flex items-center justify-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors duration-200 border border-green-200 flex-1 sm:flex-none">
              <MessageCircle size={14} className="sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm font-medium">Chat</span>
            </button>
            
            <button className="flex items-center justify-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors duration-200 border border-purple-200 flex-1 sm:flex-none">
              <UserCheck size={14} className="sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm font-medium">Profile</span>
            </button>
          </>
        );
      
      case 'deleted':
        return (
          <>
            <button className="flex items-center justify-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-gray-50 text-gray-500 rounded-lg cursor-not-allowed border border-gray-200 flex-1 sm:flex-none" disabled>
              <UserX size={14} className="sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm font-medium">Deleted</span>
            </button>
            
            <button className="flex items-center justify-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors duration-200 border border-blue-200 flex-1 sm:flex-none">
              <Send size={14} className="sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm font-medium">Resend</span>
            </button>
            
            <button className="flex items-center justify-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors duration-200 border border-red-200 flex-1 sm:flex-none">
              <Trash2 size={14} className="sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm font-medium">Remove</span>
            </button>
          </>
        );
      
      default:
        return null;
    }
  };

  const getStatusBadge = (profile: UserProfile) => {
    const statusColor = getStatusColor(profile.status);
    let statusText = '';
    let statusDate = '';

    switch (profile.status) {
      case 'sent':
        statusText = 'Sent';
        statusDate = profile.requestDate || '';
        break;
      case 'received':
        statusText = 'Received';
        statusDate = profile.requestDate || '';
        break;
      case 'accepted':
        statusText = 'Accepted';
        statusDate = profile.acceptedDate || '';
        break;
      case 'deleted':
        statusText = 'Deleted';
        statusDate = profile.deletedDate || '';
        break;
    }

    return (
      <span className={`text-xs bg-${statusColor}-50 text-${statusColor}-600 px-2 py-1 rounded self-start sm:self-auto whitespace-nowrap`}>
        {statusText} {statusDate}
      </span>
    );
  };

  const ProfileCard: React.FC<{ profile: UserProfile }> = ({ profile }) => {
    const statusColor = getStatusColor(profile.status);
    
    return (
      <div className={`bg-white rounded-lg shadow-md border-2 transition-all duration-300 hover:shadow-lg border-${statusColor}-200 hover:border-${statusColor}-300 p-4 sm:p-6 mb-4`}>
        <div className="flex flex-col sm:flex-row items-start justify-between space-y-4 sm:space-y-0">
          <div className="flex items-start space-x-3 sm:space-x-4 flex-1 w-full">
            {/* Profile Image */}
            <div className="relative flex-shrink-0">
              <img
                src={profile.profileImage}
                alt={profile.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-gray-100 shadow-sm"
              />
              {profile.status !== 'deleted' && (
                <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>

            {/* Profile Details */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 space-y-1 sm:space-y-0">
                <div className="min-w-0">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">{profile.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-500 truncate">{profile.profileId} | {profile.lastSeen}</p>
                </div>
                {getStatusBadge(profile)}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 text-xs sm:text-sm text-gray-600">
                <div className="space-y-1">
                  <p><span className="font-medium">{profile.age} Yrs</span> · {profile.height} · {profile.caste}</p>
                  <p className="font-medium text-gray-800">{profile.jobTitle} · Earns {profile.salary}</p>
                  <p className="break-words">{profile.education}</p>
                </div>
                <div className="space-y-1">
                  <p><span className="font-medium">Location:</span> {profile.location}</p>
                  <p><span className="font-medium">Languages:</span> <span className="break-words">{profile.languages.join(', ')}</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex sm:flex-col space-x-2 sm:space-x-0 sm:space-y-3 w-full sm:w-auto sm:ml-4">
            {getActionButtons(profile)}
          </div>
        </div>
      </div>
    );
  };

  const getEmptyStateContent = () => {
    switch (activeTab) {
      case 'received':
        return {
          icon: Users,
          title: 'No received requests',
          description: 'You haven\'t received any requests yet.'
        };
      case 'accepted':
        return {
          icon: Check,
          title: 'No accepted requests',
          description: 'You haven\'t accepted any requests yet.'
        };
      case 'sent':
        return {
          icon: Send,
          title: 'No sent requests',
          description: 'You haven\'t sent any requests yet.'
        };
      case 'deleted':
        return {
          icon: Trash2,
          title: 'No deleted requests',
          description: 'No deleted requests to show.'
        };
      default:
        return {
          icon: Users,
          title: 'No requests found',
          description: 'No requests to display.'
        };
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-3 sm:p-4 lg:p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 overflow-x-auto">
          <nav className="flex space-x-4 sm:space-x-8 px-3 sm:px-6 min-w-max">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const statusColor = getStatusColor(tab.id);
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-1 sm:space-x-2 py-3 sm:py-4 px-1 sm:px-2 border-b-2 font-medium text-xs sm:text-sm transition-colors duration-200 whitespace-nowrap ${
                    activeTab === tab.id
                      ? `border-${statusColor}-500 text-${statusColor}-600`
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon size={14} className="sm:w-4 sm:h-4" />
                  <span>{tab.label}</span>
                  {tab.count > 0 && (
                    <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs rounded-full ${
                      activeTab === tab.id
                        ? `bg-${statusColor}-100 text-${statusColor}-600`
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content Area */}
        <div className="p-3 sm:p-4 lg:p-6">
          {filteredProfiles.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                {React.createElement(getEmptyStateContent().icon, { 
                  size: 20, 
                  className: "sm:w-6 sm:h-6 text-gray-400" 
                })}
              </div>
              <h3 className="text-base sm:text-lg font-medium text-gray-700 mb-2">{getEmptyStateContent().title}</h3>
              <p className="text-sm sm:text-base text-gray-500">{getEmptyStateContent().description}</p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {filteredProfiles.map(profile => (
                <ProfileCard key={profile.id} profile={profile} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SentRequests;