const Product = require('../model');

describe('Model: Product', () => {
    describe('empty product is invalid', () => {
        it('should be invalid if required fields are empty', () => {
            const product = new Product();
            
            product.validate((err) => expect(err.errors.name).toBeTruthy());

            product.validate((err) => expect(err.errors.price).toBeTruthy());
        });
    });

    describe('product with wrong type of any arguments', () => {
        it('should be invalid any fields passed have wrong type', () => {
            const product = new Product({
                name: true,
                price: 'price',
                quantity: 'two',
                active: 'bla',
            });

            product.validate((err) => expect(err.errors.price).toBeTruthy());

            product.validate((err) => expect(err.errors.quantity).toBeTruthy());

            product.validate((err) => expect(err.errors.active).toBeTruthy());
        });
    });

    describe('product with correct type and required type of arguments', () => {
        it('should be valid', () => {
            const product = new Product({
                name: '123',
                price: 10,
            });
            
            product.validate((err) => expect(err).toBeFalsy());
        });
    });
});
