import React from "react";
import { Routes, Route } from "react-router-dom";
import UserHome from "./components/UserHome";
import AdminHome from "./components/AdminHome";
import LoginPage from "./components/LoginPage/LoginPage";
import SignUpPage from "./components/SignUpPage/SignUpPage";
import UserProtectedRoute from "./components/UserProtectedRoute";
import Cookies from "js-cookie";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

function App() {
  const role = Cookies.get("role");
  console.log("user", role);
  return (
    <Routes>
      <Route path="/login" exact element={<LoginPage />} />
       <Route path="/signUp" exact element={<SignUpPage />} /> 
      <Route
        path="/"
        element={
          role === "user" ? (
            <UserProtectedRoute>
              <UserHome />
            </UserProtectedRoute>
          ) : (
            <AdminProtectedRoute>
              <AdminHome />
            </AdminProtectedRoute>
          )
        }
      />
    </Routes>
  );
}

export default App;
