import "./header.scss";

function Header() {
  return (
    <div className="header">
      <div className="header__title">
        <span className="title__md">Explore More In Here</span>
        <span className="title__lg">Blog</span>
      </div>
      <img className="header__img" src="./assets/bg2.jpg" alt="" />
    </div>
  );
}

export default Header;
