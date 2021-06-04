import { Badge } from "@material-ui/core";
import Rating from '@material-ui/lab/Rating';
import { img_300, unavailable } from "../../config/config";
import "./SingleContent.css";
import ContentModal from "../ContentModal/ContentModal";


const SingleContent = ({ 
  movies,
  setMovies,
  id,
  poster,
  title,
  date,
  media_type,
  vote_average
}) => {
  return (

    <ContentModal movies={movies} setMovies={setMovies} id={id} >
      <Rating
        name="read-only"
        defaultValue={Math.round(vote_average / 2)}
        precision={1}
        readOnly
      />

      <Badge
        badgeContent={vote_average}
        color={vote_average > 6 ? "primary" : "secondary"}
      />
      <img
        className="poster"
        src={poster ? `${img_300}${poster}` : unavailable}
        alt={title}
      />
      <b className="title">{title}</b>
      <span className="subTitle">
        {media_type === "tv" ? "TV Series" : "Movie"}
        <span className="subTitle">{date}</span>
      </span>
    </ContentModal>
  );
};

export default SingleContent;
