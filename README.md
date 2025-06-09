# Aplicación de Gestión de Canciones

Este proyecto consiste en una aplicación full-stack para gestionar canciones, desarrollada con React (Vite) en el frontend y Node.js con Express en el backend.

## Estructura del Proyecto

El proyecto está dividido en dos partes principales:
- `frontend`: Aplicación React creada con Vite
- `backend`: Servidor Node.js con Express

## Configuración Inicial

Para iniciar el proyecto, sigue estos pasos en tu terminal:

### Frontend (React + Vite)

1.  **Crear el proyecto React con Vite**: Ejecuta el siguiente comando. Cuando se te pida, selecciona `React` como framework y `JavaScript` (o `TypeScript` si prefieres, ajustando las extensiones de archivo como se indica más adelante) como variante.
    ```bash
    npm create vite@latest frontend -- --template react
    ```

2.  **Navegar al directorio del frontend e instalar dependencias**: Una vez creado el proyecto, navega a su directorio e instala las dependencias necesarias. Esto incluirá `react-router-dom` para la navegación, `axios` para las peticiones HTTP al backend y `bootstrap` para el diseño.
    ```bash
    cd frontend
    npm install
    npm install react-router-dom axios bootstrap
    ```

3.  **Eliminar archivos CSS y TypeScript predeterminados (si aplica)**:
    *   Si tu proyecto fue creado con la plantilla `react-ts` pero estás usando `.jsx` para los componentes, considera eliminar `frontend/src/App.tsx` y `frontend/src/main.tsx`.
    *   Para evitar conflictos de estilos con Bootstrap, vacía el contenido de los archivos `frontend/src/index.css` y `frontend/src/App.css`.

### Backend (Node.js + Express)

1.  **Crear el directorio del backend e inicializar el proyecto Node.js**: Vuelve a la raíz del proyecto y crea la carpeta `backend`.
    ```bash
    cd ..
    mkdir backend
    cd backend
    npm init -y
    ```

2.  **Instalar dependencias del backend**: Instala `express` para el servidor web y `cors` para manejar las políticas de origen cruzado.
    ```bash
    npm install express cors
    ```

## Desarrollo

### Backend

1.  **Crear el archivo `index.js`**: En la carpeta `backend`, crea el archivo `index.js` con el siguiente contenido. Este archivo configurará tu servidor Express, manejará las peticiones CORS, definirá una lista de canciones en memoria y creará los endpoints para obtener y añadir canciones.
    ```javascript
    // Importación de dependencias
    const express = require('express');
    const cors = require('cors');

    // Creación de la aplicación Express
    const app = express();

    // Middleware
    app.use(cors());
    app.use(express.json());

    // Lista en memoria para almacenar las canciones
    let canciones = [
        {
            id: 1,
            titulo: "Bohemian Rhapsody",
            artista: "Queen",
            album: "A Night at the Opera",
            anio: 1975
        },
        {
            id: 2,
            titulo: "Stairway to Heaven",
            artista: "Led Zeppelin",
            album: "Led Zeppelin IV",
            anio: 1971
        }
    ];

    // Endpoint para obtener todas las canciones
    app.get('/canciones', (req, res) => {
        res.json(canciones);
    });

    // Endpoint para agregar una nueva canción
    app.post('/canciones', (req, res) => {
        const nuevaCancion = {
            id: canciones.length + 1,
            ...req.body
        };
        canciones.push(nuevaCancion);
        res.status(201).json(nuevaCancion);
    });

    // Puerto del servidor
    const PORT = 3000;

    // Iniciar el servidor
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
    ```

2.  **Actualizar el `package.json` del backend**: Edita el archivo `backend/package.json` para añadir un script de inicio que ejecute tu servidor. Esto te permitirá iniciar el backend fácilmente con `npm start`.
    ```json
    {
      "name": "backend",
      "version": "1.0.0",
      "main": "index.js",
      "scripts": {
        "start": "node index.js",
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "license": "ISC",
      "description": "",
      "dependencies": {
        "cors": "^2.8.5",
        "express": "^4.18.2"
      }
    }
    ```

### Frontend

1.  **Configurar el archivo `main.jsx`**: Abre `frontend/src/main.jsx` e importa los estilos de Bootstrap al principio del archivo. Esto asegura que los estilos de Bootstrap estén disponibles para toda tu aplicación React.
    ```javascript
    import React from 'react'
    import ReactDOM from 'react-dom/client'
    import App from './App.jsx'
    import 'bootstrap/dist/css/bootstrap.min.css'

    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    )
    ```

2.  **Modificar `frontend/index.html`**: Asegúrate de que el archivo `frontend/index.html` esté configurado para cargar tu archivo de entrada principal de React (`main.jsx`). Esto es crucial si el proyecto fue creado con una plantilla de TypeScript y estás usando archivos `.jsx`.
    ```html
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vite + React</title>
      </head>
      <body>
        <div id="root"></div>
        <script type="module" src="/src/main.jsx"></script>
      </body>
    </html>
    ```

