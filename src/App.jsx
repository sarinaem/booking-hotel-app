
import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./components/Header/Header";
import LocationList from "./components/LocationList/LocationList";
import { Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout/AppLayout";
import Hotels from "./components/Hotels/Hotels";
import HotelsProvider from "./components/context/HotelsProvider";
import SingleHotels from "./components/SingleHotels/SingleHotels";
import BookMarkLayout from "./components/BookMarkLayout/BookMarkLayout";
import BookmarkListProvider from "./components/context/BookmarkListContext";
import Bookmark from "./components/Bookmark/Bookmark";
import SingleBookmark from "./components/SingleBookmark/SingleBookmark";
import AddNewBookmark from "./components/AddNewBookmark/AddNewBookmark";
function App() {
  return <BookmarkListProvider>
    <HotelsProvider>
    <Toaster />
    <Header />
    <Routes>
      <Route path="/" element={<LocationList />}/>
      <Route path="/hotels" element={<AppLayout />}>
        <Route index element={<Hotels />} />
        <Route path=":id" element={<SingleHotels />} />
      </Route>
        <Route path="/bookmark" element={<BookMarkLayout />}>
           <Route index element={<Bookmark />} />
           <Route path=":id" element={<SingleBookmark/>} />
           <Route path=":add" element={ <AddNewBookmark />
} />
      </Route>
    </Routes>
    {/* <LocationList /> */}
  </HotelsProvider>
  </BookmarkListProvider>
}

export default App;
