import { Router } from "express";
import {
  addProductRating,
  createProduct,
  getAllDeletedProducts,
  getAllProducts,
  getProductByCode,
  getProductById,
  getProductMenu,
  restoreDeleteProduct,
  softDeleteProduct,
  updateProduct,
} from "./product.controller.js";

const router = Router();

router.get("/get-all-products", getAllProducts);

//  this is get product by id in the admin panel
router.get("/get-single-product-byID/:id", getProductById);

//  this is get product by code in the client panel
router.get("/get-single-product/:productCode", getProductByCode);

router.get("/menu", getProductMenu);

router.get("/deleted-products", getAllDeletedProducts);

router.post("/create-product", createProduct);

router.post("/products/:id/rating", addProductRating);

router.patch("/update-product/:id", updateProduct);

router.patch("/delete-product/:id", softDeleteProduct);

router.patch("/restore-product/:id", restoreDeleteProduct);

export const ProductRoute = router;
