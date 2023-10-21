import "./App.scss";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import "./assets/scss/app.scss";
import MainLayout from "./layout/MainLayout";
import ScrollToTop from "./utils/scrollToTop";
import { useEffect } from "react";
import Login from "./pages/Login";
import Flight from "./pages/Flight";
import HistoryBalance from "./pages/HistoryBalance";
import User from "./pages/UserPage";
import Chat from "./pages/Chat";
import CreateTest from "./pages/CreateTest";

function App() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
  window.addEventListener("resize", () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });

  const navigate = useNavigate();

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Navigate to={"/store"} />} />
          <Route path="store" element={<Main />} />
          <Route path="create/test" element={<CreateTest />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/:id" element={<User />} />
          <Route path="login" element={<Login />} />
          <Route path="flight/:id" element={<Flight />} />
          <Route path="balance" element={<HistoryBalance />} />
          <Route path="chat" element={<Chat />} />
        </Route>
        <Route path="*" element={<Navigate to={"/"} replace />} />
      </Routes>
    </>
  );
}

export default App;
