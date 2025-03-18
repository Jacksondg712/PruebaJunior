import './_productList.scss';
import React, { useState } from 'react';

function ProductList({ products, deleteProduct }) {
  const [sortField, setSortField] = useState('codigo');
  const [sortDirection, setSortDirection] = useState('asc');

  // Formateador de fechas
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Función para ordenar los productos
  const sortProducts = (productsArray) => {
    return [...productsArray].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      // Manejo especial para fechas
      if (sortField === 'creacion') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }
      
      // Ordenar strings ignorando mayúsculas/minúsculas
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (aValue < bValue) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  // Manejar cambios en la opción de ordenamiento
  const handleSortChange = (e) => {
    const { value } = e.target;
    setSortField(value);
  };

  // Cambiar dirección de ordenamiento
  const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  // Productos ordenados según los criterios seleccionados
  const sortedProducts = sortProducts(products);

  return (
    <div className="cardlist">
      <div className="card_header_List">
        <h2>Lista de Productos</h2>
      </div>
      <div className="card-body">
        {products.length === 0 ? (
          <p className="text-center">No hay productos registrados</p>
        ) : (
          <>
            <div className='Cont_Filtro'>
              <div className="me-2">
                <label htmlFor="sortField" className="me-2">Ordenar por: </label>
                <select 
                  id="sortField" 
                  className="list_select" 
                  value={sortField} 
                  onChange={handleSortChange}
                >
                  <option value="codigo">Código</option>
                  <option value="nombre">Nombre</option>
                  <option value="cantidad">Cantidad</option>
                  <option value="creacion">Fecha de Creación</option>
                </select>
              </div>
              <button 
                className="btnAcsDes" 
                onClick={toggleSortDirection}
              >
                {sortDirection === 'asc' ? '↑ Ascendente' : '↓ Descendente'}
              </button>
            </div>
            
            <div className="Cont_Table">
              <table className='Table'>
                <thead>
                  <tr className='subtable'>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Cantidad</th>
                    <th>Fecha de Creación</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedProducts.map((product) => (
                    <tr key={product.codigo}>
                      <td>{product.codigo}</td>
                      <td>{product.nombre}</td>
                      <td>{product.descripcion}</td>
                      <td>{product.cantidad}</td>
                      <td>{formatDate(product.creacion)}</td>
                      <td>
                        <button 
                          className="btnList"
                          onClick={() => deleteProduct(product.codigo)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductList;