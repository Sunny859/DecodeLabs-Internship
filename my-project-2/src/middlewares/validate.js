const validate = (schema, source = 'body') => {
  return (req, res, next) => {
    try {
      const parsed = schema.parse(req[source]);
      req[source] = parsed;
      next();
    } catch (err) {
      if (err.errors) {
        const formattedErrors = err.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message
        }));
        return res.status(400).json({
          status: 'fail',
          message: 'Syntactic validation failed',
          errors: formattedErrors
        });
      }
      return next(err);
    }
  };
};

module.exports = validate;