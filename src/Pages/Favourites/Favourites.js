import React from "react";
import FavouriteCaseOne from "../../Components/Favourite Case One/FavouriteCaseOne";
import FavouriteCaseTwo from "../../Components/Favourite Case Two/FavouriteCaseTwo";
import styles from "./Favourites.module.css";

function Favourites() {
  const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

  return (
    <div>
      {storedFavorites.length === 0 ? (
        <FavouriteCaseOne />
      ) : (
        <FavouriteCaseTwo />
      )}
    </div>
  );
}
export default Favourites;
