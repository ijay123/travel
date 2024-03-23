import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../landing-page/Home";
import Layout from "../layout/Layout";
import Login from "../login/Login";
import Signup from "../signup/Signup";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Signup/>} />
      <Route
        path="/home"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default Router;
