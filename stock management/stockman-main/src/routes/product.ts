import express from "express";
import productController from "../controllers/productController";
import { authenticate } from "../authentication";

const router = express.Router();

router.post("/add", authenticate, productController.add);
router.get("/delete/:id", authenticate, productController.delete);
router.post("/update/:id", authenticate, productController.update);
router.get("/:id", authenticate, productController.id);

export default router;
