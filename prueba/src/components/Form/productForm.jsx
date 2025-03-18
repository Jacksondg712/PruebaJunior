import React, { useState } from 'react';
import './_productForm.scss';


function ProductForm({ addProduct }) {
  const [formData, setFormData] = useState({
    codigo: '',
    nombre: '',
    descripcion: '',
    cantidad: '',
    creacion: new Date().toISOString().split('T')[0]
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación
    if (!formData.codigo || !formData.nombre || !formData.cantidad) {
      setError('Los campos código, nombre y cantidad son obligatorios');
      return;
    }

    // Validar que código y cantidad sean números
    if (isNaN(formData.codigo) || isNaN(formData.cantidad)) {
      setError('El código y la cantidad deben ser números');
      return;
    }

    // Convertir a los tipos de datos adecuados
    const newProduct = {
      ...formData,
      codigo: Number(formData.codigo),
      cantidad: Number(formData.cantidad)
    };

    addProduct(newProduct);
    setError('');
    
    // Limpiar el formulario
    setFormData({
      codigo: '',
      nombre: '',
      descripcion: '',
      cantidad: '',
      creacion: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="card">
      <div className="card_header">
        <h2>Agregar Producto</h2>
      </div>
      <div className="card-body">
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
            <div className='Cont_dualInput'>
                <div className="Cont_Input center">
                  <label htmlFor="codigo">Código:</label>
                  <input
                    type="number"
                    className="inputForm"
                    id="codigo"
                    name="codigo"
                    value={formData.codigo}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="Cont_Input center">
                  <label htmlFor="nombre">Nombre:</label>
                  <input
                    type="text"
                    className="inputForm"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>
            </div>
            <div className="Cont_Input center">
              <label htmlFor="descripcion">Descripción:</label>
              <textarea
                className="center des_form inputForm"
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
              />
            </div>

            <div className='Cont_dualInput'>
                <div className="Cont_Input center">
                  <label htmlFor="cantidad">Cantidad:</label>
                  <input
                    type="number"
                    className="inputForm"
                    id="cantidad"
                    name="cantidad"
                    value={formData.cantidad}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="Cont_Input center">
                  <label htmlFor="creacion">Fecha de creación:</label>
                  <input
                    type="date"
                    className="inputForm calen"
                    id="creacion"
                    name="creacion"
                    value={formData.creacion}
                    onChange={handleChange}
                    required
                  />
                </div>
            </div>


            <button type="submit" className="btnForm">Agregar Producto</button>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;