import { Routes, Route } from "react-router-dom";
import Home from "./App";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      
    </Routes>
  );
}
