import React, { useState } from "react";
import FavouriteCaseOne from "../Favourite Case One/FavouriteCaseOne";
import styles from "./FavouriteCaseTwo.module.css";
import { Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function FavouriteCaseTwo() {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [editedMessage, setEditedMessage] = useState(null);
  const [viewPackage, setViewPackage] = useState(null);

  function handleViewPackage(id) {
    const selectedPackage = favorites.find((favorite) => favorite.id === id);
    setViewPackage(selectedPackage);
  }

  function handleDelete(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedFavorites = favorites.filter(
          (favorite) => favorite.id !== id
        );
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        Swal.fire("Deleted!", "The package has been deleted.", "success");
      }
    });
  }

  function handleViewMessage(id) {
    const selectedFavorite = favorites.find((favorite) => favorite.id === id);
    setSelectedPackage(selectedFavorite);
    setEditedMessage(selectedFavorite.message);
  }

  function handleSave() {
    const updatedFavorites = favorites.map((favorite) => {
      if (favorite.id === selectedPackage.id) {
        return { ...favorite, message: editedMessage };
      } else {
        return favorite;
      }
    });
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setSelectedPackage(null);
  }

  if (favorites.length === 0) {
    return <FavouriteCaseOne />;
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Welcome to Favorite NPM Packages</h3>
      <Link to="/">
        <button className={styles.BackButton}>Back</button>
      </Link>
      <ul className={styles.list}>
        {favorites.map((favorite) => (
          <li key={favorite.id} className={styles.item}>
            <span className={styles.name}>{favorite.package}</span>
            <div className={styles.actions}>
              <button
                className={styles.action}
                onClick={() => handleViewPackage(favorite.id)}
              >
                View
              </button>
              <button
                className={styles.action}
                onClick={() => handleViewMessage(favorite.id)}
              >
                Edit
              </button>
              <button
                className={styles.action}
                onClick={() => handleDelete(favorite.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <Modal show={viewPackage !== null} onHide={() => setViewPackage(null)}>
        <Modal.Header closeButton>
          <Modal.Title>{viewPackage?.package}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{viewPackage?.message}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setViewPackage(null)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={selectedPackage !== null}
        onHide={() => setSelectedPackage(null)}
      >
        <Modal.Header closeButton>
          <Modal.Title>{selectedPackage?.package}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                className="form-control"
                value={editedMessage}
                onChange={(e) => setEditedMessage(e.target.value)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelectedPackage(null)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default FavouriteCaseTwo;
