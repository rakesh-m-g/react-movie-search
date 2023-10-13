import React from "react";
export const Cards = (movie) => {
  console.log(movie.info);
  let imgpath = "http://image.tmdb.org/t/p/w500";
  return (
    <>
      <div className="movie">
        <img src={imgpath + movie.info.poster_path} className="poster"></img>
        <div className="movie-details">
          <div className="box">
            <h4 className="title">{movie.info.original_title}</h4>
            <p className="rating">{movie.info.vote_average}</p>
          </div>
          <div className="overview">
            <h1>Overview</h1>
            {movie.info.overview}
          </div>
        </div>
      </div>
    </>
  );
};
