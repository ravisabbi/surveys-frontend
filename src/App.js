 
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home  from "./components/HomePage";
import LoginPage from "./components/LoginPage/LoginPage";
import SignUpPage from "./components/SignUpPage/SignUpPage";
//import Dashbord from "./components/Dashboard/Dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/" element={<Home/>} />
      </Routes>
    </>
  );
}

export default App;
// onSubmit: (values) => {
//   axios.post("/login",formik.values).then((response) => {
//    setErrorMsg("");
//    console.log(response.data)
//    if(response.statusText === "OK"){
//      console.log("LogIn");
//      navigate("/",{replace:true});
//    }
//    formik.resetForm();
//    const {jwtToken} = response.data;
//    Cookies.set("jwt_token",jwtToken,{expires:10});
//   })
//   .catch((e) => {
//    setErrorMsg(e.response.data.msg);
//    console.log(e.response.data.msg);
//   })
// },

// const navigate = useNavigate();
//   const [showPassword, setshowPassword] = useState(false);
//   const [errMsg,setErrorMsg] = useState("");
//   const togglePasswordVisibility = () => {
//     setshowPassword(!showPassword);
//   };
