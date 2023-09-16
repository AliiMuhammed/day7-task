import React, { useEffect, useState } from "react";
import MovieCard from "./Components/MovieCard";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import "./Style/home.css";

function Home() {
  const api = "f4859cf2c23285090d31cc35e37c8ef9";
  const img_path = "https://image.tmdb.org/t/p/w500";

  const [allMovies, setAllMovise] = useState([]);
  const [lang, setLang] = useState("en-US");

  useEffect(() => {
    axios
      .get("https://api.themoviedb.org/3/movie/popular", {
        params: {
          api_key: api,
          language: lang,
        },
      })
      .then((response) => {
        console.log(response.data.results);
        setAllMovise(response.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [lang]);

  return (
    <section className="home-section">
      <div className="container">
        {allMovies.length === 0 && (
          <div className="alert">
            <Alert variant="danger" className="alert-denger">
              There is no movies to show
            </Alert>
          </div>
        )}

        {allMovies.length !== 0 && (
          <>
            <div className="lang-btn">
              <button
                onClick={() => {
                  setLang(lang === "en-US" ? "ar-SA" : "en-US");
                }}
              >
                {lang === "en-US" ? "English" : "Arabic"}
              </button>
            </div>
            <div className="movies-card">
              {allMovies.map((movie) => {
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
          </>
        )}
      </div>
    </section>
  );
}

export default Home;
