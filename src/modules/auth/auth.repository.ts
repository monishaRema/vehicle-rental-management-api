import { prisma } from "../../lib/prisma.js"


async function getUserByEmail(email:string) {

    return await prisma.user.findUnique({
        where:{
            email
        }
    })
    
}


async function registerUserRepo(data:{
    name:string;
    email:string;
    passwordHash:string;
}){
    return await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      passwordHash: data.passwordHash,
      role: "USER",
      status: "ACTIVE",
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
  })
}

export const authRepo = {
    getUserByEmail,
    registerUserRepo
}