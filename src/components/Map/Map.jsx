import { MapContainer, useMap, Marker, Popup, TileLayer } from "react-leaflet";
import { useHotels } from "../../context/HotelsProvider/HotelsProvider"
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useGeoLocation from "../../hooks/useGeoLocation";

function Map() {
    const {isLoading, hotels} = useHotels(); // give data from hotels
    const [mapCenter, setMapCenter] = useState([51, -3]);
    const [searchParams, setSearchParams] = useSearchParams();
  

    const lat = searchParams.get("lat");
    const lng = searchParams.get("lang");
    // console.log(lat, lng);
    const {
      isLoading: isLoadingPosition,
      position: geolocationPosition,
      getPosition,
     } = useGeoLocation();

      useEffect(() => {
        if (lat && lng) setMapCenter([lat, lng]);
      }, [lat, lng]); //when do not use it so we write new useEffect

      useEffect(() =>{
        if(geolocationPosition?.lat && geolocationPosition?.lng) setMapCenter([geolocationPosition?.lat], [geolocationPosition?.lng])
      }, [geolocationPosition])


  return (
    <div className="mapContainer">
         <MapContainer className="map" 
         center={mapCenter} 
        // center={{ lat: 51.505, lng: -0.09 }}
        // center={[lat || 50, lng || 3]}
         zoom={10} 
         scrollWheelZoom={true}>
          <button onClick={getPosition} className="getLocation">
            {isLoadingPosition ? "Loading..." : "use your location"}
          </button>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
    />
    <ChangeCenter position={mapCenter} />
    {hotels.map((item) => (
       <Marker key={item.id} position={[item.latitude, item.longitude]}>
        <Popup>{item.host_location}</Popup>
      </Marker>
   ))}
  </MapContainer>,
    </div>
);
}

export default Map

function ChangeCenter({ position }) {
    const map = useMap();
    map.setView(position);
    return null;
}