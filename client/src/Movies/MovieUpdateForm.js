import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { useRouteMatch, useHistory } from "react-router-dom";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

const useStyle = makeStyles(theme => ({
  root: {
    background: "#fff",
    width: "400px",
    margin: "0 auto",
    padding: '10px'
  },
  margin: {
    marginTop: theme.spacing(1)
  }
}));

const MovieUpdateForm = props => {
   const history = useHistory();
  const classes = useStyle();
  const match = useRouteMatch();
  const [movie, setMovie] = useState({
    title: "",
    director: "",
    metascore: "",
    stars: []
  });
  const [starsInput, setStarsInput] = useState("");

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  const handleChange = e => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    });
  };

  const handleDelete = index => {
    setMovie({
      ...movie,
      stars: movie.stars.filter((star, i) => {
        if (!(i === index)) {
          return star;
        }
      })
    });
  };

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        setMovie(res.data);
      })
      .catch(err => console.log(err.response));
  };

  const handleStarsChange = e => {
    setStarsInput(e.target.value);
  };

  const addStar = () => {
     setMovie({
        ...movie,
        stars: [
           ...movie.stars,
           starsInput
        ]
     })
     setStarsInput('');
  }

  const updateMovie = (e) => {
     e.preventDefault();
     const updatedMovie = {
        ...movie,
         id: match.params.id
     }
     axios.put(`http://localhost:5000/api/movies/${match.params.id}`, updatedMovie)
     .then(res => {
        props.setMovieList(props.movieList.map(movie => {
         if(Number(movie.id) === Number(res.data.id)){
            return res.data;
         }
         return movie;
      }))
         history.push(`/movies/${match.params.id}`);
     })
     .catch(err => console.log(err.message));
  }

  return (
    <Paper className={classes.root}>
      <form onSubmit={updateMovie}>
        <FormControl fullWidth className={classes.margin}>
          <InputLabel htmlFor="title">Title</InputLabel>
          <OutlinedInput
            id="title"
            name="title"
            value={movie.title}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth className={classes.margin}>
          <InputLabel htmlFor="director">Director</InputLabel>
          <OutlinedInput
            id="director"
            name="director"
            value={movie.director}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth className={classes.margin}>
          <InputLabel htmlFor="metascore">Metascore</InputLabel>
          <OutlinedInput
            id="metascore"
            name="metascore"
            value={movie.metascore}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth className={classes.margin}>
          <InputLabel htmlFor="stars">Stars</InputLabel>
          <OutlinedInput
            id="stars"
            name="stars"
            value={starsInput}
            onChange={handleStarsChange}
            endAdornment={
               <InputAdornment position="end">
                  <IconButton
                     onClick={addStar}>
                        <AddIcon />
                     </IconButton>
               </InputAdornment>
            }
          />
        </FormControl>
        <div className={classes.margin}>
          {movie.stars.map((star, index) => {
            return (
              <Chip
                key={index}
                label={star}
                onDelete={() => handleDelete(index)}
              />
            );
          })}
        </div>
        <FormControl fullWidth className={classes.margin}>
          <Button type="submit" color="primary" variant="contained">
            Submit
          </Button>
        </FormControl>
      </form>
    </Paper>
  );
};

export default MovieUpdateForm;
