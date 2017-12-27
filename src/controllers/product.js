class ProductsController {
  constructor(Product) {
    this.Product = Product;
  }

  // CREATE
  async create(req, res) {
    const product = new this.Product(req.body);
    try {
      await product.save();
      res.status(200).send(product);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

  // READ
  async get(req, res) {
    try {
      const listOfProducts = await this.Product.find({ active: true });
      res.status(200).send(listOfProducts);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

  async getById(req, res) {
    try {
      const product = await this.Product.find({ _id: req.params.id, active: true });
      res.status(200).send(product);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

  // UPDATE
  async update(req, res) {
    try {
      const product = await this.Product.findOneAndUpdate({ _id: req.params.id }, req.body);
      res.status(200).send(product);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

  // DELETE
  async delete(req, res) {
    try {
      await this.Product.findOneAndUpdate({ _id: req.params.id }, { active: false });
      res.sendStatus(200);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
}

export default ProductsController;
