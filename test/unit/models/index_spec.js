import { expect } from 'chai';

import Product from '../../../src/models';

describe('Model: Product', () => {
  context('when a empty product is passed', () => {
    const product = new Product();

    it('should be invalid if name is empty', () => {
      product.validate((err) => {
        expect(err.errors.name).to.exist;
        done();
      });
    });

    it('should be invalid if price is empty', () => {
      product.validate((err) => {
        expect(err.errors.price).to.exist;
        done();
      });
    });

    it('should be invalid if quantity is empty', () => {
      product.validate((err) => {
        expect(err.errors.quantity).to.exist;
        done();
      });
    });
  });

  context('when a product is passed', () => {
    const product = new Product({
      name: 'Product 1',
      price: '120',
      quantity: 1,
    });

    it('should be valid if name is a string', () => {
      product.validate((err) => {
        expect(err.errors.name).to.not.exist;
        done();
      });
    });

    it('should be invalid if price is not a number', () => {
      product.validate((err) => {
        expect(err.errors.price).to.exist;
        done();
      });
    });

    it('should be valid if quantity is a number', () => {
      product.validate((err) => {
        expect(err.errors.quantity).to.not.exist;
        done();
      });
    });
  });
});
