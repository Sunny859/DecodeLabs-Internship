const { z } = require('zod');
const { objectIdSchema } = require('./commonSchema');

const createProductSchema = z.object({
  name: z.string().min(2, 'Product name must be at least 2 characters').max(100),
  price: z.number().positive('Price must be greater than zero'),
  description: z.string().min(5, 'Description must be at least 5 characters').max(1000),
  category: objectIdSchema,
  inStock: z.boolean().optional().default(true)
});

const updateProductSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  price: z.number().positive().optional(),
  description: z.string().min(5).max(1000).optional(),
  category: objectIdSchema.optional(),
  inStock: z.boolean().optional()
}).refine(
  (data) => Object.keys(data).length > 0,
  { message: 'At least one field must be provided for update' }
);

module.exports = {
  createProductSchema,
  updateProductSchema
};