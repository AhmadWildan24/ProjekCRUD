import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import MessageList from "./components/Home";
import Pesan from "./components/Mail";
import SideBar from "./components/sidebar";
import PopUp from "./components/PopUp";
import Dropdown from "./components/Dropdown";
import PopUpEdit from "./components/PopUpEdit";

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
    setLoading(false); // Selesai memuat setelah token dicek
  }, []);

  // Sementara `loading` masih true, jangan render apa pun dulu
  if (loading) {
    return <div>Loading...</div>; // Bisa juga diganti dengan spinner atau kosong
  }
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={!token ? <Login setToken={setToken} /> : <Navigate to="/home" />} />
          <Route path="/home" element={token ? <MessageList token={token} /> : <Navigate to="/login" />} />
          <Route path="/pesan" element={token ? <Pesan token={token} /> : <Navigate to="/home" />} />
          <Route path="/sideBar" element={<SideBar />} />
          <Route path="/popup" element={token ? <PopUp token={token} /> : <Navigate to="/pesan" />} />
          <Route path="/popup" element={token ? <PopUpEdit token={token} /> : <Navigate to="/pesan" />} />
          <Route path="/dropdown" element={<Dropdown />} />
          <Route path="/" element={<Navigate to={token ? "/home" : "/login"} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
