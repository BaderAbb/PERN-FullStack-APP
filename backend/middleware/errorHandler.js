// server/middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
  // El código de estado por defecto es 500 si no se ha establecido otro
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);

  res.json({
    message: err.message,
    // Solo mostramos el stack trace si estamos en desarrollo
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export default errorHandler;