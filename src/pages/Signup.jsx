import styled from "styled-components";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { useState } from "react";
import { firebaseAuth } from "../utils/firebase-config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    backdrop-filter: blur(1px);
    background-color: rgba(0, 0, 0, 0.79);
    width: 100vw;
    height: 100vh;
    grid-template-columns: 15vh 85vh;
    .body {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .text {
      display: flex;
      flex-direction: column;
      text-align: center;
      font-size: 2rem;
      color: white;
    }
    h1 {
      padding: 0.25rem;
    }
    h4 {
      margin-top: 1rem;
    }
    h6 {
      margin: 1rem;
    }
    .form {
      display: grid;
      width: 60%;
      grid-template-columns: ${({ showPass }) =>
        showPass ? "1fr 1fr" : "2fr 1fr"};
      input {
        color: black;
        padding: 0.4rem;
        font-size: 2rem;
        border: none;
        width: 45rem;
        &:focus {
          outline: none;
        }
      }
      button {
        padding: 0.5rem 1rem;
        color: white;
        border: none;
        cursor: pointer;
        font-size: 1.05rem;
        background-color: #d50303;
        width: 10rem;
      }
    }
  }
`;

const Signup = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleSignup = async () => {
    try {
      const { email, password } = formData;
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.log(error.message);
    }
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) navigate("/login");
    });
  };
  return (
    <Container>
      <BackgroundImage />
      <div className="content">
        <Header login />
        <div className="body">
          <div className="text">
            <h1>Unlimited movies, tv show and much more</h1>
            <h4>watch anywhere, cancel anytime</h4>
            <h6>
              Ready to watch? Enter your email to create or restart membership
            </h6>
          </div>
          <div className="form">
            {showPass ? (
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            ) : (
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            )}
            {!showPass ? (
              <button onClick={() => setShowPass(true)}>Get Started</button>
            ) : (
              <button onClick={handleSignup}>Sign up</button>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Signup;
