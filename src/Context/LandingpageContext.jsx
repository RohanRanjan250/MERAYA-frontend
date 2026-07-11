import { createContext, useState, useEffect } from "react";
import { openAPI } from "../API/instance.jsx";

export const LandingContext = createContext();

export function LandingProvider({ children }) {
  const [data, setData] = useState([]);
  const [selectedProduct, setselectedProduct] = useState(null);
  useEffect(() => {
    async function fetchLandingData() {
      try {
        const response = await openAPI.get("/get_all_products");

        if (response.status === 200) {
          setData(response.data.products);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchLandingData()
  }, []);

  return (
    <LandingContext.Provider value={{ data, selectedProduct, setselectedProduct }}>
      {children}
    </LandingContext.Provider>
  );
}
