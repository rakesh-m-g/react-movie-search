import React, { useState, useEffect, useRef } from "react";
import { Cards } from "./Cards";
import { useInView } from "react-intersection-observer";
import MovieModal from "./MovieModal";

export const Main = () => {
  let Api_key = "6ea23c5783115494fff3c1489dd20ae4";
  let baseurl = "https://api.themoviedb.org/3/movie/";

  const [movieData, setMovieData] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("28"); // Default genre ID (Action)
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleMovies, setVisibleMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("popularity.desc"); // Default sorting

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // State to control modal visibility
  const [showModal, setShowModal] = useState(false);

  // State to store selected movie details
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Function to open the modal and set the selected movie
  const openModal = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedMovie(null);
    setShowModal(false);
  };

  useEffect(() => {
    let URL = `${baseurl}popular?api_key=${Api_key}&page=${page}`;

    if (searchQuery) {
      URL = `https://api.themoviedb.org/3/search/movie?api_key=${Api_key}&query=${searchQuery}&page=${page}`;
    } else {
      URL = `${baseurl}popular?api_key=${Api_key}&page=${page}&with_genres=${selectedGenre}`;
    }
    if (sortBy === "popularity.desc") {
      URL += "&sort_by=popularity.desc";
    } else if (sortBy === "release_date.desc") {
      URL += "&sort_by=release_date.desc";
    } else if (sortBy === "vote_average.desc") {
      URL += "&sort_by=vote_average.desc";
    } else if (sortBy === "vote_average.asc") {
      URL += "&sort_by=vote_average.asc";
    }

    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        if (page === 1) {
          setMovieData(data.results);
        } else {
          setMovieData([...movieData, ...data.results]);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [selectedGenre, searchQuery, page, sortBy]);

  useEffect(() => {
    const sortedMovies = [...movieData];

    if (sortBy === "popularity.desc") {
      sortedMovies.sort((a, b) => b.popularity - a.popularity);
    } else if (sortBy === "release_date.desc") {
      sortedMovies.sort(
        (a, b) =>
          new Date(b.release_date).getTime() -
          new Date(a.release_date).getTime()
      );
    } else if (sortBy === "vote_average.desc") {
      sortedMovies.sort((a, b) => b.vote_average - a.vote_average);
    } else if (sortBy === "vote_average.asc") {
      sortedMovies.sort((a, b) => a.vote_average - b.vote_average);
    }

    setVisibleMovies(sortedMovies);
  }, [sortBy, movieData]);

  const handleGenreChange = (newGenre) => {
    setSelectedGenre(newGenre);
    setSearchQuery("");
    setPage(1);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const query = event.target.elements.searchInput.value.trim();
    if (query) {
      setSelectedGenre("");
      setSearchQuery(query);
      setPage(1);
    }
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const loadMoreMovies = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (inView) {
      loadMoreMovies();
    }
  }, [inView]);

  return (
    <>
      <div className="header">
        <nav>
          <ul>
            <li><h2 className="for-you">For You </h2></li>
            <li>
              <a href="#" onClick={() => handleGenreChange("28")}>
              <h2>  Action </h2>
              </a>
            </li>
            <li>
              <a href="#" onClick={() => handleGenreChange("35")}>
              <h2>   Comedy </h2>
              </a>
            </li>
            <li>
              <a href="#" onClick={() => handleGenreChange("18")}>
              <h2> Drama  </h2>
              </a>
            </li>
            <li>
              <a href="#" onClick={() => handleGenreChange("53")}>
              <h2>   Crime  </h2>
              </a>
            </li>
          </ul>
        </nav>
        <form onSubmit={handleSearch}>
          <div className="search-btn">
            <input
              type="text"
              placeholder="Enter movie"
              className="inputtext"
              name="searchInput"
            />
            <button type="submit" className="search-icon-button" >
       
               <p1>Search</p1>
             
            </button>
          </div>
        </form>
        <div className="sort-container">
          <label htmlFor="sortSelect"><p1>Sort by:</p1></label>
          <select id="sortSelect" value={sortBy} onChange={handleSortChange}>
            <option value="popularity.desc"><h1>Popularity</h1></option>
            <option value="release_date.desc">Release Date (Descending)</option>
            <option value="vote_average.desc">Vote Average (Descending)</option>
            <option value="vote_average.asc">Vote Average (Ascending)</option>
          </select>
        </div>
      </div>
      <div className="container">
        {visibleMovies && visibleMovies.length === 0 ? (
          <p className="notfound">No movies found</p>
        ) : (
          visibleMovies.map((res, pos) => (
            <div key={pos} ref={pos === visibleMovies.length - 1 ? ref : null}>
              {/* Add an onClick handler to open the modal */}
              <div onClick={() => openModal(res)}>
                <Cards info={res} />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Render the MovieModal component */}
      {selectedMovie && (
        <MovieModal
          show={showModal}
          handleClose={closeModal}
          movie={selectedMovie}
        />
      )}
    </>
  );
};
