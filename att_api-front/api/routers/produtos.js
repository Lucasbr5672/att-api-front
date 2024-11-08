import express from 'express';
import { getProduto, addProduto, updateProduto, deleteProduto } from '../controllers/produtos.js';

const router = express.Router();

router.get("/", getProduto);

router.post("/", addProduto);

router.put("/:id", updateProduto);

router.delete("/:id", deleteProduto);

export default router;