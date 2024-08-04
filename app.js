/**
 * Archivo principal de la aplicación.
 */

const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

/**
 * Cargar variables de entorno desde el archivo .env.
 */
dotenv.config();

/**
 * Inicializar la aplicación Express.
 */
const app = express();

/**
 * Middleware para analizar cuerpos de solicitudes JSON.
 */
app.use(bodyParser.json());

/**
 * Importar las rutas de la aplicación.
 */
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const roleRoutes = require('./routes/role');
const companyRoutes = require('./routes/company');
const userRoleRoutes = require('./routes/userRole');
const userCompanyRoutes = require('./routes/userCompany');

const swaggerDocument = YAML.load('./openapi.yaml');   


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/**
 * Conectar a la base de datos y sincronizar los modelos.
 */
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

/**
 * Usar las rutas de la aplicación.
 */
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/roles', roleRoutes);
app.use('/companies', companyRoutes);
app.use('/userRoles', userRoleRoutes);
app.use('/userCompanies', userCompanyRoutes);

/**
 * Manejo de errores para rutas no encontradas.
 */
app.use((req, res, next) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

/**
 * Establecer el puerto del servidor.
 */
const PORT = process.env.PORT || 5000;

/**
 * Iniciar el servidor en el puerto especificado.
 */
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});