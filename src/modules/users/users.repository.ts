import { prisma } from "../../lib/prisma.js";

async function getAllUsersRepo() {
  // SELECT id, name, email, role, status, createAt, updatedAt FROM user WHERE id = $1, $id;

  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

async function getSingleUserRepo(id: string) {
  return await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

async function updateUserStatusRepo(id: string, status: "ACTIVE" | "INACTIVE") {
  return await prisma.user.update({
    where: {
      id,
    },
    data: {
      status,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

async function updateUserRoleRepo(id:string,role: "USER" | "ADMIN") {
     return await prisma.user.update({
    where: {
      id,
    },
    data: {
      role,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

export const usersRepo = {
  getAllUsersRepo,
  getSingleUserRepo,
  updateUserStatusRepo,
  updateUserRoleRepo,
};
