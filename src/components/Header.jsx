import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  .logo {
    margin-top: 1rem;
    img {
      height: 3rem;
      cursor: pointer;
    }
  }
  button {
    padding: 0.5rem 1rem;
    background-color: red;
    color: white;
    cursor: pointer;
    border: none;
    border-radius: 0.3rem;
    font-weight: bolder;
    font-size: 1.05rem;
  }
`;

const Header = (props) => {
  const navigate = useNavigate();
  return (
    <HeaderContainer>
      <div className="logo">
        <img
          src="https://res.cloudinary.com/ehizeex-shop/image/upload/v1668265433/NetflixApp/2560px-Netflix_2015_logo.svg_rbicwl_knwp6f.png"
          alt="no internet connection"
        />
      </div>
      <button onClick={() => navigate(props.login ? "/login" : "/signup")}>
        {props.login ? "Log in" : "Sign up"}
      </button>
    </HeaderContainer>
  );
};

export default Header;
