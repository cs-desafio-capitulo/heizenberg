import sinon from 'sinon';

import { ProductsController } from '../../../src/controllers';

describe('Controller: Products', () => {
  const defaultProduct = {
    name: 'Product 1',
    price: 100,
    quantity: 2,
  };

  const defaultRequest = { params: {} };

  const response = {
    send: sinon.spy(),
    status: sinon.stub(),
    sendStatus: sinon.stub(),
  };

  describe('create() product', () => {
    const requestWithBody = Object.assign({}, { body: defaultProduct }, defaultRequest);

    context('when everything is ok', () => {
      it('should return 200', async () => {
        class fakeProduct {
          save() {}
        }

        response.status.withArgs(200).returns(response);
        sinon.stub(fakeProduct.prototype, 'save').withArgs().resolves(defaultProduct);

        await ProductsController(fakeProduct).create(requestWithBody, response);
        sinon.assert.calledWith(response.status, 200);
      });
    });

    context('when an error occurs', () => {
      it('should return 400', async () => {
        class fakeProduct {
          save() {}
        }

        response.status.withArgs(400).returns(response);
        sinon.stub(fakeProduct.prototype, 'save').withArgs().rejects({ message: 'Error' });

        await ProductsController(fakeProduct).create(requestWithBody, response);
        sinon.assert.calledWith(response.status, 400);
      });
    });
  });

  describe('get() product', () => {
    const requestWithBody = Object.assign({}, { body: defaultProduct }, defaultRequest);

    context('when everything is ok', () => {
      it('should return 200', async () => {
        class fakeProduct {
          find() {}
        }

        response.status.withArgs(200).returns(response);
        sinon.stub(fakeProduct.prototype, 'find').withArgs({ active: true }).resolves(defaultProduct);

        await ProductsController(fakeProduct).get(requestWithBody, response);
        sinon.assert.calledWith(response.status, 200);
      });
    });

    context('when an error occurs', () => {
      it('should return 400', async () => {
        class fakeProduct {
          find() {}
        }

        response.status.withArgs(400).returns(response);
        sinon.stub(fakeProduct.prototype, 'find').withArgs({ active: true }).rejects({ message: 'Error' });

        await ProductsController(fakeProduct).get(requestWithBody, response);
        sinon.assert.calledWith(response.status, 400);
      });
    });
  });

  describe('getById() product', () => {
    const requestWithBody = Object.assign({}, { body: defaultProduct }, defaultRequest);

    context('when everything is ok', () => {
      it('should return 200', async () => {
        class fakeProduct {
          find() {}
        }

        response.status.withArgs(200).returns(response);
        sinon.stub(fakeProduct.prototype, 'find').withArgs({ active: true }).resolves(defaultProduct);

        await ProductsController(fakeProduct).getById(requestWithBody, response);
        sinon.assert.calledWith(response.status, 200);
      });
    });

    context('when an error occurs', () => {
      it('should return 400', async () => {
        class fakeProduct {
          find() {}
        }

        response.status.withArgs(400).returns(response);
        sinon.stub(fakeProduct.prototype, 'find').withArgs({ active: true }).rejects({ message: 'Error' });

        await ProductsController(fakeProduct).getById(requestWithBody, response);
        sinon.assert.calledWith(response.status, 400);
      });
    });
  });

  describe('update() product', () => {
    const requestWithBody = Object.assign({}, { body: defaultProduct }, defaultRequest);

    context('when everything is ok', () => {
      it('should return 200', async () => {
        class fakeProduct {
          findOneAndUpdate() {}
        }

        response.status.withArgs(200).returns(response);
        sinon.stub(fakeProduct.prototype, 'findOneAndUpdate').withArgs({ active: true }).resolves(defaultProduct);

        await ProductsController(fakeProduct).update(requestWithBody, response);
        sinon.assert.calledWith(response.status, 200);
      });
    });

    context('when an error occurs', () => {
      it('should return 400', async () => {
        class fakeProduct {
          findOneAndUpdate() {}
        }

        response.status.withArgs(400).returns(response);
        sinon.stub(fakeProduct.prototype, 'findOneAndUpdate').withArgs({ active: true }).rejects({ message: 'Error' });

        await ProductsController(fakeProduct).update(requestWithBody, response);
        sinon.assert.calledWith(response.status, 400);
      });
    });
  });

  describe('delete() product', () => {
    const requestWithBody = Object.assign({}, { body: defaultProduct }, defaultRequest);

    context('when everything is ok', () => {
      it('should return 200', async () => {
        class fakeProduct {
          findOneAndUpdate() {}
        }

        response.status.withArgs(200).returns(response);
        sinon.stub(fakeProduct.prototype, 'findOneAndUpdate').withArgs({ active: true }).resolves(defaultProduct);

        await ProductsController(fakeProduct).delete(requestWithBody, response);
        sinon.assert.calledWith(response.status, 200);
      });
    });

    context('when an error occurs', () => {
      it('should return 400', async () => {
        class fakeProduct {
          findOneAndUpdate() {}
        }

        response.status.withArgs(400).returns(response);
        sinon.stub(fakeProduct.prototype, 'findOneAndUpdate').withArgs({ active: true }).rejects({ message: 'Error' });

        await ProductsController(fakeProduct).delete(requestWithBody, response);
        sinon.assert.calledWith(response.status, 400);
      });
    });
  });

  describe('notFound() product', () => {
    const requestWithBody = Object.assign({}, { body: defaultProduct }, defaultRequest);
    it('should return 404', async () => {
      class fakeProduct {}

      response.sendStatus.withArgs(404).returns(response);
      await ProductsController(fakeProduct).notFound(requestWithBody, response);
      sinon.assert.calledWith(response.sendStatus, 404);
    });
  });
});
