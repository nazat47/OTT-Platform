import styled from "styled-components";
import Card from "./Card";
import React, { useRef, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const Container = styled.div`
  gap: 0.7rem;
  position: relative;
  padding: 1rem 0;
  h1 {
    margin-left: 10px;
    font-size: 25px;
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    color: white;
  }
  .wrapper {
    .slider {
      display: flex;
      width: max-content;
      gap: 0.6rem;
      transform: translateX(0px);
      transition: 1s ease-in-out;
      margin-left: 10px;
    }
    .slider-action {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      z-index: 99;
      height: 100%;
      width: 50px;
      top: 1rem;
      bottom: 0;
      transition: 0.1s ease-in-out;
      svg {
        font-size: 2rem;
        color: white;
        cursor: pointer;
      }
    }
    .left {
      left: 0;
    }
    .right {
      right: 0;
    }
    .none {
      display: none;
    }
  }
`;

export default React.memo(function MovieSlider({ data, title }) {
  const ref = useRef(null);
  const [slide, setSlide] = useState(0);
  const [visibility, setVisibility] = useState(false);
  const handleDirection = (direction) => {
    let distance = ref.current.getBoundingClientRect().x;
    if (direction === "left" && slide > 0) {
      ref.current.style.transform = `translateX(${310 + distance}px)`;
      setSlide(slide - 1);
    }
    if (direction === "right" && slide < 4) {
      ref.current.style.transform = `translateX(${-330 + distance}px)`;
      setSlide(slide + 1);
    }
  };
  return (
    <Container
      onMouseEnter={() => setVisibility(true)}
      onMouseLeave={() => setVisibility(false)}
    >
      <h1>{title}</h1>
      <div className="wrapper">
        <div className={`slider-action left ${!visibility ? "none" : ""}`}>
          <AiOutlineLeft onClick={() => handleDirection("left")} />
        </div>
        <div className="slider" ref={ref}>
          {data.map((movie, index) => {
            return <Card movieData={movie} index={index} key={movie.id} />;
          })}
        </div>
        <div className={`slider-action right ${!visibility ? "none" : ""}`}>
          <AiOutlineRight onClick={() => handleDirection("right")} />
        </div>
      </div>
    </Container>
  );
});
