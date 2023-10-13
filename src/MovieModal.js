import React from "react";
import { Modal, Button } from "react-bootstrap";

const MovieModal = ({ show, handleClose, movie }) => {
  return (
    <Modal show={show} onHide={handleClose}>
    
       <div style={{padding:"1em"}}> <Modal.Title>{movie.original_title}</Modal.Title></div>
      
      <Modal.Body>
        <div className="text-center">
          <img
            src={`http://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={`${movie.original_title} Poster`}
            className="img-fluid"
          />
        </div>
        <p>
          <strong>Release Date:</strong> {movie.release_date}
        </p>
        <p>
          <strong>Overview:</strong> {movie.overview}
        </p>
        <p>
          <strong>Rating:</strong> {movie.vote_average}
        </p>
        <p>
          <strong>Genres:</strong>{" "}
          {movie.genres && movie.genres.length > 0
            ? movie.genres.map((genre) => genre.name).join(", ")
            : "No genres available"}
        </p>
        <p>
          <strong>Runtime:</strong>{" "}
          {movie.runtime ? `${movie.runtime} minutes` : "N/A"}
        </p>
        <p>
          <strong>Original Language:</strong>{" "}
          {movie.original_language ? movie.original_language : "N/A"}
        </p>
      </Modal.Body>
      <Modal.Footer>
       <div style={{padding:"1em"}}> <Button  variant="secondary" onClick={handleClose}>
          Close
        </Button></div>
      </Modal.Footer>
    </Modal>
  );
};

export default MovieModal;
