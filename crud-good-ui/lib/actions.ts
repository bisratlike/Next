"use server";
import { db } from "@/lib/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function createUser(name: string, email: string) {
    try {
      const [newUser] = await db.insert(users)
        .values({ name, email })
        .returning(); 
      return newUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Could not create user");
    }
  }
// export async function createUser(name: string, email: string) {
//     const newEmployee = await db.insert(users)
//     .values({ name,email})
//     .returning();
//     return newEmployee}








export async function getUsers() {
    try {
        return await db.select().from(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Could not fetch users");
    }
}

export async function updateUser(id: number, name: string, email: string) {
    try {
        const [updatedUser]=await db.update(users).set({ name, email }).where(eq(users.id, id)).returning();

        return updatedUser;
    } catch (error) {
        console.error("Error updating user:", error);
        throw new Error("Could not update user");
    }
}

export async function deleteUser(id: number) {
    try {
      const [deletedUser] = await db.delete(users)
        .where(eq(users.id, id))
        .returning({ deletedId: users.id });
      return deletedUser.deletedId;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw new Error("Could not delete user");
    }
  }