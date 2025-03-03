"use server";
import { db } from "@/lib/db";
import { users } from "@/db/schema";
// import { eq} from "drizzle-orm";
import { eq, asc, gt, fn } from "drizzle-orm";

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




export async function getUsers(cursor?: number, pageSize = 10) {
  try {
    const userList = await db
      .select()
      .from(users)
      .where(cursor ? gt(users.id, cursor) : undefined)
      .limit(pageSize)
      .orderBy(asc(users.id));

      const total = await db
      .select(db.fn.count(users.id).as('count'))
      .from(users);
    
  
      return { users: userList, total: total[0].count };

    // return { users: userList, total: total[0].count };
  } catch (error) {
    console.error("Error getting users:", error);
    throw new Error("Could not get users");
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