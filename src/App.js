import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import { colRef } from "./Config";
import { onSnapshot, orderBy, query } from "firebase/firestore";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Nav from "./Components/Nav";
import SignIn from "./pages/SignIn";
function App() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const q = query(colRef, orderBy("createdAt", "desc"));
    onSnapshot(q, (snap) => {
      setPosts([]);
      snap.docs.forEach((doc) => {
        setPosts((pre) => [...pre, { ...doc.data(), id: doc.id }]);
      });
    });
  }, []);
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home posts={posts} setPosts={setPosts} />} />
        <Route
          path="post/:id"
          element={<Post posts={posts} setPosts={setPosts} />}
        />
        <Route path="/signIn" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
