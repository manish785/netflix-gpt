import Header from './Header';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import usePopularMovies from '../hooks/usePopularMovies';
import useUpcoming from '../hooks/useUpcoming';
import useTrendingMovies from "../hooks/useTrendingMovies";
import useHorrorMovies from "../hooks/useHorrorMovies";
import useWebSeries from "../hooks/useWebSeries"
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import GptSearch from './GptSearch';
import { useSelector } from 'react-redux';


const Browse = () => {
    const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

    useNowPlayingMovies();
    usePopularMovies();
    useUpcoming();
    useTrendingMovies();
    useHorrorMovies();
    useWebSeries();

    return (
        <div>
          <Header />
          {showGptSearch ? (
             <GptSearch />
          ):(
            <>
              <MainContainer />
              <SecondaryContainer />
            </>
          )} 
        </div>
    )
}


export default Browse;