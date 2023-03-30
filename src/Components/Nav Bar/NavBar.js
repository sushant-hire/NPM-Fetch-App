import React from "react";
import styles from "./NavBar.module.css";

function NavBar() {
  return (
    <nav className={styles.MainNavBarContainer}>
      <ul className={styles.NavListContainer}>
        <li className={styles.NavList} >●●●</li>
      </ul>
    </nav>
  );
}

export default NavBar;
