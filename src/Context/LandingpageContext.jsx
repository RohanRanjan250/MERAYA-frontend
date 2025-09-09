import { createContext, useState, useEffect } from "react";
import { openAPI } from '../API/instance.jsx'

export const LandingContext = createContext();

export function LandingProvider({ children }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchLandingData() {
        try{
            const response = await openAPI.get("/get_all_products")  ;

            if(response.status === 200){
              console.log(response) ;
                const isAuth = response.data.isAuthenticated ;
                localStorage.setItem("isAuthenticated", JSON.stringify(isAuth));
                setData(response.data.products) ;
            }
        }
        catch(err){
            console.log(err)
        }
    }
    fetchLandingData();
  }, []);

  return (
    <LandingContext.Provider value={{ data}}>
      {children}
    </LandingContext.Provider>
  );
}