import authService from "../service/authService.js";

const login = async (req, res, next) => {
  try {
    const request = req.body;
    const session = req.session;
    const result = await authService.login(session, request);
    res.status(200).send({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const logout = async (req, res, next) => {
  try {
    const session = req.session;
    await authService.logout(session);
    res.status(200).send({
      message: "Anda Telah Logout",
    });
  } catch (e) {
    next(e);
  }
};

const userLogin = async (req, res, next) => {
  try {
    const session = req.session;
    const result = await authService.userLogin(session);
    res.status(200).send({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  login,
  logout,
  userLogin,
};
