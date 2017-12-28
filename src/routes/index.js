import express from 'express';

import ProductsController from '../controllers';

const BASE_URL = '/products';

export default express.Router()
  .post(`${BASE_URL}/`, ProductsController.create)
  .get(`${BASE_URL}/`, ProductsController.get)
  .get(`${BASE_URL}/:id`, ProductsController.getById)
  .put(`${BASE_URL}/:id`, ProductsController.update)
  .delete(`${BASE_URL}/:id`, ProductsController.delete)
  .all('*', ProductsController.notFound);
