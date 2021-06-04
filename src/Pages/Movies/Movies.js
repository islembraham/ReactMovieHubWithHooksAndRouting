import { useEffect, useState } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";

const Movies = ({movies,setMovies}) => {
  const [content, setContent] = useState(movies);

  // const fetchMovies =  () => {
  //   setContent(movies);
  // };

  useEffect(() => {
    window.scroll(0, 0);
    // fetchMovies();
    // eslint-disable-next-line
  });

  return (
    <div>
      <span className="pageTitle">Discover Movies</span>
      
      <div className="trendingPlus">
        {content &&
          content.map((c) => (
            <SingleContent   movies={content} 
              setMovies={setContent}
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="movie"
              vote_average={c.vote_average}
              backdrop={c.backdrop_path}
              tagline={c.tagline}
              video={c.video}

            />
          ))}
      </div>
      
    </div>
  );
};

export default Movies;
