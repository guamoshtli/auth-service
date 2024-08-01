### Paso 1: Asegurarse de que el servidor esté corriendo

Primero, asegúrate de que tu servidor esté corriendo. Puedes iniciar el servidor ejecutando:

node server.js   

### Paso 2: Registrar un nuevo usuario

Para registrar un nuevo usuario, utiliza la ruta POST /auth/register. Aquí tienes cómo configurar la solicitud en Postman:

*   **Método**: POST
    
*   **URL**: http://localhost:5000/auth/register
    
*   **Headers**:
    
    *   Content-Type: application/json
        
*   jsonCopiar código{ "username": "testuser", "email": "testuser@example.com", "password": "password123"}
    

### Paso 3: Autenticar al usuario y obtener un token

Para autenticar al usuario y obtener un token JWT, utiliza la ruta POST /auth/login. Aquí tienes cómo configurar la solicitud en Postman:

*   **Método**: POST
    
*   **URL**: http://localhost:5000/auth/login
    
*   **Headers**:
    
    *   Content-Type: application/json
        
*   jsonCopiar código{ "email": "testuser@example.com", "password": "password123"}
    

Si el inicio de sesión es exitoso, recibirás un token JWT en la respuesta.

### Paso 4: Acceder a una ruta protegida

Para acceder a una ruta protegida, como GET /users, necesitas incluir el token JWT en los headers de la solicitud. Aquí tienes cómo configurar la solicitud en Postman:

*   **Método**: GET
    
*   **URL**: http://localhost:5000/users
    
*   **Headers**:
    
    *   Content-Type: application/json
        
    *   Authorization: Bearer {token}
        

Reemplaza {token} con el token JWT que obtuviste en la respuesta de la ruta de login.

### Ejemplo de configuración en Postman:

Estos pasos deberían permitirte probar las rutas de tu microservicio de autenticación usando Postman. Asegúrate de reemplazar las URLs y datos con los que correspondan a tu configuración local.