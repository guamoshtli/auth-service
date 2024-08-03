const { z } = require("zod");

const userSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

const validateUser = (data) => {
  return userSchema.parse(data);
};



module.exports = validateUser;