# Sistema de Autenticación y Autorización

Este proyecto proporciona un sistema robusto para autenticación y autorización de usuarios. Permite gestionar usuarios, roles, y empresas, y asegura que las operaciones de autenticación se realicen de manera segura y eficiente.

## Descripción del Código de Autenticación

El sistema incluye funcionalidades clave para el manejo de autenticación de usuarios:

1. **Registro de Usuario (`register`):**
   - Permite a los nuevos usuarios registrarse en el sistema. La contraseña del usuario es hasheada utilizando `bcrypt` para asegurar que se almacene de manera segura. Se valida la información del usuario antes de crear una nueva entrada en la base de datos.

2. **Inicio de Sesión (`login`):**
   - Autentica a los usuarios con sus credenciales (correo electrónico y contraseña). Verifica que la contraseña proporcionada coincida con la almacenada en la base de datos y genera un token JWT (JSON Web Token) para permitir el acceso a áreas protegidas del sistema.

3. **Verificación de Token (`verify`):**
   - Permite verificar la validez de un token JWT proporcionado por el cliente. Si el token es válido, devuelve la información decodificada del usuario; si no, indica que el token no es válido.

4. **Refresco de Token (`refresh`):**
   - Permite obtener un nuevo token JWT utilizando un token válido que aún no ha expirado. Esto es útil para mantener la sesión del usuario activa sin tener que volver a iniciar sesión.

5. **Cierre de Sesión (`logout`):**
   - Permite a los usuarios cerrar sesión invalidando su token actual. El token se agrega a una lista negra para asegurarse de que no pueda ser utilizado nuevamente.

6. **Verificación de Token en Lista Negra (`isTokenBlacklisted`):**
   - Verifica si un token ha sido añadido a la lista negra, lo que indica que el token ha sido invalidado y no debe ser aceptado por el sistema.


## Instalación

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/tu_usuario/tu_repositorio.git

2. Navega al directorio del proyecto:
   ```bash
   cd tu_repositorio
3. Instala las dependencias:
   ```bash
   npm install
4. Configura las variables de entorno:

Crea un archivo .env en la raíz del proyecto y añade las variables de entorno necesarias. Ejemplo de archivo .env:
    DB_HOST=localhost
    DB_USER=usuario
    DB_PASS=contraseña
    DB_NAME=nombre_db
    JWT_SECRET=tu_clave_secreta

5. Inicia la aplicación:
    ```bash
    node ./app.js

## Rutas de la API
El sistema expone las siguientes rutas para interactuar con los recursos:

## Autenticación:

* POST /api/auth/login - Inicia sesión y obtiene un token JWT.
Usuarios:

* GET /api/users - Obtiene todos los usuarios.
* GET /api/users/:id - Obtiene un usuario por ID.
* POST /api/users - Crea un nuevo usuario.
* PUT /api/users/:id - Actualiza un usuario existente.
* DELETE /api/users/:id - Elimina un usuario.

##  Roles:

* GET /api/roles - Obtiene todos los roles.
* GET /api/roles/:id - Obtiene un rol por ID.
* POST /api/roles - Crea un nuevo rol.
* PUT /api/roles/:id - Actualiza un rol existente.
* DELETE /api/roles/:id - Elimina un rol.

## Empresas:

* GET /api/companies - Obtiene todas las empresas.
* GET /api/companies/:id - Obtiene una empresa por ID.
* POST /api/companies - Crea una nueva empresa.
* PUT /api/companies/:id - Actualiza una empresa existente.
* DELETE /api/companies/:id - Elimina una empresa.

## Usuarios y Empresas:

* POST /api/user-companies - Asigna una empresa a un usuario.
* GET /api/user-companies/:userId - Obtiene todas las empresas asignadas a un usuario.

## Usuarios y Roles:

* POST /api/user-roles - Asigna un rol a un usuario.
* GET /api/user-roles/:userId - Obtiene todos los roles asignados a un usuario.

## Tecnologías Utilizadas

* Node.js: Entorno de ejecución para JavaScript.
* Express: Framework para construir aplicaciones web y API.
* Sequelize: ORM para la gestión de bases de datos SQL.
* JWT: JSON Web Tokens para autenticación.
* MySQL: Sistema de gestión de bases de datos.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir al proyecto, por favor sigue estos pasos:

* Haz un fork del repositorio.
* Crea una nueva rama (git checkout -b feature/nueva-caracteristica).
* Realiza tus cambios y haz commit (git commit -am 'Añadida nueva característica').
* Envía tus cambios (git push origin feature/nueva-caracteristica).
* Abre una solicitud de extracción (pull request).

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

## Contacto
gonzalo.sandoval.r@gmail.com


Este `README.md` incluye una descripción específica de la funcionalidad del código de autenticación, lo que facilita a otros colaboradores o usuarios entender el propósito y uso del sistema.

