const express = require('express');
const path = require('path');
const routes = require('./routes');
const { errorHandler, notFoundHandler } = require('./middlewares/errorHandler');

const app = express();

// Serve the public frontend folder
app.use(express.static(path.join(__dirname, '../public')));

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: { service: 'E-commerce Product Catalog API', status: 'healthy' }
  });
});

// API Routes
app.use('/api/v1', routes);

// 404 Handler for Unmatched Routes
app.use(notFoundHandler);

// Global Centralized Error Handler
app.use(errorHandler);

module.exports = app;