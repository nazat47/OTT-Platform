import styled from "styled-components";
import MovieSlider from "./MovieSlider";

const SliderWrapper = styled.div``;

const SliderContainer = ({ movies }) => {
  const getMoviesBetween = (start, end) => {
    return movies.slice(start, end);
  };
  return (
    <SliderWrapper>
      <MovieSlider data={getMoviesBetween(0, 10)} title="Only on Netflix" />
      <MovieSlider data={getMoviesBetween(10, 20)} title="Trending Now" />
      <MovieSlider data={getMoviesBetween(20, 30)} title="Comedy Movies" />
      <MovieSlider data={getMoviesBetween(30, 40)} title="Action Movies" />
      <MovieSlider data={getMoviesBetween(40, 50)} title="New Releases" />
      <MovieSlider data={getMoviesBetween(50, 60)} title="Popular Movies" />
      <MovieSlider data={getMoviesBetween(60, 70)} title="Anime" />
      <MovieSlider data={getMoviesBetween(70, 80)} title="Continue Watching" />
    </SliderWrapper>
  );
};

export default SliderContainer;
