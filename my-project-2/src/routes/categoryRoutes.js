const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const validate = require('../middlewares/validate');
const { authenticate, authorize } = require('../middlewares/auth');
const { createCategorySchema, updateCategorySchema } = require('../schemas/categorySchema');
const { paramIdSchema } = require('../schemas/commonSchema');

router
  .route('/')
  .get(categoryController.getAllCategories)
  .post(
    authenticate,
    authorize('admin'),
    validate(createCategorySchema),
    categoryController.createCategory
  );

router
  .route('/:id')
  .get(validate(paramIdSchema, 'params'), categoryController.getCategoryById)
  .put(
    authenticate,
    authorize('admin'),
    validate(paramIdSchema, 'params'),
    validate(updateCategorySchema),
    categoryController.updateCategory
  )
  .delete(
    authenticate,
    authorize('admin'),
    validate(paramIdSchema, 'params'),
    categoryController.deleteCategory
  );

module.exports = router;