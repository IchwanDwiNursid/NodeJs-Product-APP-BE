import userValidation from "../validation/userValidation.js";
import { validate } from "../validation/validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/responseError.js";
import { v4 as uuid } from "uuid";
import argon2 from "argon2";
import { logger } from "../application/logging.js";
const createUser = async (request) => {
  const user = validate(userValidation.registerUserValidation, request);

  if (user.password !== user.confPassword) {
    throw new ResponseError(400, "Password Not Match");
  }

  const countUser = await prismaClient.user.count({
    where: {
      name: user.name,
    },
  });

  if (countUser === 1) {
    throw new ResponseError(400, "User Already Exist");
  }

  const countUser2 = await prismaClient.user.count({
    where: {
      email: user.email,
    },
  });

  if (countUser2 === 1) {
    throw new ResponseError(400, "User Already Exist");
  }

  user.password = await argon2.hash(user.password);

  user.uuid = uuid().toString();

  return await prismaClient.user.create({
    data: {
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      uuid: user.uuid,
    },
  });
};

const getUser = async () => {
  return await prismaClient.user.findMany({
    select: {
      uuid: true,
      name: true,
      email: true,
      role: true,
    },
  });
};

const getUserById = async (userId) => {
  const user = validate(userValidation.getUserValidation, userId);

  console.log(`---------------> ${user}`);

  const result = await prismaClient.user.findFirst({
    where: {
      id: user,
    },
    select: {
      uuid: true,
      name: true,
      email: true,
      role: true,
    },
  });

  if (!result) {
    throw new ResponseError(400, "User Not Found");
  }

  return result;
};

const updateUser = async (request, userId) => {
  const user = validate(userValidation.getUserValidation, userId);

  const result = await prismaClient.user.findFirst({
    where: {
      id: user,
    },
  });

  if (!result) {
    throw new ResponseError(400, "User Not Found");
  }

  const revers = validate(userValidation.updateUserValidation, request);

  const data = {};

  if (revers.name) {
    data.name = revers.name;
  }

  if (revers.password) {
    data.password = await argon2.hash(revers.password);
  }

  if (revers.email) {
    data.email = revers.email;
  }

  return prismaClient.user.update({
    where: {
      id: user,
    },
    data: data,
    select: {
      uuid: true,
      name: true,
      email: true,
      role: true,
    },
  });
};

const deleteUser = async (userId) => {
  const user = validate(userValidation.getUserValidation, userId);

  const result = await prismaClient.user.findFirst({
    where: {
      id: user,
    },
  });

  if (!result) {
    throw new ResponseError(400, "User Not Found");
  }

  return await prismaClient.user.delete({
    where: {
      id: user,
    },
  });
};

export default {
  createUser,
  getUser,
  getUserById,
  updateUser,
  deleteUser,
};
