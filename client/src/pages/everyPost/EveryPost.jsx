import "./everyPost.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import Post from "../../components/Post";
import SideBar from "../../components/SideBar";

const EveryPost = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPost = async () => {
      const url = "http://localhost:5000/api/posts/";
      await axios.get(url).then((data) => setPosts(data.data));
    };
    fetchPost();
  }, []);

  return (
    <div className="wrapper">
      <div className="title">
        <h2>Explore Posts Here</h2>
        <div className="underline"></div>
      </div>
      <div className="container">
        <div className="posts_wrapper">
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
        <SideBar />
      </div>
    </div>
  );
};
export default EveryPost;
