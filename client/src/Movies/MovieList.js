import React, {useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    bottom: '20px',
    right: '20px'
  }
}))

function MovieList({ movies, setMovies }) {
  const {push} = useHistory();
  const classes = useStyle();
  useEffect(() => {
    console.log(movies);
  }, [movies])

  const goToAddMovieForm = (e) => {
    e.preventDefault();
    push('/add-movie');
  }
  
  return (
    <div className="movie-list">
      {
        movies.map(movie => (
          <Link key={movie.id} to={`/movies/${movie.id}`}>
            <MovieCard movie={movie} movies={movies} setMovies={setMovies} />
          </Link>
        ))
      }
      <Fab onClick={goToAddMovieForm} className={classes.fab} color='primary'>
        <AddIcon />
      </Fab>

    </div>
  );
}

export default MovieList;
