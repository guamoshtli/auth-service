// Función de ayuda para enviar respuestas
exports.sendResponse = (res, status, data) => {
  res.status(status).json(data);
};