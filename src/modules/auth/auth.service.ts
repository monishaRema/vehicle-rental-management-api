
import bcrypt from "bcryptjs";
import { AppError } from "../../errors/AppError.js";
import { authRepo } from "./auth.repository.js";
import { RegisterPayload } from "./auth.types.js";


async function registerUserService(payload:RegisterPayload){
    const {name,email,password} = payload;

    const userExists = await authRepo.getUserByEmail(email)

    if(userExists){
        throw new AppError(409, "User with this email already exists")
    }

    const saltRound = Number(process.env.BCRYPT_SALT_ROUNDS || 10);
    const passwordHash = await bcrypt.hash(password,saltRound);

    const user = await authRepo.registerUserRepo({name,email,passwordHash})

    return user;
}

export const authService = {
    registerUserService,
}