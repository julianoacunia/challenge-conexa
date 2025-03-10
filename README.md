# Movie API - NestJS

Este es un backend desarrollado con NestJS para la gestión de películas, incluyendo autenticación con JWT, roles de usuario y sincronización con la API de Star Wars.

## 🚀 Instalación y ejecución

### 1️⃣ Clonar el repositorio
```sh
git clone <URL_DEL_REPO>
cd <NOMBRE_DEL_REPO>
```

### 2️⃣ Instalar dependencias
```sh
npm install
```

### 3️⃣ Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:
```env
PORT=3000
DATABASE_URL=postgres://usuario:password@localhost:5432/moviedb
JWT_SECRET=supersecretkey
```

### 4️⃣ Ejecutar migraciones
```sh
npm run migration:run
```

### 5️⃣ Iniciar el servidor
```sh
npm run start
```
El backend estará disponible en `http://localhost:3000`

## 🛠️ Endpoints principales
### 📌 Autenticación
- `POST /auth/signup` - Registrar usuario
- `POST /auth/login` - Iniciar sesión

### 📌 Películas
- `GET /movies` - Listar todas las películas
- `GET /movies/:id` - Obtener detalles de una película (solo usuarios regulares)
- `POST /movies` - Crear película (solo administradores)
- `PUT /movies/:id` - Actualizar película (solo administradores)
- `DELETE /movies/:id` - Eliminar película (solo administradores)
- `POST /movies/sync` - Sincronizar con la API de Star Wars (solo administradores)

## 📜 Documentación con Swagger
Swagger está disponible en `http://localhost:3000/api`

## 🧪 Pruebas
Para ejecutar las pruebas unitarias:
```sh
npm run test
```

Para ejecutar pruebas E2E:
```sh
npm run test:e2e
```

## 🚀 Deploy
Puedes desplegar este proyecto en plataformas gratuitas como Railway, Render o Vercel.

---

**Autor:** Tu Nombre  
**Repositorio:** [GitHub](<URL_DEL_REPO>)

