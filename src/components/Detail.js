import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { API_OPTIONS } from '../utils/constants';
import { useSelector } from 'react-redux';
import useMovieTrailer from '../hooks/useMovieTrailer';
import Cast from './Cast';
import Loading from './Loading';


const Detail = () => {
    const [view, setView] = useState(false);
    const [details, setDetails] = useState(null);
    const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
    const { id } = useParams();

    useMovieTrailer(id);

    const detail = async() => {
        try{
            const data = await fetch(
                `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
                API_OPTIONS
              );
              if (!data.ok) {
                throw new Error("Network response was not ok");
              }
              const json = await data.json();
              setDetails(json);
        }catch(err){
            console.log('err', err);
            return;
        }
    }
    
    useEffect(() => {
        detail();
    }, [id]);

    
    const handleView = () => {
        setView(!view);

        if(!view){
            const iframeElement = document.getElementById("trailerIframe");

            if(iframeElement){
                iframeElement.focus();
                iframeElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                })
            }
        }
    }

    if(!details){
        return <Loading/>
    }

    const { original_title, poster_path, overview,  runtime, budget, vote_average,  popularity, genres } = details;

    return (
        <div
          className="min-h-screen opacity-90
         flex flex-col text-white select-none"
         style={{
            backgroundImage: `url('https://wallpapers.com/images/hd/plain-background-0aqx3e65vih1xev1.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          
        >
          <div className="flex items-start pt-4 h-10 overflow-hidden p-3 lg:pl-10">
            <img
              src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAP3CVa9_Oh_tbL4eyiIc9dX9i4WhQ7VStUACACo0W3g&s'
              alt="goback"
              className="text-white w-3 h-3 md:w-6 md:h-6 hover:cursor-pointer"
              onClick={() => window.history.back()}
            />
          </div>
          <div
            className="flex font-bold text-lg mg:text-2xl lg:text-4xl justify-center text-center text-white"
            id="trailerIframe"
          >
            {original_title}
          </div>
          <div className="p-4">
            <div className="text-white pt-5 justify-between flex flex-col lg:flex-row">
              <div className="p-2 md:w-[100rem] md:h-[30rem] flex items-center justify-center mt-1 md:mt-16 overflow-hidden">
                {!view && poster_path && (
                  <img
                    alt="Movie Card"
                    src={"https://image.tmdb.org/t/p/w500/" + poster_path}
                    className="rounded-2xl w-fit h-44 lg:h-[30rem]"
                  />
                )}
                {view && (
                  <div className="w-full flex items-center justify-center">
                    <iframe
                      className="w-[30rem] lg:h-[30rem] lg:top-40 lg:left-10"
                      src={
                        "https://www.youtube.com/embed/" +
                        trailerVideo?.key +
                        "?&autoplay=1&mute=1"
                      }
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    ></iframe>
                  </div>
                )}
              </div>
    
              <div className="gap-y-5 py-4 flex flex-col items-center text-sm md:text-2xl h-fit p-3">
                <div className="text-left my-1 md:my-2">{overview}</div>
    
                <div className="flex flex-col items-start w-full">
                  <div className="my-3 mt-2 md:mt-5">
                    runtime: {(runtime / 60).toFixed(2)}hr
                  </div>
                  <div className="my-2">budget: {budget / 1000000}Cr.</div>
                  <div className="my-2">
                    language: {details?.spoken_languages[0]?.name}
                  </div>
                  <div className="my-2">vote: {vote_average}/10</div>
                  <div className="my-2">popular: {popularity}</div>
                </div>
                <div className="md:mt-2 w-full">
                  <div className="mb-5">genres:</div>
                  <div className="flex flex-wrap text-sm md:text-lg">
                    {genres.map((item) => (
                      <span
                        key={item.id}
                        className=" border-2 border-white bg-gradient-to-b from-[#a20000] to-[#3e0000] text-white rounded-xl p-1 md:p-2 ml-1 my-2 md:ml-3"
                      >
                        {item.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-start items-center w-full">
                  <button
                    onClick={handleView}
                    className="border-2 border-white bg-gradient-to-b from-[#a20000] to-[#3e0000] text-white rounded-2xl px-2 md:px-4 py-2 mt-3"
                  >
                    {view ? "Hide" : "Show"} Trailer
                  </button>
                </div>
              </div>
            </div>
    
            <div className="flex flex-col text-white mt-4 md:mt-10">
              <div className="flex items-start justify-start text-lg  md:text-3xl font-semibold p-2">
                Casts:
              </div>
              <div className="mt-5">
                <Cast id={id} />
              </div>
            </div>
          </div>
        </div>
      );
};


export default Detail;