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
});
