import express from "express";
import { uploadMedia } from "./imagekit.controler.js";
import multer from "multer";

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1 * 1024 * 1024 * 1024 },
});

router.post("/", upload.array("foto"), uploadMedia);

export default router;
