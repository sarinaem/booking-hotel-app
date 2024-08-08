import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHotels } from '../context/HotelsProvider';
import Loader from '../Loader/Loader';
function SingleHotels() {
   const {id} = useParams(); //take data and it dynamic route to access params
  //  const { data, isLoading}=useFetch(`http://localhost:5000/hotels/${id}`); //send requet to add
  //  //use endpoint
  const {getHotel, isLoadingCurrentHotel, currentHotel} = useHotels();
  useEffect(() => {
    getHotel(id)
  }, [id])

   if(isLoadingCurrentHotel || !currentHotel) return <Loader />
   //!currentHotel just when   const [currentHotel, setCurrentHotel] = useState(null) in hotelProvide unless just put {} insteadof null

  return (
    <div className='room'>
        <div className="roomDetail">
            <h2>{currentHotel.name}</h2>
            <div>
                {currentHotel.number_of_reviews} reviews &bull; {currentHotel.smart_location}
            </div>
            <img src={currentHotel.xl_picture_url} alt={currentHotel.name}  />
        </div>
    </div>
  );
}

export default SingleHotels