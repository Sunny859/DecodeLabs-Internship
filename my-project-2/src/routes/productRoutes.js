const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const validate = require('../middlewares/validate');
const { authenticate, authorize } = require('../middlewares/auth');
const { createProductSchema, updateProductSchema } = require('../schemas/productSchema');
const { paramIdSchema } = require('../schemas/commonSchema');

router
  .route('/')
  .get(productController.getAllProducts)
  .post(
    authenticate,
    authorize('admin'),
    validate(createProductSchema),
    productController.createProduct
  );

router
  .route('/:id')
  .get(validate(paramIdSchema, 'params'), productController.getProductById)
  .put(
    authenticate,
    authorize('admin'),
    validate(paramIdSchema, 'params'),
    validate(updateProductSchema),
    productController.updateProduct
  )
  .delete(
    authenticate,
    authorize('admin'),
    validate(paramIdSchema, 'params'),
    productController.deleteProduct
  );

module.exports = router;