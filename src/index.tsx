import React from 'react';
import ReactDOM from 'react-dom';
import {  
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import './css/index.css';
import PreAuth from "./pages/preauth";
import Registration from "./pages/registration";
import User from "./pages/user";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PreAuth />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);