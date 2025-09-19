'use client';
import React, { useState, useEffect } from 'react';
import { Edit3 } from 'lucide-react';
import Modal from './Modal';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

type FamilyInfoItem = { label: string; value: string };
interface FamilyInfoSectionProps {
  familyInfo: FamilyInfoItem[];
}

const API_URL = 'https://matrimonial-backend-7ahc.onrender.com/api/profile/self';
const UPDATE_API_URL = '/api/profile/update-profile';

const FamilyInfoSection: React.FC<FamilyInfoSectionProps> = ({ familyInfo }) => {
  const [info, setInfo] = useState<FamilyInfoItem[]>(familyInfo);
  const [modalOpen, setModalOpen] = useState(false);
  const [editValues, setEditValues] = useState<FamilyInfoItem[]>(familyInfo);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updateStatus, setUpdateStatus] = useState<string | null>(null);

  // Fetch family info on mount
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
        const familyDetails = data?.data?.familyDetails || data?.familyDetails || {};
        const mappedFamilyInfo: FamilyInfoItem[] = [
          { label: 'Family Background', value: familyDetails.familyBackground || '' },
          { label: 'Father is', value: familyDetails.fatherOccupation || '' },
          { label: 'Mother is', value: familyDetails.motherOccupation || '' },
          { label: 'Brother', value: familyDetails.brother?.toString() || '' },
          { label: 'Sister', value: familyDetails.sister?.toString() || '' },
          { label: 'Family Based Out of', value: familyDetails.familyBasedOutOf || '' },
        ];
        setInfo(mappedFamilyInfo);
        setEditValues(mappedFamilyInfo);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch family info');
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

    const updatedFamilyInfo = {
      familyDetails: {
        familyBackground: editValues.find(item => item.label === 'Family Background')?.value || '',
        fatherOccupation: editValues.find(item => item.label === 'Father is')?.value || '',
        motherOccupation: editValues.find(item => item.label === 'Mother is')?.value || '',
        brother: parseInt(editValues.find(item => item.label === 'Brother')?.value || '0', 10) || 0,
        sister: parseInt(editValues.find(item => item.label === 'Sister')?.value || '0', 10) || 0,
        familyBasedOutOf: editValues.find(item => item.label === 'Family Based Out of')?.value || '',
      },
    };

    const response = await fetch(UPDATE_API_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updatedFamilyInfo),
    });

    if (!response.ok) throw new Error('Failed to update family info');

    // Instead of relying on API response, update UI immediately
    setInfo(editValues);
    setModalOpen(false);
    setUpdateStatus('Family info updated successfully!');
  } catch (err: any) {
    setUpdateStatus(err.message || 'Failed to update family info');
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
        <h3 className="text-lg font-semibold text-gray-900">Family</h3>
        <Edit3
          className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600"
          onClick={handleEdit}
        />
      </div>
      <div className="grid grid-cols-2 divide-x divide-dashed divide-gray-300">
  <div className="space-y-3 pr-6">
    {info.slice(0, Math.ceil(info.length / 2)).map((item, index) => (
      <div key={index} className="flex justify-between text-sm">
        <span className="text-gray-600 w-1/2">{item.label}</span>
        <span className="text-gray-900 font-medium w-1/2">: {item.value}</span>
      </div>
    ))}
  </div>
  <div className="space-y-3 pl-6">
    {info.slice(Math.ceil(info.length / 2)).map((item, index) => (
      <div key={index} className="flex justify-between text-sm">
        <span className="text-gray-600 w-1/2">{item.label}</span>
        <span className="text-gray-900 font-medium w-1/2">: {item.value}</span>
      </div>
    ))}
  </div>
</div>


      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="flex flex-col items-center justify-center gap-3 mb-4">
          <h2 className="text-xl font-Lato text-gray-900">Edit Family Info</h2>
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

export default FamilyInfoSection;