import { createContext, useContext, useState } from "react"
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";
const HotelContext = createContext();
const BASE_URL = "http://localhost:5000";
function HotelsProvider({children}) {
  const [currentHotel, setCurrentHotel] = useState(null); //or useState({}) 
    const [searchParams, setSearchParams] = useSearchParams();
    const [isLoadingCurrentHotel, setIsLoadingCurrentHotel] = useState(false);
    const destination = searchParams.get("destination");

    const room = JSON.parse(searchParams.get("options"))?.room;  //RESULT Object { adult: 1, children: 0, room: 1 }
    // const { isLoading, data : hotels } = useFetch(BASE_URL/hotels,
    //      `name_like=${destination || ""}&accommodates_gte=${room || 1}`);
        //  console.log(data);
        const { isLoading, data : hotels } = useFetch(`${BASE_URL}/hotels`,
          `name_like=${destination || ""}&accommodates_gte=${room || 1}`);
        async function getHotel(id) {
          setIsLoadingCurrentHotel(true);
      try {
         const { data } = await axios.get(`${BASE_URL}/hotels/${id}`);
         
         setCurrentHotel(data);
         setIsLoadingCurrentHotel(false)
  } catch (error) {
        toast.error(error.message);
        setIsLoadingCurrentHotel(false);
          }
        }
      
      
  return (
    <HotelContext.Provider value={{isLoading,hotels, getHotel, currentHotel, isLoadingCurrentHotel}}>
        {children}
    </HotelContext.Provider>
  )
}

export default HotelsProvider




export function useHotels() {
    return useContext(HotelContext);
}