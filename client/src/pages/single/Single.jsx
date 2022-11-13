import "./single.scss";
import Sidebar from "../../components/SideBar";
import SinglePost from "../../components/SinglePost";
function Single() {
  return (
    <div className="single">
      <SinglePost />
      <Sidebar />
    </div>
  );
}

export default Single;
