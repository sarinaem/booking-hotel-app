import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { MdOutlineModeNight } from "react-icons/md";
import { useHotels } from "../../context/HotelsProvider/HotelsProvider";
function Hotels() {
  const {isLoading, hotels} = useHotels();
    if (isLoading) return <Loader />;
    return (
    <div className="searchList">
        <h2 className="">Search Result: ({hotels.length}) </h2>
{        hotels.map(item => {
    return <Link key={item.id} 
    to={`/hotels/${item.id}?lat=${item.latitude}&lang=${item.longitude}`}>

        <div className="searchItem">
            <img src={item.xl_picture_url} alt={item.name} />
            <div className="searchItemDesc">
                <p className="location">{item.smart_location}</p>
                <p className="name">{item.name}</p>
                <p className="price">
                      €&nbsp;{item.price}&nbsp;
                      <span>
                     <MdOutlineModeNight />
                    <span>night</span>
                    </span>
                </p>
            </div>
        </div>
    </Link>
})
}
    </div>
    )
}

export default Hotels