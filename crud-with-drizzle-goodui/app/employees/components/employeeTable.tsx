import React from 'react';
import { Table, Button, Group } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { User } from "./types";

type EmployeeTableProps = {
  users: User[];
  cursor: number | undefined;
};

const EmployeeTable: React.FC<EmployeeTableProps> = ({ users, cursor }) => {
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              <td>
                <Button component="a" href={`/edit/${user.id}`} variant="outline" color="pink">
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {users.length > 0 && (
        <Group position="center" mt="md">
          <Button
            component="a"
            href={`/?cursor=${cursor}`}
            variant="outline"
            color="pink"
            rightIcon={<IconArrowRight size={18} />}
          >
            Next
          </Button>
        </Group>
      )}
    </div>
  );
};

export default EmployeeTable;