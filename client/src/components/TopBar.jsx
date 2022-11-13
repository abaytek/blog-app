import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";
import { Facebook, Instagram, Pinterest, Twitter } from "@material-ui/icons";
import "./topbar.scss";

function TopBar() {
  const { user, dispatch } = useContext(Context);
  const publicFolder = "http://localhost:5000/images/";
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="topbar">
      <div className="topbar__left">
        <Twitter className="icon" />
        <Facebook className="icon" />
        <Instagram className="icon" />
        <Pinterest className="icon" />
      </div>
      <div className="topbar__center">
        <ul className="topbar__items">
          <li className="topbar__list">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          {/* <li className="topbar__list">
            <Link className="link" to="/about">
              ABOUT
            </Link>
          </li> */}
          <li className="topbar__list">
            <Link className="link" to="/posts">
              POSTS
            </Link>
          </li>
          <li className="topbar__list">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          <li className="topbar__list" onClick={handleLogout}>
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className="topbar__right">
        {user ? (
          <Link to="/settings">
            <img
              className="profile"
              src={publicFolder + user.profilePic}
              alt=""
            />
          </Link>
        ) : (
          <ul className="topbar__items">
            <li className="topbar__list">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topbar__list">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <p className="search__icon">me</p>
      </div>
    </div>
  );
}

export default TopBar;
