import { Modal, Button, TextInput, NumberInput } from "@mantine/core";
import { useState } from "react";

export default function EmployeeForm({ onSave, employee }: { onSave: (data: any) => void, employee?: any }) {
  const [form, setForm] = useState(employee || { name: "", age: "", position: "", salary: "" });

  function handleChange(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit() {
    onSave(form);
  }

  return (
    <Modal opened={!!employee} onClose={() => onSave(null)} title={employee ? "Edit Employee" : "Add Employee"}>
      <TextInput label="Name" name="name" value={form.name} onChange={handleChange} />
      <NumberInput label="Age" name="age" value={form.age} onChange={(val) => setForm({ ...form, age: val })} />
      <TextInput label="Position" name="position" value={form.position} onChange={handleChange} />
      <NumberInput label="Salary" name="salary" value={form.salary} onChange={(val) => setForm({ ...form, salary: val })} />
      <Button onClick={handleSubmit} fullWidth mt="md">{employee ? "change" : "Add"} Employee</Button>
    </Modal>
  );
}
