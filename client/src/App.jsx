import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import ResumeBuilder from "./pages/ResumeBuilder";
import Preview from "./pages/Preview";
import Login from "./pages/Login";

import { login, setLoading } from "./app/features/authSlice";
import api from "./config/api";

const App = () => {
  const dispatch = useDispatch();

  const getUserData = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      dispatch(setLoading(false));
      return;
    }

    try {
      const { data } = await api.get("/api/users/data", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.user) {
        dispatch(login({ token, user: data.user }));
      }
    } catch (error) {
      console.log(error.response?.data?.message || error.message);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div>
      <Toaster />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/app" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="builder/:resumeId" element={<ResumeBuilder />} />
        </Route>

        <Route path="/view/:resumeId" element={<Preview />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;