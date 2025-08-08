'use client';
import React, { useState, useEffect } from 'react';
import { Edit3, Plus, X } from 'lucide-react';
import Modal from './Modal';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

type LifestyleSection = { label: string; items: string[]; isArray?: boolean };
interface LifestyleInfoSectionProps {
  lifestyleInfo: LifestyleSection[];
}

const API_URL = 'https://bxcfrrl4-3000.inc1.devtunnels.ms/api/profile/self';
const UPDATE_API_URL = 'https://bxcfrrl4-3000.inc1.devtunnels.ms/api/profile/update-profile';

const LifestyleInfoSection: React.FC<LifestyleInfoSectionProps> = ({ lifestyleInfo }) => {
  const [info, setInfo] = useState<LifestyleSection[]>(lifestyleInfo);
  const [modalOpen, setModalOpen] = useState(false);
  const [editValues, setEditValues] = useState<LifestyleSection[]>(lifestyleInfo);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updateStatus, setUpdateStatus] = useState<string | null>(null);

  // Helper function to map API data to UI structure
  const mapApiDataToSections = (lifestyleHobbies: any): LifestyleSection[] => {
    return [
      {
        label: 'Personal Habits',
        items: [
          lifestyleHobbies.diet || '',
          lifestyleHobbies.smoking || '',
          lifestyleHobbies.drinking || '',
        ],
        isArray: false,
      },
      {
        label: 'Assets',
        items: [
          lifestyleHobbies.ownHouse || '',
          lifestyleHobbies.ownCar || '',
          lifestyleHobbies.openToPets || '',
        ],
        isArray: false,
      },
      {
        label: 'Food I Cook',
        items: Array.isArray(lifestyleHobbies.foodICook) ? lifestyleHobbies.foodICook : [''],
        isArray: true,
      },
      {
        label: 'Hobbies',
        items: Array.isArray(lifestyleHobbies.hobbies) ? lifestyleHobbies.hobbies : [''],
        isArray: true,
      },
      {
        label: 'Interests',
        items: Array.isArray(lifestyleHobbies.interests) ? lifestyleHobbies.interests : [''],
        isArray: true,
      },
      {
        label: 'Favorite Music',
        items: Array.isArray(lifestyleHobbies.favoriteMusic) ? lifestyleHobbies.favoriteMusic : [''],
        isArray: true,
      },
      {
        label: 'Sports',
        items: Array.isArray(lifestyleHobbies.sports) ? lifestyleHobbies.sports : [''],
        isArray: true,
      },
      {
        label: 'Cuisine',
        items: Array.isArray(lifestyleHobbies.cuisine) ? lifestyleHobbies.cuisine : [''],
        isArray: true,
      },
      {
        label: 'Movies',
        items: Array.isArray(lifestyleHobbies.movies) ? lifestyleHobbies.movies : [''],
        isArray: true,
      },
      {
        label: 'TV Shows',
        items: Array.isArray(lifestyleHobbies.tvShows) ? lifestyleHobbies.tvShows : [''],
        isArray: true,
      },
      {
        label: 'Vacation Destination',
        items: Array.isArray(lifestyleHobbies.vacationDestination) ? lifestyleHobbies.vacationDestination : [''],
        isArray: true,
      },
    ];
  };

  // Fetch lifestyle info on mount
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('authToken');
        if (!token) throw new Error('No authentication token found. Please log in.');
        const response = await fetch(API_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch profile');
        const data = await response.json();
        const lifestyleHobbies = data?.data?.lifestyleHobbies || data?.lifestyleHobbies || {};
        
        const mappedLifestyleInfo = mapApiDataToSections(lifestyleHobbies);
        setInfo(mappedLifestyleInfo);
        setEditValues(mappedLifestyleInfo);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch lifestyle info');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleEdit = () => {
    setEditValues([...info]);
    setModalOpen(true);
  };

  const handleSectionChange = (sectionIdx: number, itemIdx: number, value: string) => {
    setEditValues(prev =>
      prev.map((section, sIdx) =>
        sIdx === sectionIdx
          ? {
              ...section,
              items: section.items.map((item, iIdx) =>
                iIdx === itemIdx ? value : item
              ),
            }
          : section
      )
    );
  };

  const handleAddItem = (sectionIdx: number) => {
    setEditValues(prev =>
      prev.map((section, sIdx) =>
        sIdx === sectionIdx
          ? {
              ...section,
              items: [...section.items, ''],
            }
          : section
      )
    );
  };

  const handleRemoveItem = (sectionIdx: number, itemIdx: number) => {
    setEditValues(prev =>
      prev.map((section, sIdx) =>
        sIdx === sectionIdx
          ? {
              ...section,
              items: section.items.filter((_, iIdx) => iIdx !== itemIdx),
            }
          : section
      )
    );
  };

  const handleSave = async () => {
    setUpdateStatus(null);
    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('No authentication token found. Please log in.');

      const personalHabitsSection = editValues.find(section => section.label === 'Personal Habits')?.items || ['', '', ''];
      const assetsSection = editValues.find(section => section.label === 'Assets')?.items || ['', '', ''];
      const foodICookSection = editValues.find(section => section.label === 'Food I Cook')?.items || [''];
      const hobbiesSection = editValues.find(section => section.label === 'Hobbies')?.items || [''];
      const interestsSection = editValues.find(section => section.label === 'Interests')?.items || [''];
      const favoriteMusicSection = editValues.find(section => section.label === 'Favorite Music')?.items || [''];
      const sportsSection = editValues.find(section => section.label === 'Sports')?.items || [''];
      const cuisineSection = editValues.find(section => section.label === 'Cuisine')?.items || [''];
      const moviesSection = editValues.find(section => section.label === 'Movies')?.items || [''];
      const tvShowsSection = editValues.find(section => section.label === 'TV Shows')?.items || [''];
      const vacationDestinationSection = editValues.find(section => section.label === 'Vacation Destination')?.items || [''];

      const updatedLifestyleInfo = {
        lifestyleHobbies: {
          diet: personalHabitsSection[0] || '',
          smoking: personalHabitsSection[1] || '',
          drinking: personalHabitsSection[2] || '',
          ownHouse: assetsSection[0] || '',
          ownCar: assetsSection[1] || '',
          openToPets: assetsSection[2] || '',
          foodICook: foodICookSection.filter(item => item.trim() !== ''),
          hobbies: hobbiesSection.filter(item => item.trim() !== ''),
          interests: interestsSection.filter(item => item.trim() !== ''),
          favoriteMusic: favoriteMusicSection.filter(item => item.trim() !== ''),
          sports: sportsSection.filter(item => item.trim() !== ''),
          cuisine: cuisineSection.filter(item => item.trim() !== ''),
          movies: moviesSection.filter(item => item.trim() !== ''),
          tvShows: tvShowsSection.filter(item => item.trim() !== ''),
          vacationDestination: vacationDestinationSection.filter(item => item.trim() !== ''),
        },
      };

      const response = await fetch(UPDATE_API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedLifestyleInfo),
      });

      if (!response.ok) throw new Error('Failed to update lifestyle info');
      const updatedData = await response.json();
      const updatedLifestyleHobbies = updatedData?.data?.lifestyleHobbies || updatedData?.lifestyleHobbies || {};
      
      const mappedLifestyleInfo = mapApiDataToSections(updatedLifestyleHobbies);
      setInfo(mappedLifestyleInfo);
      setModalOpen(false);
      setUpdateStatus('Lifestyle info updated successfully!');
    } catch (err: any) {
      setUpdateStatus(err.message || 'Failed to update lifestyle info');
    }
  };

  if (loading) {
    return <div className="bg-[#FFF8F0] rounded-2xl p-6 shadow-sm text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="bg-[#FFF8F0] rounded-2xl p-6 shadow-sm text-red-500">{error}</div>;
  }

  return (
    <div className="bg-[#FFF8F0] rounded-2xl p-6 shadow-sm">
      {updateStatus && (
        <div
          className={`mb-4 p-2 rounded ${
            updateStatus.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {updateStatus}
        </div>
      )}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Lifestyle & Hobbies</h3>
        <Edit3
          className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600"
          onClick={handleEdit}
        />
      </div>
      <div className="space-y-6">
        {info.map((section, index) => (
          <div key={index}>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">{section.label}</h4>
            <div className="space-y-2">
              {section.items.length === 0 ? (
                <div className="text-sm text-gray-600 flex items-center gap-2">
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  Not specified
                </div>
              ) : (
                section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="text-sm text-gray-600 flex items-center gap-2">
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    {item || 'Not specified'}
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="flex flex-col items-center justify-center gap-3 mb-4">
          <h2 className="text-xl font-Lato text-gray-900">Edit Lifestyle & Hobbies</h2>
        </div>
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSave();
          }}
        >
          <div className="mb-4 w-full space-y-6 max-h-96 overflow-y-auto">
            {editValues.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <Label className="text-sm font-Inter text-gray-700 mb-1 block">
                  {section.label}
                  {section.isArray && (
                    <Button
                      type="button"
                      onClick={() => handleAddItem(sectionIdx)}
                      className="ml-2 p-1 h-6 w-6 bg-rose-100 hover:bg-rose-200 text-rose-700"
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  )}
                </Label>
                {section.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="flex items-center gap-2 mb-2">
                    <input
                      className="flex-1 rounded-md border border-gray-300 p-2 font-Inter bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-700"
                      value={item || ''}
                      onChange={e => handleSectionChange(sectionIdx, itemIdx, e.target.value)}
                      placeholder={
                        section.label === 'Personal Habits'
                          ? itemIdx === 0
                            ? 'Diet (e.g., Vegetarian)'
                            : itemIdx === 1
                            ? 'Smoking (e.g., Yes/No)'
                            : 'Drinking (e.g., Yes/No)'
                          : section.label === 'Assets'
                          ? itemIdx === 0
                            ? 'Own House (e.g., Yes/No)'
                            : itemIdx === 1
                            ? 'Own Car (e.g., Yes/No)'
                            : 'Open to Pets (e.g., Yes/No)'
                          : `Enter ${section.label.toLowerCase()}`
                      }
                    />
                    {section.isArray && section.items.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => handleRemoveItem(sectionIdx, itemIdx)}
                        className="p-1 h-8 w-8 bg-red-100 hover:bg-red-200 text-red-700"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              className="bg-gray-100 text-gray-700 hover:bg-gray-200"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-rose-700 hover:bg-rose-800 text-white"
            >
              Save
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default LifestyleInfoSection;