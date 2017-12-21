import supertest from 'supertest';
import { expect } from 'chai';
import Product from '../../../src/models/product';
import setupApp from '../../../src/app';

describe('Routes: Products', () => {
  let request;

  before(async () => {
    const app = await setupApp();
    request = supertest(app);
  });

  const defaultId = '5a3be326421b5a4dcba8c133';
  const defaultProduct = {
    name: 'Default product',
    price: 100,
    quantity: 2,
  };

  beforeEach(async () => {
    const product = new Product(defaultProduct);
    await Product.remove({});
    return product.save();
  });

  afterEach(() => Product.remove({}));

  // CREATE
  describe('POST /products', () => {
    context('when posting a product', () => {
      it('should return a new product with status code 200', (done) => {
        const customId = '56cb91bdc3464f14678934ba';
        const newProduct = Object.assign({}, { _id: customId, __v: 0 }, defaultProduct);
        const expectedSavedProduct = {
          __v: 0,
          _id: customId,
          name: 'Default product',
          price: 100,
          quantity: 2,
        };

        request
          .post('/products')
          .send(newProduct)
          .end((err, res) => {
            expect(res.statusCode).to.eql(200);
            expect(res.body).to.eql(expectedSavedProduct);
            done(err);
          });
      });
    });
  });

  // READ
  // TODO READ

  // UPDATE
  describe('PUT /products/:id', () => {
    context('when editing a product', () => {
      it('should update the product and return 200 as status code', (done) => {
        const customProduct = {
          name: 'Custom name',
        };
        const updatedProduct = Object.assign({}, customProduct, defaultProduct);

        request
          .put(`/products/${defaultId}`)
          .send(updatedProduct)
          .end((err, res) => {
            expect(res.status).to.eql(200);
            done(err);
          });
      });
    });
  });

  // DELETE
  describe('DELETE /products/:id', () => {
    context('when deleting a product', () => {
      it('should delete a product and return 200 as status code', (done) => {
        request
          .delete(`/products/${defaultId}`)
          .end((err, res) => {
            expect(res.status).to.eql(200);
            done(err);
          });
      });
    });
  });
});
