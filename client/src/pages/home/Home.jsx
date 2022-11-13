import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import Posts from "../../components/Posts";
import SideBar from "../../components/SideBar";
import "./home.scss";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  useEffect(() => {
    const fetchPost = async () => {
      await fetch(`http://localhost:5000/api/posts/${search}`)
        .then((response) => response.json())
        .then((data) => setPosts(data));
    };
    fetchPost();
  }, [search]);

  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <SideBar />
      </div>
    </>
  );
};

export default Home;
