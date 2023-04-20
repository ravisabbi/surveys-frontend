import React, { useState } from "react";
import { useFormik } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Cookies from "js-cookie";
import "./LoginPage.css";
//import axios from "axios";
import { Link, useNavigate} from "react-router-dom";
import axios from "axios";

//Formik Error Validation
const validate = (values) => {
  const errors = {};

  if (!values.userName) {
    errors.userName = "Enter UserName";
  }

  if (!values.password) {
    errors.password = "Enter Password";
  } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(values.password)) {
    errors.password =
      "Password should have at least 8 characters, one uppercase letter, one lowercase letter, and one number";
  }

  return errors;
};

const LoginPageMain = () => {
  const navigate = useNavigate();
  const [showPassword, setshowPassword] = useState(false);
  const [errMsg,setErrorMsg] = useState("");
  const togglePasswordVisibility = () => {
    setshowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },

    validate,
    onSubmit: (values) => {
       axios.post("/login",formik.values).then((response) => {
        setErrorMsg("");
        console.log(response.data)
        if(response.statusText === "OK"){
          console.log("LogIn");
          navigate("/",{replace:true});
        }
        formik.resetForm();
        const {jwtToken} = response.data;
        Cookies.set("jwt_token",jwtToken,{expires:10});
       })
       .catch((e) => {
        setErrorMsg(e.response.data.msg);
        console.log(e.response.data.msg);
       })
    },
  });
  //console.log(formik.values);
  return (
    <div className="login">
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-control">
            <label htmlFor="userName">UserName</label>
            <input
              type="text"
              id="userName"
              onChange={formik.handleChange}
              value={formik.values.userName}
              placeholder="Enter userName"
            />
            <div className="errors">
              <p className="error">{formik.errors.userName}</p>
            </div>
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <div className="password-row">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                placeholder="Enter password"
              />
              <div
                className="icon-container"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            <div className="errors">
              <p className="error">{formik.errors.password}</p>
            </div>
          </div>
          <button type="submit">Login</button>
        </form>
        <p className="error" >{errMsg}</p>
        {/* {formik.values && <p>Login successful!</p>} */}
        <Link to="/signUp">
          <div className="signIn-routing-button">
            <p>signIn</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default LoginPageMain;
