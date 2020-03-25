import React from 'react';
import axios from 'axios';

const MovieCard = props => {
  const { title, director, metascore, stars, id } = props.movie;

  const deleteMovie = (e) => {
    e.preventDefault();
    axios.delete(`http://localhost:5000/api/movies/${id}`)
    .then(res => {
      console.log(res.data);
      props.setMovies(props.movies.filter(movie => movie.id !== Number(id)));
    })
  }

  return (
    <div className="movie-card">
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>

      {stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}
      <button onClick={deleteMovie} style={{position: 'absolute', right: '20px', top: '20px'}}>Delete</button>
    </div>
  );
};

export default MovieCard;
