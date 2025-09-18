'use client';
import React, { useState, useEffect } from 'react';
import { Edit3 } from 'lucide-react';
import Modal from './Modal';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

type BasicInfoItem = { label: string; value: string };
interface BasicInfoSectionProps {
  basicInfo: BasicInfoItem[];
    onChange?: (updatedBasicInfo: BasicInfoItem[]) => void; // new

}

const API_URL = 'https://matrimonial-backend-7ahc.onrender.com/api/profile/self';
const UPDATE_API_URL = 'https://matrimonial-backend-7ahc.onrender.com/api/profile/update-profile';

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({ basicInfo, onChange  }) => {
  const [info, setInfo] = useState<BasicInfoItem[]>(basicInfo);
  const [modalOpen, setModalOpen] = useState(false);
  const [editValues, setEditValues] = useState<BasicInfoItem[]>(basicInfo);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updateStatus, setUpdateStatus] = useState<string | null>(null);

  // Fetch basic info on mount
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
        const basicInfoData = data?.data?.basicInfo || data?.basicInfo || {};
        
        const mappedBasicInfo: BasicInfoItem[] = [
          { label: 'Posted by', value: basicInfoData.postedBy || 'Self' },
          { 
            label: 'Name', 
            value: `${basicInfoData.firstName || ''} ${basicInfoData.middleName !== 'None' ? basicInfoData.middleName || '' : ''} ${basicInfoData.lastName || ''}`.replace(/ +/g, ' ').trim() 
          },
          { label: 'Age', value: basicInfoData.age?.toString() || '' },
          { label: 'Marital Status', value: basicInfoData.maritalStatus || '' },
          { label: 'Height', value: basicInfoData.height || '' },
          { label: 'Any Disability', value: basicInfoData.anyDisability || 'None' },
          { label: 'Health Information', value: basicInfoData.healthInformation || 'Not Specified' },
          { label: 'Weight', value: basicInfoData.weight?.toString() || '' },
          { label: 'Complexion', value: basicInfoData.complexion || '' },
        ];
        setInfo(mappedBasicInfo);
        setEditValues(mappedBasicInfo);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch basic info');
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
  const updatedValues = editValues.map((item, i) =>
    i === index ? { ...item, value } : item
  );
  setEditValues(updatedValues);

  // Notify parent if onChange prop is provided
    if (onChange) onChange(updatedValues);

};


  const handleSave = async () => {
  setUpdateStatus(null);
  try {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('No authentication token found. Please log in.');

    // Split Name into first, middle, last
    const nameValue = editValues.find(item => item.label === 'Name')?.value || '';
    const nameParts = nameValue.trim().split(/\s+/);
    const firstName = nameParts[0] || '';
    const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';
    const middleName = nameParts.length > 2 ? nameParts.slice(1, -1).join(' ') : 'None';

    const updatedBasicInfo = {
      basicInfo: {
        postedBy: editValues.find(item => item.label === 'Posted by')?.value || 'Self',
        firstName,
        middleName,
        lastName,
        age: parseInt(editValues.find(item => item.label === 'Age')?.value || '0', 10) || 0,
        maritalStatus: editValues.find(item => item.label === 'Marital Status')?.value || '',
        height: editValues.find(item => item.label === 'Height')?.value || '',
        anyDisability: editValues.find(item => item.label === 'Any Disability')?.value || 'None',
        healthInformation: editValues.find(item => item.label === 'Health Information')?.value || 'Not Specified',
        weight: parseInt(editValues.find(item => item.label === 'Weight')?.value || '0', 10) || 0,
        complexion: editValues.find(item => item.label === 'Complexion')?.value || '',
      },
    };

    const response = await fetch(UPDATE_API_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updatedBasicInfo),
    });

    if (!response.ok) throw new Error('Failed to update basic info');

    // ✅ Instead of re-fetching, update UI instantly
    setInfo(editValues);

    // also notify parent if provided
    if (onChange) onChange(editValues);

    setModalOpen(false);
    setUpdateStatus('Basic info updated successfully!');
  } catch (err: any) {
    setUpdateStatus(err.message || 'Failed to update basic info');
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
        <h3 className="text-lg font-semibold text-gray-900">Basic Info</h3>
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
          <h2 className="text-xl font-Lato text-gray-900">Edit Basic Info</h2>
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

export default BasicInfoSection;