import { Router } from "express";
import multer from "multer";

import { CreateUserControler } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";

import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";

import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";

import { AddItemController } from "./controllers/order/AddItemController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";
import { SendOrdeController } from "./controllers/order/SendOrderController";
import { ListOrdersController } from "./controllers/order/ListOrdersController";
import { DetailOrderController } from "./controllers/order/DetailOrderController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";

import { isAutenticated } from "./middlewares/isAutenticated";

import uploadConfig from "./config/multer";

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

// -- ROUTES USER --
router.post("/users", new CreateUserControler().handle);

router.post("/session", new AuthUserController().handle);

router.get("/userinfo", isAutenticated, new DetailUserController().handle);

// -- ROUTES CATEGORY --

router.post("/category", isAutenticated, new CreateCategoryController().handle);

router.get("/category", isAutenticated, new ListCategoryController().handle);

// -- ROUTES PRODUCT --

router.post(
  "/product",
  isAutenticated,
  upload.single("file"),
  new CreateProductController().handle
);

router.get(
  "/category/product",
  isAutenticated,
  new ListByCategoryController().handle
);

export { router };

// -- ROUTES ORDER --
router.post("/order", isAutenticated, new CreateOrderController().handle);

router.delete("/order", isAutenticated, new RemoveOrderController().handle);

router.post("/order/add", isAutenticated, new AddItemController().handle);

router.delete(
  "/order/remove",
  isAutenticated,
  new RemoveItemController().handle
);

router.put("/order/send", isAutenticated, new SendOrdeController().handle);

router.get("/orders", isAutenticated, new ListOrdersController().handle);

router.get("/order/detail", isAutenticated, new DetailOrderController().handle);

router.put("/order/finish", isAutenticated, new FinishOrderController().handle);
