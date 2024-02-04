import React, { Suspense } from "react";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/home";
import Groups from "./pages/group";
import Chats from "./pages/chats";
import FriendScreen from "./pages/friend";
import LoginAndRegister from "./pages/login";
import NotFound from "./components/pageNotFound";
import { useSelector } from "react-redux";
import Header from "./components/Header";
function App() {
  const userData = useSelector((state) => state.auth?.user);
  return (
    <div className="App">
      <Header />
      <Suspense fallback={false}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/groups"
            element={
              userData?._id ? <Groups /> : <Navigate to="/login-register" />
            }
          />
          <Route
            path="/chats"
            element={
              userData?._id ? <Chats /> : <Navigate to="/login-register" />
            }
          />
          <Route
            path="/friend"
            element={
              userData?._id ? (
                <FriendScreen />
              ) : (
                <Navigate to="/login-register" />
              )
            }
          />
          <Route path="/login-register" element={<LoginAndRegister />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <ToastContainer
        enableMultiContainer
        containerId={"TOP_RIGHT"}
        newestOnTop={true}
      />
    </div>
  );
}

export default App;
