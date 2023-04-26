import React, { useState } from "react";
import { useFormik } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";
//import "./LoginPage.css";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const LoginPage = () => {
  const [showPassword, setshowPassword] = useState(false);
  const [errMsg, setErrorMsg] = useState("");
  const togglePasswordVisibility = () => {
    setshowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const accessToken = Cookies.get("jwtToken");
  if (accessToken !== undefined) navigate("/", { replace: true });
  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },

    validationSchema: Yup.object({
      userName: Yup.string()
        //.min(3, "Username should be at least 3 characters long.")
        .required("Required*"),
      password: Yup.string()
        //.min(8, "password should be at least 8 characters long.")
        .required("Required*"),
    }),
    onSubmit: (values) => {
      axios
        .post("/login", formik.values)
        .then((response) => {
          setErrorMsg("");
          // console.log(response);
          // console.log(response.data);
          if (response.statusText === "OK") {
            console.log(response.data);
            const { jwt_token, user_details } = response.data;
            console.log(user_details.role);
            Cookies.set("jwtToken", jwt_token, { expires: 10 });

            Cookies.set("role", user_details.role, {
              expires: 10,
            });

            navigate("/", { replace: true });
          }
          formik.resetForm();
        })
        .catch((e) => {
          setErrorMsg(e.response.data.msg);
          console.log(e.response.data.msg);
        });
    },
  });
  //console.log(formik.values);
  return (
    <div className="login">
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-control">
            <label htmlFor="userName">Username</label>
            <input
              type="text"
              id="userName"
              {...formik.getFieldProps("userName")}
              placeholder="Enter username"
            />
            {formik.touched.userName && formik.errors.userName ? (
              <div className="error">{formik.errors.userName}</div>
            ) : null}
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <div className="password-row">
              <input
                className="password-input"
                type={showPassword ? "text" : "password"}
                id="password"
                {...formik.getFieldProps("password")}
                placeholder="Enter password"
              />
              <div
                className="icon-container"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            {formik.touched.password && formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
          </div>
          <button type="submit">Login</button>
        </form>
        <p className="login-errMsg">{errMsg}</p>
        {/* {formik.values && <p>Login successful!</p>} */}
        <Link to="/signUp">
          <div className="signIn-routing-button">
            <p className="signup-link">signUp</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
