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