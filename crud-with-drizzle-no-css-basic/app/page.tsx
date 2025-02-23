"use client";

import { useState, useEffect } from "react";
import { createUser, getUsers, updateUser, deleteUser } from "@/lib/actions";
import AddModal from "@/components/addmodal";
import EditModal from "@/components/editmodal";

type User = {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
};

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  const handleSaveUser = (name: string, email: string) => {
    createUser(name, email)
      .then(newUser => {
        setUsers(prev => [...prev, {
          ...newUser,
          createdAt: new Date() 
        }]);
        setIsAddModalOpen(false);
      })
      .catch(error => {
        console.error("Error saving user:", error);
      });
  };

  const handleUpdateUser = (name: string, email: string) => {
    if (selectedUser) {
      updateUser(selectedUser.id, name, email)
        .then(updatedUser => {
          setUsers(users.map(user => 
            user.id === selectedUser.id ? { ...user, name, email } : user
          ));
          setIsEditModalOpen(false);
          setSelectedUser(null);
        })
        .catch(error => {
          console.error("Error updating user:", error);
        });
    }
  };

  return (
    <div>
      <button onClick={() => setIsAddModalOpen(true)}>Add User</button>
      <AddModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onSave={handleSaveUser} 
      />
      <EditModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        onSave={handleUpdateUser} 
        initialData={selectedUser || { name: '', email: '' }} 
      />
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
            <button onClick={() => {
              setSelectedUser(user);
              setIsEditModalOpen(true);
            }}>Update</button>
         
<button onClick={() => {
  deleteUser(user.id)
    .then(deletedId => {
      setUsers(users.filter(user => user.id !== deletedId));
    })
    .catch(error => {
      console.error("Error deleting user:", error);
    });
}}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}