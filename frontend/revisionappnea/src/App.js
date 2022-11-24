import React from "react";
import{Routes, Route} from "react-router-dom";
import Register from "./register/register";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />}/>
      </Routes>
    </>
  );
}

export default App;
