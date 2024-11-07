import { useEffect, useState } from 'react';
import '../css/Catalogo.css';

export default function Catalogo() {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState('');
    const [sortOption, setSortOption] = useState('none');  // Estado para la opción de ordenación

    // Llamada para obtener productos filtrados
    const fetchProducts = async (query, sortOption) => {
        try {
            const url = query 
                ? `https://localhost:7261/api/SmartSearch?query=${query}&option=${sortOption}` 
                : `https://localhost:7261/api/Product?option=${sortOption}`; // Si no hay query, obtener todos productos con opción de ordenación
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Error al obtener productos");
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            setError(error.message);
        }
    };

    // Efecto para obtener productos al cargar el componente
    useEffect(() => {
        fetchProducts('', sortOption);
    }, [sortOption]);

    // Manejo del cambio en el campo de búsqueda
    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        fetchProducts(query, sortOption); // Llamada para obtener productos filtrados y ordenados
    };

    // Manejo del cambio en la opción de ordenación
    const handleSortChange = (event) => {
        const option = event.target.value;
        setSortOption(option);
        fetchProducts(searchQuery, option);  // Llamada para obtener productos con la nueva opción de ordenación
    };

    return (
        <div className="catalog-container">
            <h1>Catálogo de Productos</h1>
            {error && <p className="error">{error}</p>}
            
            {/* Campo de búsqueda */}
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Buscar productos..."
                className="search-input"
            />

            {/* Filtro de ordenación */}
            <select onChange={handleSortChange} value={sortOption} className="sort-select">
                <option value="none">Ordenar por...</option>
                <option value="PriceAsc">Precio: Menor a Mayor</option>
                <option value="PriceDesc">Precio: Mayor a Menor</option>
                <option value="NameAsc">Nombre: A-Z</option>
                <option value="NameDesc">Nombre: Z-A</option>
            </select>

            <div className="product-grid">
                {products.map((product, index) => (
                    <div key={index} className="product-item">
                        <img src={product.imageUrl} alt={product.name} className="product-image" />
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p className="product-price">{product.price}€</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
