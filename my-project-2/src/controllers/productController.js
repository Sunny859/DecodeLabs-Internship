const Product = require('../models/Product');
const Category = require('../models/Category');

const createProduct = async (req, res, next) => {
  try {
    const { name, price, description, category, inStock } = req.body;

    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({
        status: 'fail',
        message: 'Semantic validation failed: Specified category does not exist',
        errors: [{ field: 'category', message: `Category ID ${category} was not found` }]
      });
    }

    const product = await Product.create({
      name,
      price,
      description,
      category,
      inStock
    });

    return res.status(201).json({
      status: 'success',
      data: { product }
    });
  } catch (error) {
    next(error);
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }
    if (req.query.inStock !== undefined) {
      filter.inStock = req.query.inStock === 'true';
    }

    const products = await Product.find(filter).populate('category', 'name description');

    return res.status(200).json({
      status: 'success',
      data: {
        count: products.length,
        products
      }
    });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'name description');
    if (!product) {
      return res.status(404).json({
        status: 'fail',
        message: 'Product not found',
        errors: []
      });
    }

    return res.status(200).json({
      status: 'success',
      data: { product }
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    if (req.body.category) {
      const categoryExists = await Category.findById(req.body.category);
      if (!categoryExists) {
        return res.status(400).json({
          status: 'fail',
          message: 'Semantic validation failed: Specified category does not exist',
          errors: [{ field: 'category', message: `Category ID ${req.body.category} was not found` }]
        });
      }
    }

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('category', 'name description');

    if (!product) {
      return res.status(404).json({
        status: 'fail',
        message: 'Product not found',
        errors: []
      });
    }

    return res.status(200).json({
      status: 'success',
      data: { product }
    });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({
        status: 'fail',
        message: 'Product not found',
        errors: []
      });
    }

    return res.status(200).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};