3.  **Crear los componentes principales**: Crea los siguientes archivos en `frontend/src/components/` y asegúrate de que su contenido sea el siguiente:

    a.  `App.jsx` (ubicado en `frontend/src/App.jsx`):
        Este es el componente raíz de tu aplicación. Configura React Router para la navegación y añade una barra de navegación básica de Bootstrap.
        ```javascript
        import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
        import CancionesPage from './components/CancionesPage';
        import NuevaCancionPage from './components/NuevaCancionPage';

        function App() {
          return (
            <Router>
              <div className="min-vh-100 bg-light">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                  <div className="container">
                    <a className="navbar-brand" href="/">Gestión de Canciones</a>
                  </div>
                </nav>
                <main className="py-4">
                  <Routes>
                    <Route path="/" element={<CancionesPage />} />
                    <Route path="/nueva-cancion" element={<NuevaCancionPage />} />
                  </Routes>
                </main>
              </div>
            </Router>
          );
        }

        export default App;
        ```

    b.  `CancionesPage.jsx` (ubicado en `frontend/src/components/CancionesPage.jsx`):
        Este componente se encarga de mostrar la lista de canciones. Obtiene los datos del backend mediante `axios` y los renderiza utilizando componentes de tarjeta de Bootstrap. También incluye un botón para navegar a la página de añadir nueva canción.
        ```javascript
        import { useState, useEffect } from 'react';
        import { useNavigate } from 'react-router-dom';
        import axios from 'axios';

        // Componente que muestra la lista de canciones
        const CancionesPage = () => {
            // Estado para almacenar la lista de canciones
            const [canciones, setCanciones] = useState([]);
            const navigate = useNavigate();

            // Efecto para cargar las canciones al montar el componente
            useEffect(() => {
                const cargarCanciones = async () => {
                    try {
                        const response = await axios.get('http://localhost:3000/canciones');
                        setCanciones(response.data);
                    } catch (error) {
                        console.error('Error al cargar las canciones:', error);
                    }
                };

                cargarCanciones();
            }, []);

            // Manejador para navegar a la página de nueva canción
            const handleNuevaCancion = () => {
                navigate('/nueva-cancion');
            };

            return (
                <div className="container py-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1 className="h2">Lista de Canciones</h1>
                        <button
                            onClick={handleNuevaCancion}
                            className="btn btn-primary"
                        >
                            Nueva Canción
                        </button>
                    </div>

                    <div className="row g-4">
                        {canciones.map((cancion) => (
                            <div key={cancion.id} className="col-md-6 col-lg-4">
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h5 className="card-title">{cancion.titulo}</h5>
                                        <p className="card-text">
                                            <strong>Artista:</strong> {cancion.artista}<br />
                                            <strong>Álbum:</strong> {cancion.album}<br />
                                            <strong>Año:</strong> {cancion.anio}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        };

        export default CancionesPage;
        ```

    c.  `NuevaCancionPage.jsx` (ubicado en `frontend/src/components/NuevaCancionPage.jsx`):
        Este componente presenta un formulario para que el usuario ingrese los detalles de una nueva canción. Utiliza el estado de React para gestionar los campos del formulario y `axios` para enviar los datos al backend. Una vez guardada la canción, redirige al usuario a la lista de canciones.
        ```javascript
        import { useState } from 'react';
        import { useNavigate } from 'react-router-dom';
        import axios from 'axios';

        // Componente para agregar una nueva canción
        const NuevaCancionPage = () => {
            const navigate = useNavigate();
            
            // Estado para manejar los campos del formulario
            const [formData, setFormData] = useState({
                titulo: '',
                artista: '',
                album: '',
                anio: ''
            });

            // Manejador para actualizar los campos del formulario
            const handleChange = (e) => {
                const { name, value } = e.target;
                setFormData(prevState => ({
                    ...prevState,
                    [name]: value
                }));
            };

            // Manejador para guardar la nueva canción
            const guardarCancionHandler = async (e) => {
                e.preventDefault();
                
                try {
                    await axios.post('http://localhost:3000/canciones', formData);
                    // Redirigir a la página principal después de guardar
                    navigate('/');
                } catch (error) {
                    console.error('Error al guardar la canción:', error);
                }
            };

            return (
                <div className="container py-4">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-body">
                                    <h2 className="card-title mb-4">Nueva Canción</h2>
                                    
                                    <form onSubmit={guardarCancionHandler}>
                                        <div className="mb-3">
                                            <label htmlFor="titulo" className="form-label">
                                                Título
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="titulo"
                                                name="titulo"
                                                value={formData.titulo}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="artista" className="form-label">
                                                Artista
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="artista"
                                                name="artista"
                                                value={formData.artista}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="album" className="form-label">
                                                Álbum
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="album"
                                                name="album"
                                                value={formData.album}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="anio" className="form-label">
                                                Año
                                            </label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="anio"
                                                name="anio"
                                                value={formData.anio}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="d-flex gap-2">
                                            <button
                                                type="submit"
                                                className="btn btn-primary"
                                            >
                                                Guardar
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => navigate('/')}
                                                className="btn btn-secondary"
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        };

        export default NuevaCancionPage;
        ```

