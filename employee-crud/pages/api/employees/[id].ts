import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "PUT") {
    const { name, age, position, salary } = req.body;
    const updatedEmployee = await prisma.employee.update({
      where: { id: Number(id) },
      data: { name, age: Number(age), position, salary: Number(salary) },
    });
    return res.status(200).json(updatedEmployee);
  }

  if (req.method === "DELETE") {
    await prisma.employee.delete({ where: { id: Number(id) } });
    return res.status(204).end();
  }

  res.status(405).json({ message: "Method Not Allowed" });
}
