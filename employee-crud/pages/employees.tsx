import { useState, useEffect } from "react";
import EmployeeTable from "@/components/EmployeeTable";
import EmployeeForm from "@/components/EmployeeForm";
import { Button, TextInput } from "@mantine/core";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]); 
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); 

  useEffect(() => {
    fetch("/api/employees")
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) => console.error("Error fetching employees:", err));
  }, []);

  function handleEdit(employee: any) {
    setSelectedEmployee(employee);
  }

  function handleSave(employee: any) {
    if (employee) {
      const method = employee.id ? "PUT" : "POST";
      const url = employee.id ? `/api/employees/${employee.id}` : "/api/employees";

      fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee),
      })
        .then((res) => res.json())
        .then((updatedEmployee) => {
          setSelectedEmployee(null);
          setEmployees((prev) =>
            employee.id
              ? prev.map((emp) => (emp.id === updatedEmployee.id ? updatedEmployee : emp))
              : [...prev, updatedEmployee]
          );
        })
        .catch((err) => console.error("Error saving employee:", err));
    } else {
      setSelectedEmployee(null);
    }
  }

  function handleDelete(id: number) {
    fetch(`/api/employees/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setEmployees((prev) => prev.filter((emp) => emp.id !== id));
      })
      .catch((err) => console.error("Error deleting employee:", err));
  }

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Button onClick={() => setSelectedEmployee({})} style={{ marginBottom: "10px" }}>
        Add Employee
      </Button>

      <TextInput
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "20px", width: "300px" }}
      />

      <EmployeeTable employees={filteredEmployees} onEdit={handleEdit} onDelete={handleDelete} />

      {selectedEmployee !== null && <EmployeeForm employee={selectedEmployee} onSave={handleSave} />}
    </>
  );
}
