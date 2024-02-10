
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_OPTIONS } from '../utils/constants';
import { addHorror } from '../utils/moviesSlice';


const useHorrorMovies = () => {
    const dispatch = useDispatch();

    const HorrorMovies = useSelector((store) => store.movies.horror);

    const getHorrorMovies = async() => {
        const data = await fetch( "https://api.themoviedb.org/3/search/movie?query=horror&include_adult=false&language=en-US&page=1",
        API_OPTIONS)

        const json = await data.json();
        dispatch(addHorror(json.results));
    }

    useEffect(() => {
        !HorrorMovies && getHorrorMovies();
    }, []);
}


export default useHorrorMovies;