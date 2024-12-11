import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/Catalogo.css";
import { API_BASE_URL, SEARCH_PRODUCTS } from "../config";

export default function Catalogo() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [sortOption, setSortOption] = useState("none"); // Estado para la opción de ordenación
  const [page, setPage] = useState(1); // Estado para la página actual
  const [pageSize, setPageSize] = useState(6); // Estado para el tamaño de página (número de productos por página)
  const [totalPages, setTotalPages] = useState(0); // Estado para el número total de páginas

  // Llamada para obtener productos filtrados con paginación
  const fetchProducts = async (query, sortOption, page, pageSize) => {
    console.log(SEARCH_PRODUCTS)
    try {
      const response = await fetch(`${SEARCH_PRODUCTS}?query=${query}&option=${sortOption}&page=${page}&pageSize=${pageSize}`);
      if (!response.ok) {
        throw new Error("Error al obtener productos");
      }
      console.log(SEARCH_PRODUCTS)
      const data = await response.json();

      // Obtiene el total de págines desde la cabecera de response
      setTotalPages(parseInt(response.headers.get("X-Total-Count"), 10));

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
      {error && <p className="error">{error}</p>}

      {/* Campo de búsqueda */}
      <div className="busqueda">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Buscar productos..."
          className="search-input"
        />
        <button className="buscar" onClick={handleSearchChange}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M13.0096 7.4C13.0096 8.13541 12.8648 8.86361 12.5833 9.54303C12.3019 10.2225 11.8894 10.8398 11.3694 11.3598C10.8494 11.8798 10.2321 12.2923 9.55264 12.5737C8.87322 12.8552 8.14502 13 7.40962 13C6.67421 13 5.94601 12.8552 5.26659 12.5737C4.58717 12.2923 3.96983 11.8798 3.44982 11.3598C2.92981 10.8398 2.51732 10.2225 2.23589 9.54303C1.95447 8.86361 1.80962 8.13541 1.80962 7.4C1.80962 5.91479 2.39962 4.49041 3.44982 3.44021C4.50002 2.39 5.9244 1.8 7.40962 1.8C8.89483 1.8 10.3192 2.39 11.3694 3.44021C12.4196 4.49041 13.0096 5.91479 13.0096 7.4ZM11.904 13.0256C10.4663 14.1742 8.64332 14.7287 6.80951 14.5753C4.97571 14.4218 3.27026 13.572 2.04344 12.2004C0.816618 10.8288 0.161543 9.0395 0.212752 7.19999C0.263961 5.36049 1.01757 3.61041 2.31879 2.30918C3.62002 1.00795 5.3701 0.254347 7.20961 0.203139C9.04911 0.15193 10.8384 0.807005 12.21 2.03383C13.5816 3.26065 14.4314 4.96609 14.5849 6.7999C14.7383 8.6337 14.1838 10.4567 13.0352 11.8944L17.576 16.4336C17.6504 16.508 17.7094 16.5963 17.7497 16.6935C17.7899 16.7907 17.8106 16.8948 17.8106 17C17.8106 17.1052 17.7899 17.2094 17.7497 17.3065C17.7094 17.4037 17.6504 17.492 17.576 17.5664C17.5016 17.6408 17.4133 17.6998 17.3162 17.74C17.219 17.7803 17.1148 17.801 17.0096 17.801C16.9044 17.801 16.8003 17.7803 16.7031 17.74C16.6059 17.6998 16.5176 17.6408 16.4432 17.5664L11.904 13.0256Z"
              fill="#030303"
            />
          </svg>
        </button>
      </div>

      {/* Filtro de ordenación */}
      <div className="order-container">
        <select
          onChange={handleSortChange}
          value={sortOption}
          className="sort-select1"
        >
          <option value="none">Ordenar por...</option>
          <option value="PriceAsc">Precio: Menor a Mayor</option>
          <option value="PriceDesc">Precio: Mayor a Menor</option>
          <option value="NameAsc">Nombre: A-Z</option>
          <option value="NameDesc">Nombre: Z-A</option>
        </select>
        <select
          onChange={handlePageSizeChange}
          value={pageSize}
          className="sort-select2"
        >
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
              <img
                src={`${API_BASE_URL}${product.imageUrl}`}
                alt={product.name}
                className="product-image"
              />
              <h2>{product.name}</h2>
              <p className="product-description">{product.description}</p>
              <p className="product-price">{product.price}€</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Controles de paginación */}
      <div className="pagination">
        <button
          className="boton-paginas"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Anterior
        </button>
        <span>
          Página {page} de {totalPages}
        </span>
        <button
          className="boton-paginas"
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
