import React, { useEffect, useState } from "react";
import Topnav from "../components/Topnav";
import styled from "styled-components";
import { AiOutlineLogout } from "react-icons/ai";
import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../store/reducer";
import SliderContainer from "../components/SliderContainer";

const HeroContainer = styled.div`
  .wrapper {
    position: relative;
    .hero {
      filter: brightness(40%);
      img {
        width: 100%;
        height: 70vh;
      }
    }
    .container {
      position: absolute;
      bottom: 1rem;
      .title {
        h1 {
          margin-left: 5rem;
          text-transform: uppercase;
          font-size: 73px;
          background: -webkit-linear-gradient(#eee, rgb(128, 13, 13));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        p {
          margin-bottom: -50px;
          width: 640px;
          margin-left: 5rem;
          font-family: "lexend Deca", sans-serif;
          color: white;
        }
      }
      .buttons {
        display: flex;
        margin: 5rem;
        gap: 2rem;
      }
      .playbtn {
        display: flex;
        align-items: center;
        justify-content: center;
        color: red;
        border-radius: 1rem;
        font-size: 1.4rem;
        gap: 1rem;
        padding: 0.8rem;
        padding-left: 2rem;
        padding-right: 2.4rem;
        border: 1px solid black;
        cursor: pointer;
      }
      .morebtn {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        border-radius: 1rem;
        background-color: black;
        font-size: 1.4rem;
        gap: 1rem;
        padding: 1rem;
        padding-left: 2rem;
        padding-right: 2.4rem;
        border: 1px solid grey;
        cursor: pointer;
      }
    }
  }
`;

const Netflix = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoaded = useSelector((state) => state.ott.isLoaded);
  const [isScroll, setIsScroll] = useState(false);
  const movies=useSelector(state=>state.ott.movies)
  window.onscroll = () => {
    setIsScroll(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  useEffect(() => {
    if (isLoaded) {
      dispatch(fetchMovies({ type: "all" }));
    }
  });
  useEffect(() => {
    dispatch(getGenres());
  }, []);
  return (
    <HeroContainer>
      <div className="wrapper">
        <Topnav isScroll={isScroll} />
        <div className="hero">
          <img
            src="https://res.cloudinary.com/ehizeex-shop/image/upload/v1668267540/NetflixApp/avengers-age-of-ultron-team-together-poster-wallpaper-1600x600-92751_84_qvwbif.jpg"
            alt="hero image"
          />
        </div>
        <div className="container">
          <div className="title">
            <h1>Super man</h1>
            <p>
              suepr fdksnfoi aoinfoewijf fsdjfoiej jewjf09eijfpaosfjiwejr fn
              werjhfewijfoifewhfesohhrf8
            </p>
          </div>
          <div className="buttons">
            <button onClick={() => navigate("/player")} className="playbtn">
              Play
            </button>
            <button className="morebtn">More</button>
          </div>
        </div>
      </div>
      <SliderContainer movies={movies}/>
    </HeroContainer>
  );
};

export default Netflix;
