import productController from "../controller/productController.js";
import express from "express";
import { verifyUser } from "../middleware/authMiddleware.js";

export const productRouter = express.Router();
productRouter.use(verifyUser);

productRouter.get("/products", productController.getProduct);
productRouter.post("/products", productController.createProduct);
productRouter.get("/products/:productId", productController.getProductById);
productRouter.patch("/products/:productId", productController.updateProduct);
productRouter.delete("/products/:productId", productController.removeProduct);
