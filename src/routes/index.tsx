import {Navigate, Route, Routes } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";

const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
  );
};

export default AppRoutes;
