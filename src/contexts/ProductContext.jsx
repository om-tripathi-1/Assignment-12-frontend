import { createContext, useCallback, useContext, useState } from "react";
import { getProductById } from "../api/product.service";

const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const loadProduct = useCallback(async (productId) => {
    try {
      setIsLoading(true);
      setError("");
      const response = await getProductById(productId);
      const loadedProduct = response.product || response;
      setProduct(loadedProduct);
      return loadedProduct;
    } catch (loadError) {
      setProduct(null);
      setError(
        loadError.response?.data?.message || "Unable to load this product."
      );
      throw loadError;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearProduct = () => {
    setProduct(null);
    setError("");
  };

  return (
    <ProductContext.Provider
      value={{ product, isLoading, error, loadProduct, clearProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }

  return context;
};
