const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const sequelize = require('./config/database');

// Cargar variables de entorno desde .env
dotenv.config();

// Inicializar la aplicación Express
const app = express();

// Middleware para analizar cuerpos de solicitudes JSON
app.use(bodyParser.json());

// Importar las rutas
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const roleRoutes = require('./routes/role');
const companyRoutes = require('./routes/company');
const userRoleRoutes = require('./routes/userRole');
const userCompanyRoutes = require('./routes/userCompany');

// Conexión a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Conectado a la base de datos');
    // Sincronizar modelos
    return sequelize.sync();
  })
  .then(() => {
    console.log('Modelos sincronizados');
  })
  .catch(err => {
    console.error('Error al conectar con la base de datos:', err);
  });

// Usar las rutas
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/roles', roleRoutes);
app.use('/companies', companyRoutes);
app.use('/userRoles', userRoleRoutes);
app.use('/userCompanies', userCompanyRoutes);

// Manejo de errores para rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Puerto del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
