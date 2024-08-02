import { createContext, useContext } from "react"
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const HotelContext = createContext();
function HotelsProvider({children}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const destination = searchParams.get("destination");

    const room = JSON.parse(searchParams.get("options"))?.room;  //RESULT Object { adult: 1, children: 0, room: 1 }
    const { isLoading, data : hotels } = useFetch("http://localhost:5000/hotels",
         `name_like=${destination || ""}&accommodates_gte=${room || 1}`);
        //  console.log(data);
  return (
    <HotelContext.Provider value={{isLoading,hotels}}>
        {children}
    </HotelContext.Provider>
  )
}

export default HotelsProvider




export function useHotels() {
    return useContext(HotelContext);
}