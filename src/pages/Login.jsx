import styled from "styled-components";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { firebaseAuth } from "../utils/firebase-config";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Wrapper = styled.div`
  position: relative;
  .login-content {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    backdrop-filter: blur(1px);
    background-color: rgba(0, 0, 0, 0.5);
    grid-template-columns: 15vh 85vh;
  }
  .form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    height: 85vh;
  }
  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    background-color: #000000d9;
    height: 70vh;
    padding: 2rem;
    border-radius: 0.4rem;
  }
  .container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    input {
      border-radius: 0.4rem;
      padding: 0.5rem 1rem;
      width: 25rem;
      height: 3.4rem;
      outline: none;
    }
    button {
      padding: 0.5rem;
      background-color: #d70303;
      border: none;
      cursor: pointer;
      border-radius: 0.4rem;
      color: white;
      font-size: 1.05rem;
      font-weight: bolder;
    }
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.log(error.message);
    }
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) navigate("/");
    });
  };
  return (
    <Wrapper>
      <BackgroundImage />
      <div className="login-content">
        <Header />
        <div className="form-container">
          <div className="form">
            <div className="title">
              <h1>Login</h1>
            </div>
            <div className="container">
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={handleLogin}>Login</button>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Login;
