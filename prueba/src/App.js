// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import ProductForm from './components/Form/productForm.jsx';
import ProductList from './components/List/productList.jsx';
import imgWoman from './assets/images/women.png';

function App() {
  const [products, setProducts] = useState(() => {
    // Intentar cargar productos guardados en localStorage
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  // Guardar productos en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const addProduct = (product) => {
    setProducts([...products, product]);
  };

  const deleteProduct = (codigo) => {
    setProducts(products.filter(product => product.codigo !== codigo));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Gestión de Productos</h1>
      </header>
      <main>
        <div className="container">
          <div className="con_ProForm">
            <ProductForm addProduct={addProduct} />
            <img
              src={imgWoman}
              alt='woman'
              width={'550px'}
              height={'auto'}
            />
          </div>
          <div className="con_ProList">
            <ProductList products={products} deleteProduct={deleteProduct} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
