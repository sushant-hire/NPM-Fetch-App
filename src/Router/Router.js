import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "../Components/Nav Bar/NavBar";
import Favourites from "../Pages/Favourites/Favourites";
import Home from "../Pages/Home/Home";

function Router() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/favourites" element={<Favourites />}></Route>
      </Routes>
    </div>
  );
}

export default Router;
