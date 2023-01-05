import React from "react";
import{Routes, Route} from "react-router-dom";
import Register from "./screens/register/register";
import Login from "./screens/login/login";
import PrivateRoutes from "./utils/privateRoutes/privateroutes";
import Home from "./screens/home/home";
import AddSubject from "./screens/addSubject/addSubject";
import Subjects from "./screens/subjects/Subjects";
import SubjectDecks from "./screens/subjectDecks/SubjectDecks";
import Deck from "./screens/subjectDecks/Deck";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/home" element={<Home />}/>
          <Route path="/add-subject" element={<AddSubject />}/>
          <Route path="/subjects" element={<Subjects />} />
            <Route path="/subjects/:folderid" element={<SubjectDecks />} />
            <Route path="/subjects/:folderid/:deckid" element={<Deck />}/>
        </Route>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
      </Routes>
    </>
  );
}

export default App;
