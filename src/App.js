import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CustomerPage from "./pages/CustomerPage";
import ManagerPage from "./pages/ManagerPage";
import ServerPage from "./pages/ServerPage";
import MenuPage from "./pages/MenuPage";
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/menu" exact element={<MenuPage />} />
        <Route path="/customer" exact element={<CustomerPage />} />
        <Route path="/manager" exact element={<ManagerPage />} />
        <Route path="/server" exact element={<ServerPage />} />
        <Route path="/*" element={<CustomerPage />} />
      </Routes>
    </Router>
  );
}

export default App;
