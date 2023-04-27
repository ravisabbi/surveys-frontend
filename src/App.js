import React from "react";
import { Routes, Route } from "react-router-dom";
import UserHome from "./components/UserHome";
import AdminHome from "./components/AdminHome";
import LoginPage from "./components/LoginPage/LoginPage";
import SignUpPage from "./components/SignUpPage/SignUpPage";
import UserProtectedRoute from "./components/UserProtectedRoute";
import Cookies from "js-cookie";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import Survey from "./components/SurveyForm/SurveyForm";
import NotFound from "./components/NotFound/NotFound";

function App() {
  const role = Cookies.get("role");
  console.log("user", role);
  return (
    <Routes>
      <Route path="/login" exact element={<LoginPage />} />
       <Route path="/signUp" exact element={<SignUpPage />} /> 
       <Route path="/surveyF/:surveyId" exact element={<Survey />} /> 
       <Route path="/notfound" exact element={<NotFound />} /> 
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
