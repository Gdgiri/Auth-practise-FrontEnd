import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";

const App = () => {
  return (
    <div>
      <BrowserRouter
        future={{
          v7_startTransition: true,
        }}
      >
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
