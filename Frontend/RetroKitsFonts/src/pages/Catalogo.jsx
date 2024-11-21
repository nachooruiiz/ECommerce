import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import '../css/Catalogo.css';

export default function Catalogo() {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState('');
    const [sortOption, setSortOption] = useState('none'); // Estado para la opción de ordenación
    const [page, setPage] = useState(1); // Estado para la página actual
    const [pageSize, setPageSize] = useState(3); // Estado para el tamaño de página (número de productos por página)
    const [totalPages, setTotalPages] = useState(0); // Estado para el número total de páginas

    // Llamada para obtener productos filtrados con paginación
    const fetchProducts = async (query, sortOption, page, pageSize) => {
        try {
            const url = `https://localhost:7261/api/SmartSearch?query=${query}&option=${sortOption}&page=${page}&pageSize=${pageSize}`;
            
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Error al obtener productos");
            }
            
            const data = await response.json();
            
            // Obtiene el total de págines desde la cabecera de response
            setTotalPages(parseInt(response.headers.get("X-Total-Count"), 10));
            console.log(totalPages)

            setProducts(data);
        } catch (error) {
            setError(error.message);
        }
    };

    // Efecto para obtener productos al cargar el componente y al cambiar la página, opción de ordenación, o el tamaño de página
    useEffect(() => {
        fetchProducts(searchQuery, sortOption, page, pageSize);
    }, [searchQuery, sortOption, page, pageSize]);

    // Manejo del cambio en el campo de búsqueda
    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        setPage(1); // Resetear a la primera página al cambiar la búsqueda
    };

    // Manejo del cambio en la opción de ordenación
    const handleSortChange = (event) => {
        const option = event.target.value;
        setSortOption(option);
        setPage(1); // Resetear a la primera página al cambiar la ordenación
    };

    // Manejo del cambio en el tamaño de página
    const handlePageSizeChange = (event) => {
        const size = parseInt(event.target.value, 10);
        setPageSize(size);
        setPage(1); // Resetear a la primera página al cambiar el tamaño de la página
    };

    // Función para cambiar de página
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <div className="catalog-container">
            <img src="/Imagenes/Catalogo.png" className="catalogo-image" />
            
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
            <div className="order-container">
                <select onChange={handleSortChange} value={sortOption} className="sort-select1">
                    <option value="none">Ordenar por...</option>
                    <option value="PriceAsc">Precio: Menor a Mayor</option>
                    <option value="PriceDesc">Precio: Mayor a Menor</option>
                    <option value="NameAsc">Nombre: A-Z</option>
                    <option value="NameDesc">Nombre: Z-A</option>
                </select>
                <select onChange={handlePageSizeChange} value={pageSize} className="sort-select2">
                    <option value="3">3</option>
                    <option value="6">6</option>
                    <option value="9">9</option>
                </select>
            </div>

            {/* Mostrar productos */}
            <div className="product-grid">
                {products.map((product, index) => (
                    <Link to={`/Catalogo/${product.id}`} key={product.id}>
                        <div key={index} className="product-item">
                        <img src={`https://localhost:7261${product.imageUrl}`} alt={product.name} className="product-image" />
                        <h2>{product.name}</h2>
                        <p className="product-description">{product.description}</p>
                        <p className="product-price">{product.price}€</p>
                        
                        </div>
                    </Link>
                ))}
            </div>

            {/* Controles de paginación */}
            <div className="pagination">
                <button className='boton-paginas' onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
                    Anterior
                </button>
                <span>Página {page} de {totalPages}</span>
                <button className="boton-paginas" onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
                    Siguiente
                </button>
            </div>
        </div>
    );
}
