 

 

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const AdminProtectedRoute = (props) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const role = Cookies.get("role");
  const checkAccessToken = () => {
    const userToken = Cookies.get("jwtToken");
    if (userToken === undefined) {
      setIsLoggedIn(false);
      return navigate("/login");
    }
    else{
      setIsLoggedIn(true);
    }
     
    if (isLoggedIn && role === "admin") {
      return navigate("/");
    }
  };
  useEffect(() => {
    checkAccessToken();
  }, [isLoggedIn]);
  return (
    <React.Fragment>
      {isLoggedIn && role === "admin" ? props.children : null}
    </React.Fragment>
  );
};
export default AdminProtectedRoute;
