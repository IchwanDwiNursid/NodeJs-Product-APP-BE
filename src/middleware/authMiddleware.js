import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/responseError.js";
export const verifyUser = async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({
      errors: "Unauthorized",
    });
  }
  const user = await prismaClient.user.findFirst({
    where: {
      uuid: req.session.userId,
    },
  });

  if (!user) {
    throw new ResponseError(404, "User Not Found");
  }

  req.userId = user.id;
  req.role = user.role;
  next();
};

export const adminOnly = async (req, res, next) => {
  if (req.role !== "admin") {
    return res.status(403).json({
      errors: "Forbiden",
    });
  }

  next();
};
