import React, { useState } from "react";
import { useFormik } from "formik";
//import { useNavigate } from "react-router-dom";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import "./signUpPage.css";
import { Link } from "react-router-dom";

//Formik Error Validation
// export const url = {
//   API: "http://192.168.0.2:5000/",
//   domain: "http://localhost:3002/",
// };

// export const url = {
//   API: "*",
//   domain: "*",
// };

const validate = (values) => {
  const errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!values.firstName) {
    errors.firstName = "Enter FirstName";
  }
  if (!values.lastName) {
    errors.lastName = "Enter LastName";
  }
  if (!values.userName) {
    errors.userName = "Enter UserName";
  } else if (!/^[a-zA-Z0-9_]*$/.test(values.userName)) {
    errors.userName = "Dont Use Special Characters";
  }

  if (!values.email) {
    errors.email = "Enter Email";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "Please Enter a Valid Email";
  }

  if (!values.password) {
    errors.password = "Enter Password";
  } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(values.password)) {
    errors.password =
      "Password should have at least 8 characters, one uppercase letter, one lowercase letter, and one number";
  }

  return errors;
};

const SignUpPage = () => {
  //const naviagte = useNavigate();
  const [submitMsg, setSubmitMsg] = useState("");

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      userName: "",
      action: true,
    },

    validate,
    onSubmit: (values) => {
      values.role = "user"
      //console.log(values);
      console.log(values);
      axios
        .post("/user", values)
        .then((response) => {
          console.log(response);
          if (response.statusText === "OK") {
            // Redirect to dashboard on successful login
            setSubmitMsg(response.data.msg);
            //naviagte("/dashboard", { replace: true });

            console.log("User Created");

            formik.resetForm();
          }
        })
        .catch((error) => {
          console.log(error);
          setSubmitMsg(error.response.data.msg);
          // Set error message to display to the user
        });
    },
  });
  //console.log(formik.values);
  return (
    <div className="SignUp">
      <div className="login-container">
        <h1>SignUp</h1>

        <form onSubmit={formik.handleSubmit}>
          {/* firstName */}
          <div className="form-control">
            <label htmlFor="firstName">FirstName</label>
            <input
              type="text"
              id="firstName"
              onChange={formik.handleChange}
              value={formik.values.firstName}
              placeholder="Enter FirstName"
            />
            <div className="errors">
              <p className="error">{formik.errors.firstName}</p>
            </div>
          </div>
          {/* lastName */}
          <div className="form-control">
            <label htmlFor="lastName">LastName</label>
            <input
              type="text"
              id="lastName"
              onChange={formik.handleChange}
              value={formik.values.lastName}
              placeholder="Enter LastName"
            />
            <div className="errors">
              <p className="error">{formik.errors.lastName}</p>
            </div>
          </div>
          {/* username */}
          <div className="form-control">
            <label htmlFor="userName">UserName</label>
            <input
              type="text"
              id="userName"
              onChange={formik.handleChange}
              value={formik.values.userName}
              placeholder="Enter UserName"
            />
            <div className="errors">
              <p className="error">{formik.errors.userName}</p>
            </div>
          </div>
          {/* Email Div */}
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              placeholder="Enter email"
            />
            <div className="errors">
              <p className="error">{formik.errors.email}</p>
            </div>
          </div>
          {/* PasswordDiv */}
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <div className="password-row">
              <input
                type="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                placeholder="Enter password"
              />
              <div
                className="icon-container"
                // onClick={togglePasswordVisibility}
              >
                {/* {showPassword ? <FaEyeSlash /> : <FaEye />} */}
              </div>
            </div>

            <div className="errors">
              <p className="error">{formik.errors.password}</p>
            </div>
          </div>

          <button type="submit">SignUp</button>
        </form>
        <Link to="/login">
          <div className="signIn-routing-button">
            <p>LogIn</p>
          </div>
        </Link>
        <p className="error">{submitMsg}</p>

        {/* {isSubmitted && <p>Login successful!</p>} */}
      </div>
    </div>
  );
};

export default SignUpPage;
