const bcrypt = require('bcryptjs');

const password = async () => {
  const hashedPassword = await bcrypt.hash('12345678', 10);
  return hashedPassword;
};

password().then((hashedPassword) => {
  console.log(hashedPassword);
});