## Ejecución

Para ejecutar la aplicación, abre **dos terminales separadas**. En una de ellas, inicia el servidor del backend y en la otra, el servidor de desarrollo del frontend. Asegúrate de estar en el directorio correcto para cada comando.

### Iniciar Backend
```bash
cd backend
npm start
```
(El servidor de backend se ejecutará en `http://localhost:3000`)

### Iniciar Frontend
```bash
cd frontend
npm run dev
```
(El servidor de desarrollo del frontend se ejecutará típicamente en `http://localhost:5173`)

Una vez que ambos servidores estén en ejecución, abre tu navegador y visita la URL del frontend (ej. `http://localhost:5173`) para interactuar con la aplicación.

## Características Implementadas

1.  **Frontend**:
    *   Diseño responsivo utilizando el framework CSS de Bootstrap.
    *   Navegación entre la lista de canciones y el formulario de nueva canción mediante React Router.
    *   Formulario para agregar nuevas canciones con gestión de estado de React para los campos y validación básica (campos requeridos).
    *   Visualización de la lista de canciones en un formato de tarjetas atractivo.
    *   Integración completa con el backend a través de peticiones HTTP utilizando `axios`.

2.  **Backend**:
    *   API RESTful implementada exclusivamente con Node.js y Express.
    *   Almacenamiento de la información de las canciones en una lista en memoria (sin base de datos externa).
    *   Dos endpoints principales:
        *   `GET /canciones`: Para obtener la lista completa de canciones.
        *   `POST /canciones`: Para registrar una nueva canción en la lista.
    *   Configuración de CORS (Cross-Origin Resource Sharing) para permitir que el frontend, que corre en un puerto diferente, pueda comunicarse con el backend.

## Solución de Problemas Comunes

Aquí encontrarás soluciones a los problemas más comunes que podrías enfrentar al configurar o ejecutar el proyecto:

### Error: `Failed to resolve import "bootstrap/dist/css/bootstrap.min.css"`

Este error ocurre cuando el navegador no puede encontrar el archivo CSS de Bootstrap. La causa más común es que Bootstrap no se instaló en el directorio correcto del frontend. Para solucionarlo:

1.  Asegúrate de estar en el directorio raíz de tu proyecto (`PWEjerCancion`).
2.  Navega al directorio `frontend`.
3.  Ejecuta el comando para instalar Bootstrap:
    ```bash
    cd frontend
    npm install bootstrap
    ```

Después de la instalación, reinicia el servidor de desarrollo del frontend.

### La página de bienvenida predeterminada de Vite/React sigue mostrándose al iniciar el frontend

Si después de haber configurado los componentes y la importación de Bootstrap, la página de bienvenida predeterminada de Vite/React (con el logo y el contador) aún se muestra, es probable que haya una de las siguientes causas:

1.  **Archivos CSS predeterminados que sobrescriben estilos**: Los estilos por defecto generados por Vite (`index.css` y `App.css`) pueden estar aplicando estilos que ocultan o interfieren con tu aplicación React. Para solucionarlo, vacía por completo el contenido de estos dos archivos:
    *   `frontend/src/index.css`
    *   `frontend/src/App.css`

2.  **Referencia incorrecta del archivo de entrada en `index.html`**: Si el proyecto React fue creado con una plantilla de TypeScript (`react-ts`), el archivo principal de entrada será `main.tsx`. Sin embargo, si has estado desarrollando tus componentes en JavaScript (usando la extensión `.jsx`), la referencia en `frontend/index.html` debe apuntar a este archivo. Verifica y modifica la etiqueta `<script>` en `frontend/index.html` para que apunte a `main.jsx` (si estás usando archivos JSX) en lugar de `main.tsx`:

    ```html
    <!-- Asegúrate de que el atributo src apunte a tu archivo de entrada real -->
    <script type="module" src="/src/main.jsx"></script>
    ```

    Asegúrate de que la extensión del archivo (`.jsx` o `.tsx`) en el `src` del script coincida exactamente con la extensión de tu archivo `main` en la carpeta `src`.

Después de realizar cualquiera de estas correcciones, **es fundamental detener y reiniciar el servidor de desarrollo del frontend** (`npm run dev` dentro de la carpeta `frontend`) para que los cambios surtan efecto y la aplicación se cargue correctamente. 