import { useContext, useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Delete, Edit } from "@material-ui/icons";
import "./singlepost.scss";
import { Context } from "../context/Context";
import axios from "axios";

function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState([]);
  const PublicFolder = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const fetchpost = async () => {
      try {
        return await fetch(`http://localhost:5000/api/posts/${path}`)
          .then((response) => response.json())
          .then((data) => {
            setPost(data);
            setTitle(data.title);
            setDesc(data.desc);
          });
      } catch (err) {
        console.log(err);
      }
    };
    fetchpost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete("http://localhost:5000/api/posts/" + path, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = async () => {
    await axios.put("http://localhost:5000/api/posts/" + post._id, {
      title,
      desc,
    });
    setUpdateMode(false);
  };
  return (
    <div className="singlePost">
      <div className="singlePost__wrapper">
        {post.photo && (
          <img
            className="singlePost__img"
            src={PublicFolder + post.photo}
            alt=""
          />
        )}

        {updateMode ? (
          <input
            type="text"
            className="singlePost__titleInput"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePost__title">
            {title}
            {post.username === user?.username && (
              <div className="singlePost__edit">
                <Edit className="icon" onClick={() => setUpdateMode(true)} />
                <Delete className="icon" onClick={handleDelete} />
              </div>
            )}
          </h1>
        )}
        <div className="singlePost__info">
          <span>
            Author:
            <Link className="link" to={`/?user=${post.username}`}>
              <b>{user.username}</b>
            </Link>
          </span>
          <span>
            Date: <b>{new Date(post.createdAt).toDateString()}</b>
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePost__descInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePost__desc">{desc}</p>
        )}
        {updateMode && (
          <button className="btn__update" onClick={handleSubmit}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}

export default SinglePost;
