import sinon from 'sinon';
import ProductsController from '../../../src/controllers/product';
import Product from '../../../src/models/product';

describe('Controller: Products', () => {
  const defaultProduct = [{
    __v: 0,
    _id: '123',
    name: 'Default product',
    price: 100,
    quantity: 2,
    active: true,
  }];

  const defaultRequest = {
    params: {},
  };

  describe('create() product', () => {
    const requestWithBody = Object.assign({}, { body: defaultProduct[0] }, defaultRequest);
    const response = {
      send: sinon.spy(),
      status: sinon.stub(),
    };

    it('should call send with a new product', () => {
      class fakeProduct {
        save() {}
      }

      response.status.withArgs(200).returns(response);
      sinon.stub(fakeProduct.prototype, 'save').withArgs().resolves();

      const productsController = new ProductsController(fakeProduct);

      return productsController.create(requestWithBody, response)
        .then(() => {
          sinon.assert.calledWith(response.send);
        });
    });

    context('when an error occurs', () => {
      it('should return 400', () => {
        class fakeProduct {
          save() {}
        }

        response.status.withArgs(400).returns(response);
        sinon.stub(fakeProduct.prototype, 'save').withArgs().rejects({ message: 'Error' });

        const productsController = new ProductsController(fakeProduct);

        return productsController.create(defaultRequest, response)
          .then(() => {
            sinon.assert.calledWith(response.status, 400);
          });
      });
    });
  });

  describe('get() products', () => {
    const request = {};
    const response = {
      send: sinon.spy(),
      status: sinon.stub(),
    };

    it('should call send with a list of products', () => {
      Product.find = sinon.stub();

      Product.find.withArgs({ active: true }).resolves(defaultProduct);
      response.status.withArgs(200).returns(response);
      const productsController = new ProductsController(Product);

      return productsController.get(defaultRequest, response)
        .then(() => {
          sinon.assert.calledWith(response.send, defaultProduct);
        });
    });

    context('when an error occurs', () => {
      it('should return 400', () => {
        response.status.withArgs(400).returns(response);
        Product.find = sinon.stub();
        Product.find.withArgs({ active: true }).rejects({ message: 'Error' });

        const productsController = new ProductsController(Product);

        return productsController.get(request, response)
          .then(() => {
            sinon.assert.calledWith(response.send, 'Error');
          });
      });
    });
  });

  describe('getById()', () => {
    const fakeId = 'a-fake-id';
    const request = {
      params: {
        id: fakeId,
      },
    };
  
    const response = {
      send: sinon.spy(),
      status: sinon.stub(),
    };

    it('should call send with one product', () => {
      Product.find = sinon.stub();
      Product.find.withArgs({ _id: fakeId, active: true }).resolves(defaultProduct);

      const productsController = new ProductsController(Product);

      response.status.withArgs(200).returns(response);

      return productsController.getById(request, response)
        .then(() => {
          sinon.assert.calledWith(response.send, defaultProduct);
        });
    });

    context('when an error occurs', () => {
      it('should return 400 when an error occurs', () => {
        response.status.withArgs(400).returns(response);
        Product.find = sinon.stub();
        Product.find.withArgs({ _id: fakeId, active: true }).rejects({ message: 'Error' });

        const productsController = new ProductsController(Product);

        return productsController.getById(request, response)
          .then(() => {
            sinon.assert.calledWith(response.send, 'Error');
          });
      });
    });
  });

  describe('update() product', () => {
    const fakeId = 'a-fake-id';

    const updatedProduct = {
      _id: fakeId,
      name: 'Updated product',
      price: 150,
      quantity: 2,
    };

    const request = {
      params: {
        id: fakeId,
      },
      body: updatedProduct,
    };

    const response = {
      send: sinon.spy(),
      status: sinon.stub(),
    };

    class fakeProduct {
      static findOneAndUpdate() {}
    }

    const findOneAndUpdateStub = sinon.stub(fakeProduct, 'findOneAndUpdate');
    
    context('when the product has been updated', () => {
      it('should respond with 200 when the product has been updated', () => {
        findOneAndUpdateStub.withArgs({ _id: fakeId }, updatedProduct).resolves(updatedProduct);
        response.status.withArgs(200).returns(response);

        const productsController = new ProductsController(fakeProduct);

        return productsController.update(request, response)
          .then(() => {
            sinon.assert.calledWith(response.send);
          });
      });
    });

    context('when an error occurs', () => {
      it('should return 400', () => {
        findOneAndUpdateStub.withArgs({ _id: fakeId }, updatedProduct).rejects({ message: 'Error' });
        response.status.withArgs(400).returns(response);

        const productsController = new ProductsController(fakeProduct);

        return productsController.update(request, response)
          .then(() => {
            sinon.assert.calledWith(response.send, 'Error');
          });
      });
    });
  });

  describe('delete() product', () => {
    const fakeId = 'a-fake-id';
    const request = {
      params: {
        id: fakeId,
      },
    };
    const response = {
      send: sinon.spy(),
      sendStatus: sinon.spy(),
      status: sinon.stub(),
    };

    class fakeProduct {
      static findOneAndUpdate() {}
    }

    const findOneAndUpdateStub = sinon.stub(fakeProduct, 'findOneAndUpdate');

    context('when the product has been deleted', () => {
      it('should respond with 200 when the product has been deleted', () => {
        findOneAndUpdateStub.withArgs({ _id: fakeId }, { active: false }).resolves([1]);

        const productsController = new ProductsController(fakeProduct);

        return productsController.delete(request, response)
          .then(() => {
            sinon.assert.calledWith(response.sendStatus, 200);
          });
      });
    });

    context('when an error occurs', () => {
      it('should return 400', () => {
        findOneAndUpdateStub.withArgs({ _id: fakeId }, { active: false }).rejects({ message: 'Error' });
        response.status.withArgs(400).returns(response);

        const productsController = new ProductsController(fakeProduct);

        return productsController.delete(request, response)
          .then(() => {
            sinon.assert.calledWith(response.send, 'Error');
          });
      });
    });
  });
});
