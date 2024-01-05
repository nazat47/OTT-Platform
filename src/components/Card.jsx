import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { IoPlayCircleSharp } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BiChevronDown } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";
import { useRef, useState } from "react";
import React from "react";

const CardContainer = styled.div`
  margin-top: 1rem;
  max-width: 230px;
  width: 230px;
  cursor: pointer;
  height: 100%;
  position: relative;
  img {
    border-radius: 0.2rem;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  .hover {
    z-index: 99;
    height: max-content;
    width: 20rem;
    position: absolute;
    top: -18vh;
    left: 0;
    border-radius: 0.2rem;
    border: 0.1rem solid gray;
    background-color: #181818;
    transition: 0.3s ease-out;
    .media-wrapper {
      position: relative;
      height: 140px;
      img {
        width: 100%;
        height: 150px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 4;
        position: absolute;
      }
      video {
        width: 100%;
        height: 150px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 4;
        position: absolute;
      }
    }
    .info-container {
      display: flex;
      flex-direction: column;
      padding: 1rem;
      gap: 0.5rem;
      .movie-name {
        color: white;
      }
      .icons {
        display: flex;
        justify-content: space-between;
        .controls {
          display: flex;
          gap: 0.6rem;
        }
        svg {
          color: #b8b8b8;
          border: 0.1rem solid white;
          border-radius: 50%;
          font-size: 1.5rem;
          cursor: pointer;
          transition: 0.3s ease-in-out;
          &:hover {
            color: white;
          }
        }
      }
      .genre {
        display: flex;
        color: white;
        ul {
          display: flex;
          gap: 1rem;
          li {
            padding-right: 0.7rem;
            &:first-of-type {
              list-style-type: none;
            }
          }
        }
      }
    }
  }
`;

export default React.memo(function Card({ movieData }) {

  const [onHovered, setOnHovered] = useState(false);
  const navigate = useNavigate();
  return (
    <CardContainer
      onMouseEnter={(e) => setOnHovered(true)}
      onMouseLeave={(e) => setOnHovered(false)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
        alt="poster"
        onClick={() => navigate("/player")}
      />
      {onHovered && (
        <div className="hover">
          <div className="media-wrapper">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
              alt="poster"
              onClick={() => navigate("/player")}
            />
            <video
              src="https://res.cloudinary.com/ehizeex-shop/video/upload/v1668377666/NetflixApp/Action_mlw9wx.mp4"
              autoPlay
              loop
              controls
            />
          </div>
          <div className="info-container">
            <h3 className="movie-name" onClick={() => navigate("/player")}>
              {movieData.name}
            </h3>
            <div className="icons">
              <div className="controls">
                <IoPlayCircleSharp
                  title="play"
                  onClick={() => navigate("/player")}
                ></IoPlayCircleSharp>
                <RiThumbUpFill title="like" />
                <RiThumbDownFill title="dislike" />
                <BsCheck title="Remove from list" />
                <AiOutlinePlus title="Add to my list" />
              </div>
              <div className="info">
                <BiChevronDown title="More Info" />
              </div>
            </div>
            <div className="genre">
              <ul>
                {movieData.genres.map((genre) => {
                  <li>{genre}</li>;
                })}
              </ul>
            </div>
          </div>
        </div>
      )}
    </CardContainer>
  );
});
