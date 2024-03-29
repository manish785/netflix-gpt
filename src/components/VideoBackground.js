import { useSelector } from 'react-redux';
import useMovieTrailer from '../hooks/useMovieTrailer';

const VideoBackground = ({ movieId }) => {
    const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
    console.log('hi elon mask', movieId);
     
    useMovieTrailer(movieId);

    return (
        <div className="min-w-fit bg-black ml-0">
            <iframe
            className="w-screen aspect-video"
            src={
                "https://www.youtube.com/embed/" +
                trailerVideo?.key +
                "?&autoplay=1&mute=1"
            }
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
      </div> 
    )
}


export default VideoBackground;