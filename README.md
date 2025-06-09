# Aplicación de Gestión de Canciones

Este proyecto consiste en una aplicación full-stack para gestionar canciones, desarrollada con React (Vite) en el frontend y Node.js con Express en el backend.

## Estructura del Proyecto

El proyecto está dividido en dos partes principales:
- `frontend`: Aplicación React creada con Vite
- `backend`: Servidor Node.js con Express

## Configuración Inicial

### Frontend (React + Vite)

1. Crear el proyecto React con Vite:
```bash
npm create vite@latest frontend -- --template react
cd frontend
npm install
```

2. Instalar dependencias adicionales:
```bash
npm install react-router-dom axios bootstrap
```

### Backend (Node.js + Express)

1. Inicializar el proyecto Node.js:
```bash
cd backend
npm init -y
```

2. Instalar dependencias:
```bash
npm install express cors
```

## Desarrollo

### Backend

1. Crear el archivo `index.js` en la carpeta backend con la siguiente estructura:
   - Configuración de Express y middleware
   - Lista en memoria para almacenar canciones
   - Endpoint GET /canciones para obtener la lista de canciones
   - Endpoint POST /canciones para agregar nuevas canciones

2. Actualizar el `package.json` del backend para incluir el script de inicio:
```json
{
  "scripts": {
    "start": "node index.js"
  }
}
```

### Frontend

1. Configurar el archivo `main.jsx` para importar los estilos de Bootstrap:
```jsx
import 'bootstrap/dist/css/bootstrap.min.css'
```

2. Eliminar contenido de `frontend/src/index.css` y `frontend/src/App.css` para evitar conflictos de estilos.

3. Modificar `frontend/index.html` para que cargue `main.jsx` en lugar de `main.tsx` (si la plantilla inicial fue de TypeScript):
```html
<script type="module" src="/src/main.jsx"></script>
```

4. Crear los componentes principales:

   a. `App.jsx`:
   - Configuración de React Router
   - Barra de navegación con Bootstrap
   - Rutas para las páginas principales

   b. `CancionesPage.jsx`:
   - Lista de canciones usando componentes de Bootstrap
   - Botón para navegar a la página de nueva canción
   - Integración con el backend mediante axios

   c. `NuevaCancionPage.jsx`:
   - Formulario para agregar nuevas canciones
   - Validación de campos requeridos
   - Integración con el backend mediante axios
   - Redirección automática después de guardar

## Ejecución

Para ejecutar la aplicación, abre dos terminales separadas. En una, inicia el backend y en la otra, el frontend.

### Frontend
```bash
cd frontend
npm run dev
```

### Backend
```bash
cd backend
npm start
```

## Características Implementadas

1. **Frontend**:
   - Diseño responsivo usando Bootstrap
   - Navegación entre páginas con React Router
   - Formulario de nueva canción con validación
   - Lista de canciones con diseño de tarjetas
   - Integración con el backend mediante axios

2. **Backend**:
   - API REST con Express
   - Almacenamiento en memoria de las canciones
   - Endpoints para obtener y agregar canciones
   - Configuración CORS para permitir peticiones desde el frontend

## Solución de Problemas Comunes

### Error: `Failed to resolve import "bootstrap/dist/css/bootstrap.min.css"`

Este error indica que Bootstrap no se instaló correctamente en el directorio `frontend`. Asegúrate de ejecutar el comando de instalación desde el directorio raíz del proyecto y luego navegando a la carpeta `frontend` para instalarlo. El paso correcto sería:

```bash
cd frontend
npm install bootstrap
```

### La página de bienvenida de Vite/React sigue mostrándose al iniciar el frontend

Si después de configurar los componentes y la ruta de Bootstrap, la página de bienvenida predeterminada de Vite/React aún se muestra, es probable que haya una de las siguientes causas:

1.  **Archivos CSS predeterminados**: Los estilos predeterminados de Vite pueden estar sobrescribiendo los de Bootstrap. Asegúrate de que el contenido de los archivos `frontend/src/index.css` y `frontend/src/App.css` haya sido vaciado por completo. Si no están vacíos, elimine su contenido.

2.  **Referencia incorrecta en `index.html`**: Si el proyecto React fue creado inicialmente con TypeScript (plantilla `react-ts`), el archivo principal de entrada será `main.tsx`. Sin embargo, si los componentes se están desarrollando en JavaScript (archivos `.jsx`), la referencia en `frontend/index.html` debe apuntar al archivo correcto. Confirma que la etiqueta `<script>` en `frontend/index.html` apunte a `main.jsx` (si usas JSX) en lugar de `main.tsx`:

    ```html
    <script type="module" src="/src/main.jsx"></script>
    ```

    Asegúrate de que la extensión del archivo (`.jsx` o `.tsx`) coincida con la que realmente estás utilizando para tu archivo de entrada principal de React.

Después de realizar cualquiera de estas correcciones, **es fundamental reiniciar el servidor de desarrollo del frontend** (`npm run dev` dentro de la carpeta `frontend`) para que los cambios surtan efecto. 