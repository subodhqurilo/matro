'use client';
import React, { useState } from 'react';
import { Edit3 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Modal from './Modal';

const initialAbout = `I am a software engineer by profession and a creative thinker at heart. I value intellect, honesty, and kindness. Outside of work, I enjoy reading, exploring new places, and spending quality time with family. I am looking for someone who is respectful, supportive, and shares a positive outlook towards life.`;

const AboutMeSection: React.FC = () => {
  const [about, setAbout] = useState(initialAbout);
  const [modalOpen, setModalOpen] = useState(false);
  const [editValue, setEditValue] = useState(about);

  const handleEdit = () => {
    setEditValue(about);
    setModalOpen(true);
  };

  const handleSave = () => {
    setAbout(editValue);
    setModalOpen(false);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">About me</h3>
        <Edit3
          className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600"
          onClick={handleEdit}
        />
      </div>
      <p className="text-gray-600 text-sm leading-relaxed">{about}</p>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="flex flex-col items-center justify-center gap-3 mb-4">
          <h2 className="text-xl font-Lato text-gray-900">Edit About Me</h2>
        </div>
        <div className="mb-4 w-full">
          <Label className="text-sm font-Inter text-gray-700 mb-2 block">
            About Me
          </Label>
          <textarea
            className="w-full rounded-md border border-gray-300 p-2 font-Inter bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-700"
            rows={5}
            value={editValue}
            onChange={e => setEditValue(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            className="bg-gray-100 text-gray-700 hover:bg-gray-200"
            onClick={() => setModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            className="bg-rose-700 hover:bg-rose-800 text-white"
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default AboutMeSection; 