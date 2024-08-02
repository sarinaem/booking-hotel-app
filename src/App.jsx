
import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./components/Header/Header";
import LocationList from "./components/LocationList/LocationList";
import { Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout/AppLayout";
import Hotels from "./components/Hotels/Hotels";
import HotelsProvider from "./context/HotelsProvider/HotelsProvider";

function App() {
  return <HotelsProvider>
    <Toaster />
    <Header />
    <Routes>
      <Route path="/" element={<LocationList />}/>
      <Route path="/hotels" element={<AppLayout />}>
        <Route index element={<Hotels />}></Route>
        <Route path=":id" element={<div>single hotel</div>}></Route>
      </Route>
    </Routes>
    {/* <LocationList /> */}
  </HotelsProvider>
}

export default App;
