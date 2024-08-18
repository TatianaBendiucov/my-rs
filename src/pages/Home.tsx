import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Tile from "../components/Tile";
import { RootState } from "src/store/store";
import { useEffect, useState } from "react";

const Home = () => {
  const users = useSelector((state: RootState) => state.users);
  const location = useLocation();
  const [newUser, setNewUser] = useState<boolean>(location.state?.newUser);

  useEffect(() => {
    if (location.state?.newUser) {
      setTimeout(() => {
        setNewUser(false);
      }, 5000);
    }
  }, [location.state?.newUser]);

  return (
    <div>
      <Link to={`/uncontrolled-form`}>Uncontrolled Form</Link>
      <br />
      <Link to={`/controlled-form`}>Controlled Form</Link>
      <div className="tile-container">
        {users.map((user, index) => (
          <Tile user={user} index={index} isNew={newUser} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Home;
