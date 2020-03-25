import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

function MovieList({ movies, setMovies }) {
  useEffect(() => {

  }, [movies])

  return (
    <div className="movie-list">
      {
        movies.map(movie => (
          <Link key={movie.id} to={`/movies/${movie.id}`}>
            <MovieCard movie={movie} movies={movies} setMovies={setMovies} />
          </Link>
        ))
      }
    </div>
  );
}

export default MovieList;
