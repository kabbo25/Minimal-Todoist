import React, { useEffect, useState } from "react";
import girl from "../assets/images/girl2.png";
import hometodo from "../assets/images/hometodo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SyncLoader from "react-spinners/SyncLoader";

export const Home = () => {
  const jwt = localStorage.getItem("jwtToken");
  const todoUrl = "https://todo-app-brown-ten.vercel.app/mytodos";
  const navigate = useNavigate();
  const [spinner, setSpinner] = useState(false);
  const [displayAnimation, setDisplayAnimation] = useState(true);

  const verifyJwt = async () => {
    setSpinner(true);
    if (jwt) {
      try {
        const response = await axios.get(todoUrl, {
          headers: {
            Authorization: jwt,
          },
        });
        if (response.status === 200) {
          navigate("/todo"); // Redirect to /todo only after successful response
        }
      } catch (error) {
        navigate("/signup");
      }
    } else {
      navigate("/signup");
    }
  };

  useEffect(() => {
    const animation1 = document.querySelector(".animation1");
    const animation2 = document.querySelector(".animation2");

    if (animation1 && animation2) {
      const timeoutId = setTimeout(() => {
        animation2.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
          setDisplayAnimation(false);
        }, 2100);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, []);

  return (
      <div>
        {spinner ? (
            <div className="vh-100 w-100 d-flex justify-content-center align-items-center loader-bg">
              <SyncLoader color="#69665c" margin={4} speedMultiplier={0.5} />
            </div>
        ) : (
            <>
              <div
                  className={` bg-secondary vh-100 animation1 ${
                      displayAnimation ? `` : "d-none"
                  } `}
              >
                <div className="d-flex justify-content-center align-items-center h-100">
                  <p className="strike display-2 fw-bold text-primary">todo</p>
                </div>
              </div>
              <div className="d-flex flex-column align-items-center justify-content-center vh-100 animation2">
                <div className="pt-5">
              <span className="fw-bold display-2">
                <span className="purple">t</span>
                <span className="red">o</span>
                <span className="green">d</span>
                <span className="blue">o</span>
              </span>
                </div>
                <div className="hero-text-container">
                  <p className="fs-5 text-center pt-5 hero-text">
                    Get stuff done with our minimal pastel aesthetic todo app.{" "}
                    <br />
                    Simplify your day, one task at a time!
                  </p>
                </div>
                <div className="pt-5">
                  <button
                      onClick={verifyJwt}
                      className="btn btn-primary px-5 fw-bold"
                  >
                    Get Started
                  </button>
                </div>
                <div className="png-img-container mt-6 mt-md-5">
                  <img src={girl} alt="" className="avatar mb-n2 mb-md-n4" />
                </div>
                <div className="todo-img-container">
                  <img
                      style={{ height: "11rem", width: "30rem" }}
                      src={hometodo}
                      alt=""
                      className="todo-img"
                  />
                </div>
                <div className="d-none d-md-block pt-5">
              <span className="text-muted opacity-75">
                Made with ❤️ by{" "}
                <a target="_blank" href="https://linktr.ee/ansh3839">
                  ansh
                </a>
              </span>
                </div>
              </div>
            </>
        )}
      </div>
  );
};
