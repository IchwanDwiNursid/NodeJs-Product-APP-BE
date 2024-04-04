import argon2 from "argon2";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/responseError.js";
import authValidation from "../validation/authValidation.js";
import { validate } from "../validation/validation.js";

export const login = async (session, request) => {
  const data = validate(authValidation.loginValidation, request);

  const checkUser = await prismaClient.user.findUnique({
    where: {
      email: data.email,
    },
    select: {
      uuid: true,
      name: true,
      email: true,
      password: true,
      role: true,
    },
  });

  console.log(checkUser.name);

  const match = await argon2.verify(checkUser.password, data.password);

  if (!checkUser.password) {
    throw new ResponseError(404, "User Not Found");
  }

  if (!match) {
    throw new ResponseError(404, "Email or Password Wrong");
  }

  session.userId = checkUser.uuid;
  return {
    uuid: checkUser.uuid,
    name: checkUser.name,
    email: checkUser.email,
    role: checkUser.role,
  };
};

const userLogin = async (session) => {
  if (!session.userId) {
    throw new ResponseError(401, "Please log in first");
  }

  return await prismaClient.user.findFirst({
    where: {
      uuid: session.userId,
    },
    select: {
      uuid: true,
      name: true,
      email: true,
      role: true,
    },
  });
};

const logout = async (session) => {
  session.destroy((err) => {
    if (err) {
      throw new ResponseError(400, "Can't Logout");
    }
  });
};

export default {
  login,
  logout,
  userLogin,
};
