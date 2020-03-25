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
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";

const useStyle = makeStyles(theme => ({
  root: {
    background: "#fff",
    width: "400px",
    margin: "0 auto",
    padding: "10px"
  },
  margin: {
    marginTop: theme.spacing(1)
  }
}));

const MovieAddForm = props => {
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

  const handleStarsChange = e => {
    setStarsInput(e.target.value);
  };

  const addStar = () => {
    setMovie({
      ...movie,
      stars: [...movie.stars, starsInput]
    });
    setStarsInput("");
  };

  const addMovie = e => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/api/movies`, movie)
      .then(res => {
        props.setMovies(res.data);
        history.push(`/`);
      })
      .catch(err => console.log(err.message));
  };
  return (
    <Paper className={classes.root}>
      <form onSubmit={addMovie}>
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
                <IconButton onClick={addStar}>
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

export default MovieAddForm;
