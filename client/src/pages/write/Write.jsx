import { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import "./write.scss";
import { Context } from "../../context/Context";

function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.photo = fileName;
      try {
        await axios.post("http://localhost:5000/api/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await axios.post("http://localhost:5000/api/posts/", newPost);
      console.log(res);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm">
        <div className="writeForm__group">
          <label className="writeIcon" htmlFor="fileInput">
            <i>+</i>
          </label>
          <input
            type="file"
            id="fileInput"
            hidden
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeForm__group">
          <textarea
            placeholder="Tell your story ..."
            className="writeInput writeText"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit" onClick={handleSubmit}>
          Publish
        </button>
      </form>
    </div>
  );
}

export default Write;
