import { Table, Button, Card, Text, ScrollArea, Group, ActionIcon } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";

interface Employee {
  id: number;
  name: string;
  age: number;
  position: string;
  salary: number;
}

interface EmployeeTableProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: number) => void;
}

export default function EmployeeTable({ employees, onEdit, onDelete }: EmployeeTableProps) {
  return (
    <Card shadow="md" p="lg" radius="md" withBorder>
      <Text size="xl" weight={600} mb="md">Employee List</Text>
      <ScrollArea>
        <Table
          striped
          highlightOnHover
          withBorder
          withColumnBorders
          style={{
            borderCollapse: "collapse", // Ensures proper border separation
            width: "100%",
          }}
        >
          <thead>
            <tr>
              <th style={{ padding: "10px", textAlign: "left", borderBottom: "2px solid #ccc", width: "20%" }}>Name</th>
              <th style={{ padding: "10px", textAlign: "left", borderBottom: "2px solid #ccc", width: "15%" }}>Age</th>
              <th style={{ padding: "10px", textAlign: "left", borderBottom: "2px solid #ccc", width: "20%" }}>Position</th>
              <th style={{ padding: "10px", textAlign: "left", borderBottom: "2px solid #ccc", width: "20%" }}>Salary</th>
              <th style={{ padding: "10px", textAlign: "center", borderBottom: "2px solid #ccc", width: "25%" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees?.length > 0 ? (
              employees.map((employee) => (
                <tr key={employee.id}>
                  <td style={{ padding: "10px", borderBottom: "1px solid #ccc", textAlign: "left" }}>
                    {employee.name}
                  </td>
                  <td style={{ padding: "10px", borderBottom: "1px solid #ccc", textAlign: "left" }}>
                    {employee.age}
                  </td>
                  <td style={{ padding: "10px", borderBottom: "1px solid #ccc", textAlign: "left" }}>
                    {employee.position}
                  </td>
                  <td style={{ padding: "10px", borderBottom: "1px solid #ccc", textAlign: "left" }}>
                    ${employee.salary.toLocaleString()}
                  </td>
                  <td style={{ padding: "10px", borderBottom: "1px solid #ccc", textAlign: "center" }}>
                    <Group spacing="xs" position="center">
                      <ActionIcon color="blue" onClick={() => onEdit(employee)}>
                        <IconEdit size={20} />
                      </ActionIcon>
                      <ActionIcon color="red" onClick={() => onDelete(employee.id)}>
                        <IconTrash size={20} />
                      </ActionIcon>
                    </Group>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    padding: "20px",
                    borderBottom: "1px solid #ccc",
                  }}
                >
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </ScrollArea>
    </Card>
  );
}
