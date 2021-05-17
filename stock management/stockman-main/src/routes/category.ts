import express from "express";
import { authenticate } from "../authentication";
import categoryController from "../controllers/categoryController";

const router = express.Router();

router.post("/add", authenticate, categoryController.add);
router.post("/update/:id", authenticate, categoryController.update);

export default router;
