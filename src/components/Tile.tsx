import { User } from "../types/user";

interface TileProps {
  user: User;
  index: number;
  isNew: boolean;
}
const Tile = ({ user, index, isNew }: TileProps) => {
  return (
    <div key={index} className={isNew ? "tile with-new" : "tile"}>
      Name: <strong>{user.name}</strong>
      <br />
      Age: <strong>{user.age}</strong>
      <br />
      Email: <strong>{user.email}</strong>
      <br />
      Password: <strong>{user.password}</strong>
      <br />
      Gender: <strong>{user.gender}</strong>
      <br />
      Terms: <strong>{user.terms ? "Accepted" : "Not accepted"}</strong>
      <br />
      Country: <strong>{user.country}</strong>
      <br />
      Picture: <img src={user.picture} />
    </div>
  );
};

export default Tile;
