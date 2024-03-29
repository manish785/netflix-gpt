import React, { useState, useRef, useEffect } from "react";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { API_OPTIONS } from '../utils/constants';
import CastCard from "./CastCard";


const Cast = ({ id }) => {
    const sliderRef = useRef(null);
    const [cast, setCast] = useState(null);

    const Cast = async() => {
        const data = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits`, API_OPTIONS);
        const json = await data.json();
        setCast(json.cast);
    }

    useEffect(() => {
        Cast();
    }, []);

    const sliderSettings = {
       infinite: false,
       slidesToShow: Math.min(9, cast?.length || 1),
       slidesToScroll: 1,
       responsive: [
        {
            breakpoint: 1024,
            settings: {
              slidesToShow: Math.min(4, cast?.length || 1),
              slidesToScroll: 1,
            },
        },
        {
            breakpoint: 600,
            settings: {
              slidesToShow: Math.min(4, cast?.length || 1),
              slidesToScroll: 1,
            },
        },
        {
            breakpoint: 480,
            settings: {
              slidesToShow: Math.min(2, cast?.length || 1),
              slidesToScroll: 1,
            },
        },
       ]
    }

    const handleNext = () => {
        if(sliderRef.current){
            sliderRef.current.slickNext();
        }
    }

    const handlePrev = () => {
        if(sliderRef.current){
            sliderRef.current.slickPrev();
        }
    }

    const filteredCast = cast?.filter((item) => item.profile_path !== null);


    return (
      <div className="px-5 md:px-10 p-4 w-full">
        <Slider ref={sliderRef} {...sliderSettings} className="overflow-hidden">
          {filteredCast?.map((item) => (
            <CastCard
              key={item.id}
              profilePath={item.profile_path}
              id={item.id}
              name={item.name}
            />
          ))}
        </Slider>
        <div className="mt-2 hidden md:flex justify-between">
          <button
            onClick={handlePrev}
            className="bg-white text-white mr-2 -translate-y-36 -translate-x-10 rounded-full h-10 w-10"
          >
            <img src='https://cdn-icons-png.flaticon.com/512/109/109618.png' alt="Left Arrow" />
          </button>
          <button
            onClick={handleNext}
            className="bg-white text-white -translate-y-36 translate-x-1 rounded-full h-10 w-10"
          >
            <img src='https://cdn-icons-png.flaticon.com/512/109/109617.png'  alt="Right Arrow" className="h-10 w-10" />
          </button>
        </div>
      </div>
    );
  };
  


export default Cast;