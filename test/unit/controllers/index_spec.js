import sinon from 'sinon';
import ProductsController from '../../../src/controllers';

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

      return ProductsController.create(requestWithBody, response)
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

        return ProductsController.create(defaultRequest, response)
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
      response.status.withArgs(200).returns(response);

      return ProductsController.get(defaultRequest, response)
        .then(() => {
          sinon.assert.calledWith(response.send, defaultProduct);
        });
    });

    context('when an error occurs', () => {
      it('should return 400', () => {
        response.status.withArgs(400).returns(response);

        return ProductsController.get(request, response)
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
      response.status.withArgs(200).returns(response);

      return ProductsController.getById(request, response)
        .then(() => {
          sinon.assert.calledWith(response.send, defaultProduct);
        });
    });

    context('when an error occurs', () => {
      it('should return 400 when an error occurs', () => {
        response.status.withArgs(400).returns(response);

        return ProductsController.getById(request, response)
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

        return ProductsController.update(request, response)
          .then(() => {
            sinon.assert.calledWith(response.send);
          });
      });
    });

    context('when an error occurs', () => {
      it('should return 400', () => {
        findOneAndUpdateStub.withArgs({ _id: fakeId }, updatedProduct).rejects({ message: 'Error' });
        response.status.withArgs(400).returns(response);

        return ProductsController.update(request, response)
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

        return ProductsController.delete(request, response)
          .then(() => {
            sinon.assert.calledWith(response.sendStatus, 200);
          });
      });
    });

    context('when an error occurs', () => {
      it('should return 400', () => {
        findOneAndUpdateStub.withArgs({ _id: fakeId }, { active: false }).rejects({ message: 'Error' });
        response.status.withArgs(400).returns(response);

        return ProductsController.delete(request, response)
          .then(() => {
            sinon.assert.calledWith(response.send, 'Error');
          });
      });
    });
  });
});
