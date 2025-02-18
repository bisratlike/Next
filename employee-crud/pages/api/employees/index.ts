import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const employees = await prisma.employee.findMany();
    return res.status(200).json(employees);
  }

  if (req.method === "POST") {
    const { name, age, position, salary } = req.body;
    const newEmployee = await prisma.employee.create({
      data: { name, age: Number(age), position, salary: Number(salary) },
    });
    return res.status(201).json(newEmployee);
  }

  res.status(405).json({ message: "Method Not Allowed" });
}
