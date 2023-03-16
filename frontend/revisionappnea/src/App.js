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
import ReviewStack from "./screens/reviewPage/ReviewStack";
import ReviewQueue from "./screens/reviewPage/ReviewQueue";
import DeckCards from "./screens/subjectDecks/DeckCards";
import Contact from "./screens/contact/Contact";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  //all the routes for each component
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/home" element={<Home />}/>
          <Route path="/add-subject" element={<AddSubject />}/>
          <Route path="/contact" element={<Contact />} />
          <Route path="/subjects" element={<Subjects />} />
            <Route path="/subjects/:folderid" element={<SubjectDecks />} />
            <Route path="/subjects/:folderid/:deckid" element={<Deck />}/>
            <Route path="/subjects/view-cards/:deckid" element={<DeckCards />}/>
            <Route path="/review-stack/:deckid" element={<ReviewStack />}/>
            <Route path="/review-queue/:deckid" element={<ReviewQueue />} />
        </Route>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
      </Routes>
    </>
  );
}

export default App;
