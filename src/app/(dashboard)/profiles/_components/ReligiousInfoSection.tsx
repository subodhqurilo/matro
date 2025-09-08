'use client';
import React, { useState, useEffect } from 'react';
import { Edit3 } from 'lucide-react';
import Modal from './Modal';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

type ReligiousInfoItem = { label: string; value: string };
interface ReligiousInfoSectionProps {
  religiousInfo: ReligiousInfoItem[];
}

const API_URL = 'http://localhost:3000/api/profile/self';
const UPDATE_API_URL = 'http://localhost:3000/api/profile/update-profile';

const ReligiousInfoSection: React.FC<ReligiousInfoSectionProps> = ({ religiousInfo }) => {
  const [info, setInfo] = useState<ReligiousInfoItem[]>(religiousInfo);
  const [modalOpen, setModalOpen] = useState(false);
  const [editValues, setEditValues] = useState<ReligiousInfoItem[]>(religiousInfo);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updateStatus, setUpdateStatus] = useState<string | null>(null);

  // Fetch religious info on mount
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
        const religionDetails = data?.data?.religionDetails || data?.religionDetails || {};
        const mappedReligiousInfo: ReligiousInfoItem[] = [
          { label: 'Religion', value: religionDetails.religion || '' },
          { label: 'Mother Tongue', value: religionDetails.motherTongue || '' },
          { label: 'Community', value: religionDetails.community || '' },
          { label: 'Caste No Bar', value: religionDetails.casteNoBar || '' },
          { label: 'Gotra/Gothra', value: religionDetails.gothra || '' },
        ];
        setInfo(mappedReligiousInfo);
        setEditValues(mappedReligiousInfo);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch religious info');
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

      const updatedReligiousInfo = {
        religionDetails: {
          religion: editValues.find(item => item.label === 'Religion')?.value || '',
          motherTongue: editValues.find(item => item.label === 'Mother Tongue')?.value || '',
          community: editValues.find(item => item.label === 'Community')?.value || '',
          casteNoBar: editValues.find(item => item.label === 'Caste No Bar')?.value || '',
          gothra: editValues.find(item => item.label === 'Gotra/Gothra')?.value || '',
        },
      };

      const response = await fetch(UPDATE_API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedReligiousInfo),
      });

      if (!response.ok) throw new Error('Failed to update religious info');
      const updatedData = await response.json();
      const updatedReligionDetails = updatedData?.data?.religionDetails || updatedData?.religionDetails || {};
      const mappedReligiousInfo: ReligiousInfoItem[] = [
        { label: 'Religion', value: updatedReligionDetails.religion || '' },
        { label: 'Mother Tongue', value: updatedReligionDetails.motherTongue || '' },
        { label: 'Community', value: updatedReligionDetails.community || '' },
        { label: 'Caste No Bar', value: updatedReligionDetails.casteNoBar || '' },
        { label: 'Gotra/Gothra', value: updatedReligionDetails.gothra || '' },
      ];
      setInfo(mappedReligiousInfo);
      setModalOpen(false);
      setUpdateStatus('Religious info updated successfully!');
    } catch (err: any) {
      setUpdateStatus(err.message || 'Failed to update religious info');
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
        <h3 className="text-lg font-semibold text-gray-900">Religious Background</h3>
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
          <h2 className="text-xl font-Lato text-gray-900">Edit Religious Info</h2>
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

export default ReligiousInfoSection;