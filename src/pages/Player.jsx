import styled from "styled-components";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
const PlayContainer = styled.div`
  .play {
    width: 100vw;
    height: 100vh;
    .backarrow {
      position: absolute;
      padding: 2rem;
      z-index: 1;
      svg {
        color: white;
        font-size: 2rem;
        cursor: pointer;
      }
    }
    video {
      height: 100%;
      width: 100%;
    }
  }
`;

const Player = () => {
  const navigate = useNavigate();
  return (
    <PlayContainer>
      <div className="play">
        <div className="backarrow">
          <BsArrowLeft onClick={() => navigate("/")} />
        </div>
        <video
          src="https://res.cloudinary.com/ehizeex-shop/video/upload/v1668377666/NetflixApp/Action_mlw9wx.mp4"
          autoPlay
          loop
          controls
        />
      </div>
    </PlayContainer>
  );
};

export default Player;
