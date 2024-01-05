import { AiOutlineLogout } from "react-icons/ai";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";

const NavContainer = styled.div`
  .scrolled {
    background-color: black;
    display: flex;
  }
  .notScrolled {
    display: flex;
  }
  nav {
    position: sticky;
    top: 0;
    height: 6rem;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    z-index: 2;
    padding: 0.4rem;
    transition: all 0.3s ease-in-out;
    .leftside {
      display: flex;
      align-items: center;
      gap: 2rem;
      margin-left: 3rem;
    }
    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    img {
      width: 10rem;
      height: 2rem;
    }
  }
  .links {
    display: flex;
    list-style: none;
    gap: 3rem;
    li {
      a {
        color: #ffffff;
        text-decoration: none;
        &:hover {
          color: #a7a6a6;
        }
      }
    }
  }
  .rightside {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-right:1rem;
    button {
      background-color: red;
      border: none;
      cursor: pointer;
      border-radius: 50%;
    }
    &:focus {
      outline: none;
    }
    svg {
      font-size: 2rem;
      color: white;
      border-radius: 50%;
      &:hover {
        background-color: #9d0303;
      }
    }
  }
`;

const Topnav = ({ isScroll }) => {
  const navigate = useNavigate();
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) navigate("/login");
  });
  const navlinks = [
    { name: "Home", link: "/" },
    { name: "Tv Show", link: "/tvshow" },
    { name: "Movie", link: "/movie" },
    { name: "My Lists", link: "/player" },
  ];
  return (
    <NavContainer>
      <nav className={isScroll ? "scrolled" : "notScrolled"}>
        <div className="leftside">
          <div className="logo">
            <img
              src="https://res.cloudinary.com/ehizeex-shop/image/upload/v1668265433/NetflixApp/2560px-Netflix_2015_logo.svg_rbicwl_knwp6f.png"
              alt="logo"
            />
          </div>
          <ul className="links">
            {navlinks.map(({ name, link }) => {
              return (
                <li key={name}>
                  <Link to={link}>{name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="rightside">
          <button onClick={() => signOut(firebaseAuth)}>
            <AiOutlineLogout />
          </button>
        </div>
      </nav>
    </NavContainer>
  );
};

export default Topnav;
