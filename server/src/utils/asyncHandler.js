export const asyncHandler = (requestHandler) => {
  return async (req, res, next) => {
    try {
      await requestHandler(req, res, next);
    } catch (error) {
      // Format error response consistently
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message,
        errors: error.errors || [],
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  };
};