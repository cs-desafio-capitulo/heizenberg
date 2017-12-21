import express from 'express';

import ProductsController from '../controllers/product';
import Product from '../models/product';

const router = express.Router();
const productsController = new ProductsController(Product);

const BASE_URL = '/products';

// CREATE
router.post(`${BASE_URL}/`, (req, res) => productsController.create(req, res));

// READ
router.get(`${BASE_URL}/`, (req, res) => productsController.get(req, res));
router.get(`${BASE_URL}/:id`, (req, res) => productsController.getById(req, res));

// UPDATE
router.put(`${BASE_URL}/:id`, (req, res) => productsController.update(req, res));

// DELETE
router.delete(`${BASE_URL}/:id`, (req, res) => productsController.delete(req, res));

export default router;
