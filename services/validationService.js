const { z } = require("zod");

const userSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8)
});

/* const validateUser = (data) => {
  return userSchema.parse(data);
}; */

const validateUser = (data) => {
  const parsedData = userSchema.parse(data);

  // Validación adicional: comparar contraseñas
  if (parsedData.password !== parsedData.confirmPassword) {
    throw new Error('Las contraseñas no coinciden');
  }

  // Eliminar confirmPassword antes de devolver los datos
  delete parsedData.confirmPassword;

  return parsedData;
};



module.exports = validateUser;