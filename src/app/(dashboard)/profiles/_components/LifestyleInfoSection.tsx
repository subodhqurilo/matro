'use client';
import React, { useState } from 'react';
import { Edit3 } from 'lucide-react';
import Modal from './Modal';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

type LifestyleSection = { label: string; items: string[] };
interface LifestyleInfoSectionProps {
  lifestyleInfo: LifestyleSection[];
}

const LifestyleInfoSection: React.FC<LifestyleInfoSectionProps> = ({ lifestyleInfo }) => {
  const [info, setInfo] = useState<LifestyleSection[]>(lifestyleInfo);
  const [modalOpen, setModalOpen] = useState(false);
  const [editValues, setEditValues] = useState<LifestyleSection[]>(info);

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

  const handleSave = () => {
    setInfo(editValues);
    setModalOpen(false);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
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
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="text-sm text-gray-600 flex items-center gap-2">
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  {item}
                </div>
              ))}
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
          <div className="mb-4 w-full space-y-6">
            {editValues.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <Label className="text-sm font-Inter text-gray-700 mb-1 block">
                  {section.label}
                </Label>
                {section.items.map((item, itemIdx) => (
                  <input
                    key={itemIdx}
                    className="w-full rounded-md border border-gray-300 p-2 mb-2 font-Inter bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-700"
                    value={item}
                    onChange={e => handleSectionChange(sectionIdx, itemIdx, e.target.value)}
                  />
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