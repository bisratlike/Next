import React, { useState } from 'react';
import { Modal, Button, TextInput } from '@mantine/core';

type AddModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, email: string) => void;
};

export default function AddModal({ isOpen, onClose, onSave }: AddModalProps) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleSave = () => {
    if (!name || !email) {
      alert("Both fields are required.");
      return;
    }
    onSave(name, email);
  };

  return (
    <Modal opened={isOpen} onClose={onClose} title="Add User">
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
}