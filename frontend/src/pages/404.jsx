import React from "react";
import notfound from "../assets/images/MessyDoodle.png";
import { useNavigate } from "react-router-dom";
export const NoRoute = () => {
  const navigate = useNavigate();
  return (
    <div className="row">
      <div className="col-12 d-flex flex-column align-items-center justify-content-center vh-100">
        <img src={notfound} className="error-image" alt="" />
        <p className="pt-5 fs-5 fst-italic fw-bold text-center">
          Uh-oh Looks like you ended up on wrong page
        </p>
        <button
          onClick={() => navigate("/")}
          className="btn btn-primary fw-bold px-5 mt-4"
        >
          {" "}
          Go home
        </button>
      </div>
    </div>
  );
};
