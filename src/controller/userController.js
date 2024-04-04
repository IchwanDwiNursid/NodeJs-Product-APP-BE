import userService from "../service/userService.js";

const register = async (req, res, next) => {
  try {
    const request = req.body;
    const result = await userService.createUser(request);
    res.status(200).send({
      data: "Register Succesfully",
    });
  } catch (e) {
    next(e);
  }
};

const getUser = async (req, res, next) => {
  try {
    const result = await userService.getUser();
    res.status(200).send({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const result = await userService.getUserById(userId);
    res.status(200).send({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const request = req.body;
    const result = await userService.updateUser(request, userId);
    res.status(200).send({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const result = await userService.deleteUser(userId);
    res.status(200).send({
      data: "User Was Deleted",
    });
  } catch (e) {
    next(e);
  }
};

export default {
  register,
  getUser,
  getUserById,
  updateUser,
  deleteUser,
};
