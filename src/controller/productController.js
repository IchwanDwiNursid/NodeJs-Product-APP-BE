import productsService from "../service/productsService.js";

const getProduct = async (req, res, next) => {
  try {
    const role = req.role;
    const userId = req.userId;
    const result = await productsService.getProduct(role, userId);
    res.status(200).send({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const userId = req.userId;
    console.log(userId);
    const request = req.body;
    request.user_id = userId;
    const result = await productsService.createProducts(request, userId);
    res.status(200).send({
      data: "Product Created Succesfully",
    });
  } catch (e) {
    next(e);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const user = {
      role: req.role,
      userId: req.userId,
    };
    const productId = req.params.productId;
    const result = await productsService.getProductsById(productId, user);
    res.status(200).send({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const user = {
      role: req.role,
      userId: req.userId,
    };
    const request = req.body;
    request.id = req.params.productId;
    const result = await productsService.updateProduct(request, user);
    res.status(200).send({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const removeProduct = async (req, res, next) => {
  try {
    const user = {
      userId: req.userId,
      role: req.role,
    };
    const productId = req.params.productId;
    await productsService.deleteProduct(productId, user);
    res.status(200).send({
      data: "Delete Succesfully",
    });
  } catch (e) {
    next(e);
  }
};

export default {
  getProduct,
  createProduct,
  getProductById,
  updateProduct,
  removeProduct,
};
