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