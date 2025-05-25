// pages/Products.jsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductList from "../components/ProductList/ProductList";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    const fetchUrl = category
      ? `https://fakestoreapi.com/products/category/${category}`
      : "https://fakestoreapi.com/products";

    fetch(fetchUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar productos");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [category]); // <- Agregamos category como dependencia

  if (loading)
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-2">Cargando productos...</p>
      </div>
    );

  if (error)
    return (
      <div className="alert alert-danger m-4">
        Error al cargar los productos: {error}
      </div>
    );

  return (
    <div className="container">
      <h1 className="my-4 text-center">
        {category ? `Productos de ${category}` : "Nuestros Productos"}
      </h1>
      <ProductList products={products} />
    </div>
  );
};

export default Products;
