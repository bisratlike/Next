"use client";

import { useState, useEffect } from "react";
import { createUser, getUsers, updateUser, deleteUser } from "@/lib/actions";

import AddModal from "@/components/addmodal";
import EditModal from "@/components/editmodal";
import { Table, Paper, Button, Group, Text } from "@mantine/core";
import { IconUserPlus, IconEdit, IconTrash, IconArrowUp, IconArrowDown } from "@tabler/icons-react";
import Header from "@/components/header";
import SearchFilter from "@/components/searchFilter";

type User = {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
};

type SortKeys = 'name' | 'email' | 'createdAt';
type SortDirection = 'asc' | 'desc' | null;

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKeys>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  const handleSaveUser = (name: string, email: string) => {
    createUser(name, email).then(newUser => {
      setUsers([...users, { ...newUser, createdAt: new Date() }]);
      setIsAddModalOpen(false);
    }).catch(error => {
      console.error("Error saving user:", error);
    });
  };

  const handleUpdateUser = (name: string, email: string) => {
    if (selectedUser) {
      updateUser(selectedUser.id, name, email).then(updatedUser => {
        setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
        setIsEditModalOpen(false);
        setSelectedUser(null);
      }).catch(error => {
        console.error("Error updating user:", error);
      });
    }
  };

  const handleSort = (key: SortKeys) => {
    if (sortKey === key) {
      setSortDirection(prev => {
        if (prev === 'asc') return 'desc';
        if (prev === 'desc') return null;
        return 'asc';
      });
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortDirection) return 0;
    
    const multiplier = sortDirection === 'asc' ? 1 : -1;
    
    switch (sortKey) {
      case 'name':
        return a.name.localeCompare(b.name) * multiplier;
      case 'email':
        return a.email.localeCompare(b.email) * multiplier;
      case 'createdAt':
        return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * multiplier;
      default:
        return 0;
    }
  });

  const SortableTh = ({ children, sortKey: key }: { children: React.ReactNode; sortKey: SortKeys }) => (
    <Table.Th 
      className="py-4 px-6 cursor-pointer hover:bg-pink-50 transition-colors"
      onClick={() => handleSort(key)}
    >
      <Group gap="xs">
        <Text span className="text-pink-800">
          {children}
        </Text>
        {sortKey === key && sortDirection && (
          sortDirection === 'asc' ? <IconArrowUp size={14} /> : <IconArrowDown size={14} />
        )}
      </Group>
    </Table.Th>
  );

  const rows = sortedUsers.map((user) => (
    <Table.Tr key={user.id} className="hover:bg-gray-50 transition-colors">
      <Table.Td className="py-3 px-6">{user.name}</Table.Td>
      <Table.Td className="py-3 px-6">{user.email}</Table.Td>
      <Table.Td className="py-3 px-6">
        {new Date(user.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })}
      </Table.Td>
      <Table.Td className="py-3 px-6">
        <Group gap="sm">
          <Button
            leftSection={<IconEdit size={16} />}
            variant="light"
            color="pink"
            onClick={() => {
              setSelectedUser(user);
              setIsEditModalOpen(true);
            }}
          >
            Edit
          </Button>
          <Button
            leftSection={<IconTrash size={16} />}
            variant="outline"
            color="red"
            onClick={() => {
              deleteUser(user.id)
                .then(() => setUsers(users.filter(u => u.id !== user.id)))
                .catch(console.error)
            }}
          >
            Delete
          </Button>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div className="min-h-screen flex flex-col">
      <Header onAddClick={() => setIsAddModalOpen(true)} />
      
      <div className="flex-1 bg-gray-50 pt-8">
        <SearchFilter searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        
        <main className="max-w-6xl mx-auto px-8 pb-8">
          <Paper withBorder shadow="sm" className="rounded-xl overflow-hidden">
            <Table striped highlightOnHover>
              <Table.Thead className="bg-pink-100">
                <Table.Tr>
                  <SortableTh sortKey="name">Name</SortableTh>
                  <SortableTh sortKey="email">Email</SortableTh>
                  <SortableTh sortKey="createdAt">Joined Date</SortableTh>
                  <Table.Th className="py-4 px-6 text-pink-800">Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
            
            {sortedUsers.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                No users found matching your search
              </div>
            )}
          </Paper>
        </main>
      </div>

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
    </div>
  );
}