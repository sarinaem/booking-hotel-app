import { MdLocationCity, MdOutlineModeNight  } from "react-icons/md";
import useFetch from "../../hooks/useFetch";
import Loader from "../Loader/Loader";

function LocationList() {
    const { data, isLoading }= useFetch("http://localhost:5000/hotels", "");
    if (isLoading) return <Loader />

  return (
    <div className="nearbyLocation">
                <h2>Near By Location</h2>
                <p className="locationText">
                In Tehran Rent Offers real estate, we can find an apartment in Tehran with full facilities and full furnished in the best areas of Tehran with the best amenities for you.
               the best areas of Tehran with the best amenities for you.In Tehran Rent Offers real estate, we can find an apartment in Tehran with full facilities and full furnished in the best areas of Tehran with the best amenities for you.</p>
                <div className="locationList">
                   {data.map((item) => {
                    return (
                        <div className="locationItem" key={item.id}>
                            <img src={item.xl_picture_url} alt={item.name} />
                            <div className="locationItemDesc">
                              <p className="name">
                                {item.name}
                              </p>

                              <p className="location">
                                <MdLocationCity className="location_icon" />
                                {item.smart_location}
                              </p>
                              <p className="price">
                              €&nbsp;{item.price}&nbsp;
                              <span>
                              <MdOutlineModeNight />
                                <span>night</span>
                              </span>
                              </p>
                            </div>
                        </div>
                    )
                   })}
                </div>
    </div>
  )
}

export default LocationList



