import React from "react";
import{Routes, Route} from "react-router-dom";
import Register from "./screens/register/register";
import Login from "./screens/login/login";
import PrivateRoutes from "./utils/privateRoutes/privateroutes";
import Home from "./screens/home/home";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/home" element={<Home />}/>
        </Route>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
      </Routes>
    </>
  );
}

export default App;
