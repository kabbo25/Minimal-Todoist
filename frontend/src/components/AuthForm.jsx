import React, { useState, useEffect } from "react";
import { userSchema } from "../validators/formValidate";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import SyncLoader from "react-spinners/SyncLoader";

export const AuthForm = ({
                           formType,
                           buttonText,
                           successMessage,
                           image,
                           text,
                           headingText,
                         }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");
  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setUsernameError("");
    setPasswordError("");
  }, [username, password]);

  const formHandler = (e) => {
    e.preventDefault();

    const validInput = userSchema.safeParse({ username, password });
    if (validInput.error) {
      for (let i = 0; i < validInput.error.errors.length; i++) {
        if (validInput.error.errors[i].path === "username") {
          setUsernameError(validInput.error.errors[i].message);
        }
        if (validInput.error.errors[i].path === "password") {
          setPasswordError(validInput.error.errors[i].message);
        }
      }
    } else {
      if (formType === "signup") {
        // Simulating signup locally
        const existingUser = localStorage.getItem("username");
        if (existingUser) {
          setFormError("User already exists");
								navigate("/login");

        } else {
          localStorage.setItem("username", username);
          localStorage.setItem("password", password);
          navigate("/login");
        }
      } else if (formType === "login") {
        // Simulating login locally
        const storedUsername = localStorage.getItem("username");
        const storedPassword = localStorage.getItem("password");
        if (username === storedUsername && password === storedPassword) {
          navigate("/todo");
        } else {
          setFormError("Invalid username or password");
        }
      }
    }
  };

  return (
      <div>
        {spinner ? (
            <div className="vh-100 w-100 d-flex justify-content-center align-items-center loader-bg">
              <SyncLoader color="#69665c" margin={4} speedMultiplier={0.5} />
            </div>
        ) : (
            <div className="row overflow-hidden">
              <div className="col-md-6 vh-100 hero">
                <div className="container">
                  <div className="d-flex align-items-center align-items-md-start flex-column flex-md-row justify-content-center justify-content-md-end pt-7 p-md-4">
                    <Link style={{ textDecoration: "none" }} to={"/"}>
                      <h1 className="fs-3 fw-bold text-primary brand-text">todo</h1>
                    </Link>
                    <div className="image-container pt-5 d-md-none">
                      <img
                          style={{ height: "10rem", width: "7.5rem" }}
                          src={image}
                          alt=""
                      />
                    </div>
                  </div>
                  <p className="fs-1 text-center  mb-5 mb-md-6 mt-md-7 mt-0 account-custom">
                    {headingText}
                  </p>
                  <div className="container d-flex flex-column align-items-center">
                    <form className="w-75" onSubmit={formHandler}>
                      <div className="input-group w-100">
                        <input
                            type="text"
                            placeholder="Username"
                            className="form-control rounded-2 info"
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <div className="d-flex justify-content-end w-100">
                          {usernameError && (
                              <p className="text-danger error mt-2 mb-n1">
                                {usernameError}
                              </p>
                          )}
                        </div>
                      </div>
                      <div className="pt-4 input-group w-100">
                        <input
                            type="password"
                            placeholder="Password"
                            className="form-control rounded-2 info"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                      </div>
                      <div className="d-flex justify-content-end w-100">
                        {passwordError && (
                            <p className="text-danger error mt-2 mb-n3">
                              {passwordError}
                            </p>
                        )}
                        {formError && (
                            <p className="text-danger error mt-2 mb-n1">
                              {formError}
                            </p>
                        )}
                      </div>
                      <div className="d-grid w-100 mt-4 mt-md-5">
                        <button className="btn btn-primary rounded-3">
                          {buttonText}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
        )}
      </div>
  );
};
