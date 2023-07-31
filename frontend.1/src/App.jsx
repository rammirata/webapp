import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Login, Signup, ForgotPassword, ResetPassword } from "./sections/index";
import { Home, RequestList, Analytics, List } from "./pages/index";

const App = () => {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/request-list" element={<RequestList />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/list" element={<List />} />
      </Routes>
    </Router>
  );
};

export default App;
