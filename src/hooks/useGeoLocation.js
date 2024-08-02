import { useState } from "react"

export default function useGeoLocation() {
    //use state
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [position, setPosition] = useState({});

    //use it: when user  click on button, this function is run
    function getPosition() {
        if(!navigator.geolocation) return setError("your browser does not support geolocation")
         //use navigator browser
         setIsLoading(true);
         navigator.geolocation.getCurrentPosition((pos) => {
            setPosition({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
            });
            setIsLoading(false);

         }, (error) => {
            setError(error.message);
            setIsLoading(false);

         })
    }
  return {isLoading, error, position ,getPosition}
}
