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