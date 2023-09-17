/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import MovieCard from "./Components/MovieCard";
import Alert from "react-bootstrap/Alert";
import Pagination from "react-bootstrap/Pagination";
import axios from "axios";
import "./Style/home.css";

function Home() {
  const api = "f4859cf2c23285090d31cc35e37c8ef9";
  const img_path = "https://image.tmdb.org/t/p/w300";

  const [allMovies, setAllMovies] = useState({
    movies: [],
    loading: false,
    searchResulte: false,
    reload: 0,
  });
  const [lang, setLang] = useState("en-US");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [query, setQuery] = useState("");

  const fetchPopularMovies = () => {
    setAllMovies({ ...allMovies, loading: true, searchResulte: false });
    axios
      .get("https://api.themoviedb.org/3/movie/popular", {
        params: {
          api_key: api,
          language: lang,
          page: currentPage,
        },
      })
      .then((response) => {
        setTotalPages(response.data.total_pages);
        setAllMovies({
          ...allMovies,
          loading: false,
          movies: response.data.results,
        });
      })
      .catch((err) => {
        setAllMovies({
          ...allMovies,
          loading: false,
          searchResulte: false,
        });
        console.log(err);
      });
  };

  useEffect(() => {
    fetchPopularMovies();
  }, [lang, currentPage, allMovies.reload + 1]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  const renderPaginationItems = () => {
    const pageItems = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === currentPage ||
        i === currentPage - 1 ||
        i === currentPage + 1 ||
        i === 1 ||
        i === totalPages
      ) {
        pageItems.push(
          <Pagination.Item
            key={i}
            active={i === currentPage}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Pagination.Item>
        );
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pageItems.push(<Pagination.Ellipsis key={i} disabled />);
      }
    }

    return pageItems;
  };

  const searchMovies = () => {
    if (query !== "") {
      setAllMovies({ ...allMovies, loading: true, searchResulte: false });
      axios
        .get("https://api.themoviedb.org/3/search/movie", {
          params: {
            api_key: api,
            query: query,
          },
        })
        .then((response) => {
          response.data.results.length === 0
            ? setAllMovies({
                ...allMovies,
                loading: false,
                movies: response.data.results,
                searchResulte: false,
              })
            : setAllMovies({
                ...allMovies,
                loading: false,
                movies: response.data.results,
                searchResulte: true,
              });
          setTotalPages(response.data.total_pages);
        })
        .catch((err) => {
          setAllMovies({
            ...allMovies,
            loading: false,
            searchResulte: false,
          });
          console.log(err);
        });
    }
  };

  const handleSearchInputBlur = () => {
    if (query.trim() === "") {
      setCurrentPage(1);
      fetchPopularMovies();
    }
  };

  const displayMovies = () => {
    return (
      <>
        <div className="movies-card">
          {allMovies.movies.map((movie) => {
            return (
              <MovieCard
                img={`${img_path}${movie.poster_path}`}
                title={movie.title}
                key={movie.id}
                id={movie.id}
                date={movie.release_date}
                rate={movie.vote_average}
              />
            );
          })}
        </div>
        <Pagination>
          <Pagination.First onClick={handleFirstPage} />
          <Pagination.Prev onClick={handlePrevPage} />
          {renderPaginationItems()}
          <Pagination.Next onClick={handleNextPage} />
          <Pagination.Last onClick={handleLastPage} />
        </Pagination>
      </>
    );
  };

  console.log(allMovies.movies);
  return (
    <section className="home-section">
      <div className="container">
        <div className="lang-btn">
          <div className="searchbox">
            <input
              type="text"
              placeholder="Search for a movie"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onBlur={handleSearchInputBlur}
            />
            <button onClick={searchMovies}>Search</button>
          </div>
          <button
            onClick={() => {
              setLang(lang === "en-US" ? "ar-SA" : "en-US");
            }}
          >
            {lang === "en-US" ? "English" : "Arabic"}
          </button>
        </div>

        {allMovies.movies.length === 0 && !allMovies.loading && (
          <div className="alert">
            <Alert variant="danger" className="alert-danger">
              There are no movies to show
            </Alert>
          </div>
        )}

        {allMovies.movies.length === 0 && !allMovies.loading && (
          <div className="alert">
            <Alert variant="primary" className="alert-primary">
              {`There are no movies called "${query}"`}
            </Alert>
          </div>
        )}

        {allMovies.movies.length !== 0 && !allMovies.loading && displayMovies()}
      </div>
    </section>
  );
}

export default Home;
