import React, { useContext } from "react";
import TopBar from "./components/TopBar";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Home from "./pages/home/Home";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Context } from "./context/Context";
import EveryPost from "./pages/everyPost/EveryPost";
import About from "./pages/About/About";

const App = () => {
  const { user } = useContext(Context);
  return (
    <Router>
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/post/:postId" element={<Single />}></Route>
        <Route path="/write" element={user ? <Write /> : <Register />}></Route>
        <Route path="/login" element={user ? <Home /> : <Login />}></Route>
        <Route path="/posts" element={<EveryPost />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route
          path="/register"
          element={user ? <Home /> : <Register />}
        ></Route>
        <Route
          path="/settings"
          element={user ? <Settings /> : <Register />}
        ></Route>
        <Route path="/settings" element={<Settings />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
