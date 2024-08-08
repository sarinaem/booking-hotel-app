import { useNavigate, useParams } from "react-router-dom";
import { useBookmark } from "../context/BookmarkListContext";
import { useEffect } from "react";
import Loader from "../Loader/Loader";

function SingleBookmark() {
    const {id} = useParams();
    const navigate = useNavigate();
   const {getBookmark, currentBookmark, isLoadingCurrentBookmark} = useBookmark();

   useEffect(() => {
    getBookmark(id)
  }, [id]);


  const handleBack = e => {
    e.preventDefault();
    navigate(-1);
  }

  if(isLoadingCurrentBookmark || !currentBookmark) return <Loader/>

  return (
    <div>
        <button onClick={handleBack} className="btn btn--back">&larr; back</button>
        <h2>{currentBookmark.cityName}</h2>
        <p>{currentBookmark.cityName} - {currentBookmark.country}</p>
    </div>
  )
}

export default SingleBookmark