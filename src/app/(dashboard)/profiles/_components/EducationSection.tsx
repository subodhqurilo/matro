"use client";
import React, { useState, useEffect } from 'react';
import { Edit3 } from 'lucide-react';
import Modal from './Modal';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

type EducationItem = { label: string; value: string };
interface EducationSectionProps {
  education: EducationItem[];
}

const API_URL = 'https://matrimonial-backend-7ahc.onrender.com/api/profile/self';
const UPDATE_API_URL = 'https://matrimonial-backend-7ahc.onrender.com/api/profile/update-profile';

const EducationSection: React.FC<EducationSectionProps> = ({ education }) => {
  const [info, setInfo] = useState<EducationItem[]>(education);
  const [modalOpen, setModalOpen] = useState(false);
  const [editValues, setEditValues] = useState<EducationItem[]>(info);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updateStatus, setUpdateStatus] = useState<string | null>(null);

  // Fetch education data on mount
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
        const educationDetails = data?.data?.educationDetails || data?.educationDetails || {};
        const mappedEducation: EducationItem[] = [
          { label: 'Highest Degree', value: educationDetails.highestDegree || '' },
          { label: 'Post Graduation', value: educationDetails.postGraduation || '' },
          { label: 'Under Graduation', value: educationDetails.underGraduation || '' },
          { label: 'School', value: educationDetails.school || '' },
          { label: 'School Stream', value: educationDetails.schoolStream || '' },
        ];
        setInfo(mappedEducation);
        setEditValues(mappedEducation);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch education details');
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

      const updatedEducation = {
        educationDetails: {
          highestDegree: editValues.find(item => item.label === 'Highest Degree')?.value || '',
          postGraduation: editValues.find(item => item.label === 'Post Graduation')?.value || '',
          underGraduation: editValues.find(item => item.label === 'Under Graduation')?.value || '',
          school: editValues.find(item => item.label === 'School')?.value || '',
          schoolStream: editValues.find(item => item.label === 'School Stream')?.value || '',
        },
      };

      const response = await fetch(UPDATE_API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedEducation),
      });

      if (!response.ok) throw new Error('Failed to update education details');
      const updatedData = await response.json();
      const updatedEducationDetails = updatedData?.data?.educationDetails || updatedData?.educationDetails || {};
      const mappedEducation: EducationItem[] = [
        { label: 'Highest Degree', value: updatedEducationDetails.highestDegree || '' },
        { label: 'Post Graduation', value: updatedEducationDetails.postGraduation || '' },
        { label: 'Under Graduation', value: updatedEducationDetails.underGraduation || '' },
        { label: 'School', value: updatedEducationDetails.school || '' },
        { label: 'School Stream', value: updatedEducationDetails.schoolStream || '' },
      ];
      setInfo(mappedEducation);
      setModalOpen(false);
      setUpdateStatus('Education details updated successfully!');
    } catch (err: any) {
      setUpdateStatus(err.message || 'Failed to update education details');
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
        <h3 className="text-lg font-semibold text-gray-900">Education</h3>
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
          <h2 className="text-xl font-Lato text-gray-900">Edit Education</h2>
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
                  value={item.value}
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

export default EducationSection;