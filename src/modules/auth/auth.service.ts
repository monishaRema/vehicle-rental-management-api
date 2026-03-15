import bcrypt from "bcryptjs";
import { AppError } from "../../errors/AppError.js";
import { authRepo } from "./auth.repository.js";
import { LoginPayload, RegisterPayload } from "./auth.types.js";
import { generateToken } from "../../utils/generateToken.js";

async function registerUserService(payload: RegisterPayload) {
  const { name, email, password } = payload;

  const userExists = await authRepo.getUserByEmail(email);

  if (userExists) {
    throw new AppError(409, "User with this email already exists");
  }

  const saltRound = Number(process.env.BCRYPT_SALT_ROUNDS || 10);
  const passwordHash = await bcrypt.hash(password, saltRound);

  const user = await authRepo.registerUserRepo({ name, email, passwordHash });

  return user;
}

async function loginUserService(payload: LoginPayload) {
  // get payload
  // hit repo for user
  // check account exists with the email or not
  // compare both password
  // login
  // create token
  // send token with response

  const { email, password } = payload;

  const user = await authRepo.getUserByEmail(email);

  if (!user) {
    throw new AppError(404, "User not exists with this email");
  }

  if (user.status !== "ACTIVE") {
    throw new AppError(403, "User account is inactive");
  }
  const isPasswordMatched = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordMatched) {
    throw new AppError(401, "Invalid password");
  }

  const token = generateToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  };
}

async function getMeService(id:string){

   const user = await authRepo.getMeRepo(id);

  if (!user) {
    throw new AppError(404, "User not found");
  }

  return user;

}

export const authService = {
  registerUserService,
  loginUserService,
  getMeService
};
