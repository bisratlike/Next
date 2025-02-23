import React, { useState, useEffect } from 'react';
import { Modal, Button, TextInput } from '@mantine/core';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, email: string) => void;
  initialData: { name: string; email: string };
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [name, setName] = useState(initialData.name);
  const [email, setEmail] = useState(initialData.email);

  useEffect(() => {
    setName(initialData.name);
    setEmail(initialData.email);
  }, [initialData]);

  const handleSave = () => {
    if (!name || !email) {
      alert("Both fields are required.");
      return;
    }
    onSave(name, email);
  };

  return (
    <Modal opened={isOpen} onClose={onClose} title="Edit User">
      <div className="space-y-4">
        <TextInput
          label="Name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Name"
        />
        <TextInput
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          placeholder="Email"
        />
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
    </Modal>
  );
};

export default EditModal;