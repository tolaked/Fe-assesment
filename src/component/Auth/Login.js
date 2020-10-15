import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import "./auth.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import * as Yup from "yup";
// import {
//   login,
//   setLoading,
//   setLoginError,
//   setUser,
// } from "../../state/actions/users";
//import css module

const Login = (props) => {
  const [visibility, setVisibility] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async (values) => {
      console.log(values);

      await axios
        .post(
          "https://cors-anywhere.herokuapp.com/https://fcs.concept-nova.com/api/v1/login",
          values,
          {
            headers: {
              accept: "application/json",
              "Content-type": "application/json",
            },
          }
        )
        .then(({ data }) => {
          console.log(data);
          localStorage.setItem("token", data.message.token);
          props.history.push("/sites");
        });
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("email is required"),
      password: Yup.string().required("password is required"),
      //   }),
    }),
  });

  return (
    <div className="container">
      <div className="form-section">
        <div className="form-surround">
          <form>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "-10px",
              }}
            >
              <p style={{ fontSize: "14px" }}>Sign in to your account</p>
              {/* {loginError.length > 0 && (
                <p style={{ color: "red" }}>{loginError}</p>
              )} */}
            </div>

            <div className="email-input fields">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                className="input"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </div>

            <div
              className="password-input fields"
              style={{ position: "relative" }}
            >
              <label>Enter password</label>

              <input
                type={!visibility ? "password" : "text"}
                name="password"
                id="password"
                className="input"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {!visibility ? (
                <FontAwesomeIcon
                  icon={faEyeSlash}
                  className="custom-icon"
                  onClick={() => setVisibility(!visibility)}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faEye}
                  className="custom-icon"
                  onClick={() => setVisibility(!visibility)}
                />
              )}
            </div>
            <button
              type="button"
              onClick={formik.handleSubmit}
              className="register-button"
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
