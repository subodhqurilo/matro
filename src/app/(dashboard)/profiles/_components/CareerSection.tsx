'use client';
import React, { useState, useEffect } from 'react';
import { Edit3 } from 'lucide-react';
import Modal from './Modal';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

type CareerItem = { label: string; value: string };
interface CareerSectionProps {
  career: CareerItem[];
}

const API_URL = 'https://matrimonial-backend-7ahc.onrender.com/api/profile/self';
const UPDATE_API_URL = 'https://matrimonial-backend-7ahc.onrender.com/api/profile/update-profile';

const CareerSection: React.FC<CareerSectionProps> = ({ career }) => {
  const [info, setInfo] = useState<CareerItem[]>(career);
  const [modalOpen, setModalOpen] = useState(false);
  const [editValues, setEditValues] = useState<CareerItem[]>(career);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updateStatus, setUpdateStatus] = useState<string | null>(null);

  // Fetch career data on mount
  
// Move this outside so you can reuse
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
    const careerDetails = data?.data?.careerDetails || data?.careerDetails || {};
    const mappedCareer: CareerItem[] = [
      { label: 'Employee In', value: careerDetails.employedIn || '' },
      { label: 'Occupation', value: careerDetails.occupation || '' },
      { label: 'Company', value: careerDetails.company || '' },
      { label: 'Annual Income', value: careerDetails.annualIncome || '' },
    ];
    setInfo(mappedCareer);
    setEditValues(mappedCareer);
  } catch (err: any) {
    setError(err.message || 'Failed to fetch career details');
  } finally {
    setLoading(false);
  }
};

// run once on mount
useEffect(() => {
  fetchProfile();
}, []);

    

  const handleEdit = () => {
    setEditValues(info);
    setModalOpen(true);
  };

  const handleInputChange = (index: number, value: string) => {
    setEditValues((prev) =>
      prev.map((item, i) => (i === index ? { ...item, value } : item))
    );
    
  };

  const handleSave = async () => {
  setUpdateStatus(null);
  try {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('No authentication token found. Please log in.');

    const updatedCareer = {
      careerDetails: {
        employedIn: editValues.find(item => item.label === 'Employee In')?.value || '',
        occupation: editValues.find(item => item.label === 'Occupation')?.value || '',
        company: editValues.find(item => item.label === 'Company')?.value || '',
        annualIncome: editValues.find(item => item.label === 'Annual Income')?.value || '',
      },
    };

    const response = await fetch(UPDATE_API_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updatedCareer),
    });

    if (!response.ok) throw new Error('Failed to update career details');
    
    // instead of trusting response, re-fetch fresh profile
    await fetchProfile();

    setModalOpen(false);
    setUpdateStatus('Career details updated successfully!');
  } catch (err: any) {
    setUpdateStatus(err.message || 'Failed to update career details');
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
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Career</h3>
        <Edit3
          className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600"
          onClick={handleEdit}
        />
      </div>
      <div className="space-y-2">
  {info.map((item, index) => (
    <div key={index} className="flex text-sm text-gray-700">
      <div className="w-1/2 flex">
        <span className="text-gray-600">{item.label}</span>
        <span className="ml-1">:</span>
      </div>
      <div className="w-1/2 font-medium">{item.value || 'Not specified'}</div>
    </div>
  ))}
</div>


      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="flex flex-col items-center justify-center gap-3 mb-4">
          <h2 className="text-xl font-Lato text-gray-900">Edit Career</h2>
        </div>
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSave();
          }}
        >
          <div className="mb-4 w-full space-y-3">
            {editValues.map((item, index) => (
              <div key={index}>
                <Label className="text-sm font-Inter text-gray-700 mb-1 block">
                  {item.label}
                </Label>
                <input
                  className="w-full rounded-md border border-gray-300 p-2 font-Inter bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-700"
                  value={item.value || ''} // Prevent uncontrolled input
                  onChange={e => handleInputChange(index, e.target.value)}
                />
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

export default CareerSection;