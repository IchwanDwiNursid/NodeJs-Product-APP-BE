import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/responseError.js";
import { validate } from "../validation/validation.js";
import productValidation from "../validation/productValidation.js";

const getProduct = async (role, userId) => {
  if (role == "admin") {
    const product = await prismaClient.product.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return product;
  } else {
    const product = await prismaClient.product.findMany({
      where: {
        user_id: userId,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
    return product;
  }
};

const createProducts = async (request, userId) => {
  const product = validate(productValidation.createProductValidation, request);
  product.user_id = userId;

  const createProduct = await prismaClient.product.create({
    data: product,
  });

  return createProduct;
};

const getProductsById = async (productId, user) => {
  const req = validate(productValidation.getProductValidation, productId);
  console.log(req);

  const getId = await prismaClient.product.findFirst({
    where: {
      id: req,
    },
  });

  if (!getId) {
    throw new ResponseError(404, "Product Not Found");
  }

  if (user.role == "admin") {
    const product = await prismaClient.product.findFirst({
      where: {
        id: getId.id,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return product;
  } else {
    const product = await prismaClient.product.findMany({
      where: {
        id: getId.id,
        user_id: user.userId,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
    return product;
  }
};

const updateProduct = async (request, user) => {
  const req = validate(productValidation.updateProductValidation, request);

  const getProduct = await prismaClient.product.findFirst({
    where: {
      id: req.id,
    },
  });

  if (!getProduct) {
    throw new ResponseError(404, "Product Not Found");
  }

  if (user.role == "admin") {
    const product = await prismaClient.product.update({
      where: {
        id: getProduct.id,
      },
      data: req,
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return product;
  } else {
    if (user.userId !== getProduct.user_id) {
      throw new ResponseError(403, "Forbiden");
    }
    const product = await prismaClient.product.update({
      where: {
        id: getProduct.id,
      },
      data: req,
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
    return product;
  }
};

const deleteProduct = async (productId, user) => {
  const getId = validate(productValidation.getProductValidation, productId);

  const getData = await prismaClient.product.findFirst({
    where: {
      id: getId,
    },
  });

  console.log(getData);
  if (!getData) {
    throw new ResponseError(404, "Product Not Found");
  }

  if (user.role == "admin") {
    const product = await prismaClient.product.delete({
      where: {
        id: getId,
      },
    });
    return product;
  } else {
    if (user.userId !== getData.user_id) {
      throw new ResponseError(403, "Forbiden");
    }
    const product = await prismaClient.product.delete({
      where: {
        id: getId,
      },
    });
    return product;
  }
};
export default {
  getProduct,
  createProducts,
  getProductsById,
  updateProduct,
  deleteProduct,
};
