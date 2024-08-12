import { useNavigate, useParams } from "react-router-dom";
import { useBookmark } from "../context/BookmarkListContext";
import { useEffect } from "react";
import Loader from "../Loader/Loader";
import ReactCountryFlag from "react-country-flag";

function SingleBookmark() {
    const {id} = useParams();
    const navigate = useNavigate();
   const {getBookmark, currentBookmark, isLoadingCurrentBookmark} = useBookmark();

   useEffect(() => {
    getBookmark(id)
  }, [id]);


  // const handleBack = e => {
  //   e.preventDefault();
  //   navigate(-1);
  // }

  if(isLoadingCurrentBookmark || !currentBookmark) return <Loader/>

  return (
    <div>
        <h2>{currentBookmark.cityName}</h2>
        <div className="bookmarkItem" style={{marginTop: "2rem"}}>
           <ReactCountryFlag svg countryCode={currentBookmark.countryCode} />
            &nbsp; <strong>{currentBookmark.cityName}</strong> &nbsp;
            <span>{currentBookmark.country}</span>
        </div>
        <button onClick={() => navigate(-1)} className="btn btn--back">&larr; back </button>

      
    </div>
  )
}

export default SingleBookmark