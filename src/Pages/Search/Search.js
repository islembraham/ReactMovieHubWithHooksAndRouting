import {
  Button,
  createMuiTheme,
  Tab,
  Tabs,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import Rating from '@material-ui/lab/Rating';
import "./Search.css";
import SearchIcon from "@material-ui/icons/Search";
import { useState } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import MovieFilterIcon from '@material-ui/icons/MovieFilter';
import { v4 as uuidv4 } from 'uuid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const Search = ({movies, setMovies}) => {
  const [type, setType] = useState(0);
  const [search, setSearch] = useState([]);
  const [searchStars, setSearchStars] = useState(1);
  const [content, setContent] = useState(movies);
  const [open, setOpen] = useState(false);
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [title, setTitle] = useState('');
  const [release_date, setRelease_date] = useState('');
  const [poster_path, setPoster_path] = useState('');
  const [vote_average, setVote_average] = useState('');
  const [media_type, setMedia_type] = useState('');


  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const addSubmitForm = (event) => {
    let newMovie ={
        id :uuidv4(),
        title,
        poster_path,
        release_date,
        vote_average,
        media_type
    }
    setMovies([...movies, newMovie]);
    event.preventDefault();
};
  
  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  const fetchSearch = async () => {
    try {
      setContent(movies.filter((movie) =>
      movie.title.toLowerCase().includes(search.toLowerCase().trim())
    ));
  } 
    catch (error) {
      console.error(error);
    }
  };

  const fetchSearchByStars = async () => {
    try {
      setContent(movies.filter((movie) =>
      Math.round( movie.vote_average / 2) >= searchStars) 
    );
    
  } 
    catch (error) {
      console.error(error);
    }
  };

  /* useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    // eslint-disable-next-line
  }, []); */

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div className="search">
          <TextField
            style={{ flex: 1 }}
            className="searchBox"
            label="Search"
            variant="filled"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            onClick={fetchSearch}
            variant="contained"
            style={{ marginRight: 120 }}
          >
            <SearchIcon fontSize="large" />
          </Button>

          <Button variant="contained" style={{ marginRight: 150 }}>
            <Rating
              name="simple-controlled"
              // value={searchStars}
              defaultValue={1}
              onChangeActive={(event, newValue) => {
                setSearchStars(newValue);
              }}
              onClick={fetchSearchByStars}
            />
          </Button>

          <Button
            variant="contained"
            style={{ marginRight: 30 }}
            onClick={handleClickOpen}
          >
            <MovieFilterIcon fontSize="large" />
          </Button>

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle
              id="form-dialog-title"
              style={{ backgroundColor: "gray" }}
            >
              Add a new Movie to your WatchList
            </DialogTitle>
            <DialogContent style={{ backgroundColor: "gray" }}>
              <TextField
                autoFocus
                margin="dense"
                id="title"
                label="Title"
                fullWidth
                value={setMovies.title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                autoFocus
                margin="dense"
                id="poster"
                label="Poster Path"
                fullWidth
                value={setMovies.poster_path}
                onChange={(e) => setPoster_path(e.target.value)}
              />
              <TextField
                autoFocus
                margin="dense"
                id="date"
                label="Release Date"
                type="date"
                
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                value={setMovies.release_date}
                onChange={(e) => setRelease_date(e.target.value)}
              />
              <TextField
                autoFocus
                margin="dense"
                id="vote"
                label="Vote Average"
                type="number"
                fullWidth
                value={setMovies.vote_average}
                onChange={(e) => setVote_average(e.target.value)}
              />
              <TextField
                autoFocus
                margin="dense"
                id="media"
                label="Media Type"
                defaultValue="movie"
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                value={setMovies.media_type}
                onChange={(e) => setMedia_type(e.target.value)}
              />
            </DialogContent>
            <DialogActions style={{ backgroundColor: "gray" }}>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button
                onClick={(M) => addSubmitForm(M) && handleClose}
                color="primary"
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <Tabs
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={(event, newValue) => {
            setType(newValue);
          }}
          style={{ paddingBottom: 5 }}
          aria-label="disabled tabs example"
        >
          <Tab style={{ width: "50%" }} label="Search Movies" />
        </Tabs>
      </ThemeProvider>
      <div className="trendingPlus">
        {content &&
          content.map((c) => (
            <SingleContent  movies={content} 
              key={c.id} 
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={type ? "tv" : "movie"}
              vote_average={c.vote_average}
            />
          ))}
        {search &&
          searchStars &&
          !content &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
    </div>
  );
};

export default Search;
