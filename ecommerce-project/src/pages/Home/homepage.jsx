import axios from "axios";
import { useEffect, useState } from "react";
import "./homepage.css";
import { Header } from "../../components/Header.jsx";
import { ProductsGrid } from "./productsGrid.jsx";

export function HomePage({ cart, loadCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchHomeData = async () => {
      const response = await axios.get("/api/products");
      setProducts(response.data);
    };

    fetchHomeData();
  }, []);

  return (
    <>
      <Header cart={cart} />
      <title>Ecommerce Project</title>

      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}
