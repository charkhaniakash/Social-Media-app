import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MenuBar from "./components/MenuBar";
import { AuthProvider } from "./context/authContext";
import AuthRoute from "./utils/AuthRoute";
import SinglePost from "./pages/SinglePost";

function App() {
  return (
    <AuthProvider>
      <Router>
        <MenuBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AuthRoute element={<Login />} />} />
          <Route
            path="/register"
            element={<AuthRoute element={<Register />} />}
          />
          <Route path="/posts/:postId" element={<SinglePost />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
