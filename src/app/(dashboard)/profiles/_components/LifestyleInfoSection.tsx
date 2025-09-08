'use client';
import React, { useState, useEffect } from 'react';
import { Edit3 } from 'lucide-react';
import Modal from './Modal';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

type LifestyleSection = { 
  label: string; 
  items: string[];
  subLabels?: string[]; // Added optional subLabels property
};

interface LifestyleInfoSectionProps {
  lifestyleInfo: LifestyleSection[];
}

const API_URL = 'https://matrimonial-backend-7ahc.onrender.com/api/profile/self';
const UPDATE_API_URL = 'https://matrimonial-backend-7ahc.onrender.com/api/profile/update-profile';

const LifestyleInfoSection: React.FC<LifestyleInfoSectionProps> = ({ lifestyleInfo }) => {
  const [info, setInfo] = useState<LifestyleSection[]>(lifestyleInfo);
  const [modalOpen, setModalOpen] = useState(false);
  const [editValues, setEditValues] = useState<LifestyleSection[]>(lifestyleInfo);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updateStatus, setUpdateStatus] = useState<string | null>(null);

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
        const mappedLifestyleInfo: LifestyleSection[] = [
          {
            label: 'Personal Habits',
            items: [
              lifestyleHobbies.diet || '',
              lifestyleHobbies.smoking || '',
              lifestyleHobbies.drinking || '',
            ],
            subLabels: ['Diet', 'Smoking', 'Drinking'],
          },
          {
            label: 'Assets',
            items: [
              lifestyleHobbies.openToPets || '',
              lifestyleHobbies.ownCar || '',
              lifestyleHobbies.ownHouse || '',
            ],
            subLabels: ['Open to Pets', 'Own Car', 'Own House'],
          },
          {
            label: 'Food I Cook',
            items: lifestyleHobbies.foodICook || [''],
          },
          {
            label: 'Hobbies',
            items: lifestyleHobbies.hobbies || [''],
          },
          {
            label: 'Interests',
            items: lifestyleHobbies.interests || [''],
          },
          {
            label: 'Favorite Music',
            items: lifestyleHobbies.favoriteMusic || [''],
          },
          {
            label: 'Sports',
            items: lifestyleHobbies.sports || [''],
          },
          {
            label: 'Cuisine',
            items: lifestyleHobbies.cuisine || [''],
          },
          {
            label: 'Movies',
            items: lifestyleHobbies.movies || [''],
          },
          {
            label: 'TV Shows',
            items: lifestyleHobbies.tvShows || [''],
          },
          {
            label: 'Vacation Destination',
            items: lifestyleHobbies.vacationDestination || [''],
          },
        ];
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
    setEditValues(info);
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
          openToPets: assetsSection[0] || '',
          ownCar: assetsSection[1] || '',
          ownHouse: assetsSection[2] || '',
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
      const mappedLifestyleInfo: LifestyleSection[] = [
        {
          label: 'Personal Habits',
          items: [
            updatedLifestyleHobbies.diet || '',
            updatedLifestyleHobbies.smoking || '',
            updatedLifestyleHobbies.drinking || '',
          ],
          subLabels: ['Diet', 'Smoking', 'Drinking'],
        },
        {
          label: 'Assets',
          items: [
            updatedLifestyleHobbies.openToPets || '',
            updatedLifestyleHobbies.ownCar || '',
            updatedLifestyleHobbies.ownHouse || '',
          ],
          subLabels: ['Open to Pets', 'Own Car', 'Own House'],
        },
        {
          label: 'Food I Cook',
          items: updatedLifestyleHobbies.foodICook || [''],
        },
        {
          label: 'Hobbies',
          items: updatedLifestyleHobbies.hobbies || [''],
        },
        {
          label: 'Interests',
          items: updatedLifestyleHobbies.interests || [''],
        },
        {
          label: 'Favorite Music',
          items: updatedLifestyleHobbies.favoriteMusic || [''],
        },
        {
          label: 'Sports',
          items: updatedLifestyleHobbies.sports || [''],
        },
        {
          label: 'Cuisine',
          items: updatedLifestyleHobbies.cuisine || [''],
        },
        {
          label: 'Movies',
          items: updatedLifestyleHobbies.movies || [''],
        },
        {
          label: 'TV Shows',
          items: updatedLifestyleHobbies.tvShows || [''],
        },
        {
          label: 'Vacation Destination',
          items: updatedLifestyleHobbies.vacationDestination || [''],
        },
      ];
      setInfo(mappedLifestyleInfo);
      setModalOpen(false);
      setUpdateStatus('Lifestyle info updated successfully!');
    } catch (err: any) {
      setUpdateStatus(err.message || 'Failed to update lifestyle info');
    }
  };

  if (loading) {
    return <div className="bg-[#FFF8F0]  p-6 shadow-sm text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="bg-[#FFF8F0]  p-6 shadow-sm text-red-500">{error}</div>;
  }

  return (
    <div className="bg-[#FFF8F0]  p-6 shadow-sm">
      {updateStatus && (
        <div
          className={`mb-4 p-2  ${
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
     
      <div className="grid grid-cols-1 md:grid-cols-2 divide-x divide-dashed divide-gray-300">
  <div className="pr-6 space-y-4">
    {info.slice(0, Math.ceil(info.length / 2)).map((section, index) => (
      <div key={index}>
        <div className="text-sm font-semibold text-gray-900 mb-1">{section.label}</div>
        {section.items.map((item, itemIndex) => (
          <div key={itemIndex} className="flex justify-between text-sm text-gray-700">
            <span className="text-gray-600 w-1/2">
              {section.subLabels ? section.subLabels[itemIndex] : section.label}
            </span>
            <span className="font-medium w-1/2 text-right">{item || 'Not specified'}</span>
          </div>
        ))}
      </div>
    ))}
  </div>
  <div className="pl-6 space-y-4">
    {info.slice(Math.ceil(info.length / 2)).map((section, index) => (
      <div key={index}>
        <div className="text-sm font-semibold text-gray-900 mb-1">{section.label}</div>
        {section.items.map((item, itemIndex) => (
          <div key={itemIndex} className="flex justify-between text-sm text-gray-700">
            <span className="text-gray-600 w-1/2">
              {section.subLabels ? section.subLabels[itemIndex] : section.label}
            </span>
            <span className="font-medium w-1/2 text-right">{item || 'Not specified'}</span>
          </div>
        ))}
      </div>
    ))}
  </div>
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
          <div className="mb-4 w-full space-y-6">
            {editValues.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <Label className="text-sm font-Inter text-gray-700 mb-1 block">
                  {section.label}
                </Label>
                {section.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="mb-2">
                    {section.subLabels && (
                      <Label className="text-xs font-Inter text-gray-600 mb-1 block">
                        {section.subLabels[itemIdx]}
                      </Label>
                    )}
                    <input
                      className="w-full rounded-md border border-gray-300 p-2 font-Inter bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-700"
                      value={item || ''} // Prevent uncontrolled input
                      onChange={e => handleSectionChange(sectionIdx, itemIdx, e.target.value)}
                      placeholder={
                        section.label === 'Personal Habits'
                          ? section.subLabels?.[itemIdx] || `Enter ${section.label.toLowerCase()}`
                          : section.label === 'Assets'
                          ? section.subLabels?.[itemIdx] || `Enter ${section.label.toLowerCase()}`
                          : `Enter ${section.label.toLowerCase()}`
                      }
                    />
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