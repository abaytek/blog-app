import "./post.scss";
import { Link } from "react-router-dom";
function Post({ post }) {
  const PublicFolder = "http://localhost:5000/images/";
  return (
    <Link className="link" to={`/post/${post._id}`}>
      <div className="post">
        {post.photo && (
          <img className="post__img" src={PublicFolder + post.photo} alt="" />
        )}
        <div className="post__info">
          <div className="post__cats">
            {post.categories.map((p) => (
              <span key={p._id} className="post_cat">
                {p.name}
              </span>
            ))}
          </div>
          <span className="post__title">{post.title}</span>
          <hr />
          <span className="post__date">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        <p className="post__desc">{post.desc}</p>
      </div>
    </Link>
  );
}

export default Post;
