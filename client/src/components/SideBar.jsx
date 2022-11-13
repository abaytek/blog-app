import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Facebook, Instagram, Pinterest, Twitter } from "@material-ui/icons";

import "./sidebar.scss";

function SideBar() {
  const [cats, setCats] = useState([]);
  const { search } = useLocation();
  useEffect(() => {
    const getData = async () => {
      return await fetch(`http://localhost:5000/api/categories${search}`)
        .then((response) => response.json())
        .then((data) => setCats(data));
    };
    getData();
  }, [search]);

  return (
    <div className="sidebar">
      <div className="sidebar__item">
        <span className="sidebar__title">ABOUT ME</span>
        <img src="./assets/pizza.png" alt="" />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem vitae
          sequi laudantium cumque assumenda aliquid placeat similique possimus
          corporis exercitationem.
        </p>
      </div>
      <div className="sidebar__item">
        <span className="sidebar__title">CATEGORIES</span>
        <ul className="sidebar__list">
          {cats.map((cat) => (
            <li key={cat._id} className="sidebar__listItem">
              <Link className="link" to={`/?cat=${cat.name}`}>
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="sidebar__item">
        <span className="sidebar__title">FOLLOW US</span>
        <div className="sidebar__socials">
          <Twitter className="icon" />
          <Facebook className="icon" />
          <Instagram className="icon" />
          <Pinterest className="icon" />
        </div>
      </div>
    </div>
  );
}

export default SideBar;
