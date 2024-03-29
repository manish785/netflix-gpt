import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrending } from "../utils/moviesSlice";

const useTrendingMovies = () => {
  // Fetch data from TMDB API and update store
  const dispatch = useDispatch();

  const TrendingMovies = useSelector((store) => store.movies.trending);

  const getTrandingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/trending/movie/week?language=en-US",
      API_OPTIONS
    );
    const json = await data.json();
    console.log(json.results);
    dispatch(addTrending(json.results));
  };

  useEffect(() => {
    !TrendingMovies && getTrandingMovies();
  }, []);
};

export default useTrendingMovies;