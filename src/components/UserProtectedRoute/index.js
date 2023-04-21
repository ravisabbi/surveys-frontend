import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const UserProtectedRoute = (props) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userDetailsCookie = Cookies.get("userDetails");
  const role = userDetailsCookie ? JSON.parse(userDetailsCookie).role : null;

  const checkAccessOfUser = () => {
    const accessToken = Cookies.get("jwtToken");
    console.log("accessToken", accessToken);
    if (!accessToken || accessToken === undefined) {
      setIsLoggedIn(false);
      navigate("/login");
    } else {
      setIsLoggedIn(true);
    }

    if (isLoggedIn && role === "user") {
      navigate("/");
    }
  };

  useEffect(() => {
    checkAccessOfUser();
  }, [isLoggedIn]);

  return <React.Fragment>{isLoggedIn ? props.children : null}</React.Fragment>;
};

export default UserProtectedRoute;
