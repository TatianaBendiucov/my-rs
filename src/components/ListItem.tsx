import { Link } from "react-router-dom";
import { ListItemProps } from "src/types/SearchTypes";

const ListItem = ({ item, index, pageNumber }: ListItemProps) => {
  return (
    <li key={index}>
      <Link to={`/details?page=${pageNumber}&detail=${item.uid}`}>
        <strong>{item.name}</strong> -
        <span>Earth Animal: {item.earthAnimal ? "Yes" : "No"}</span>
      </Link>
    </li>
  );
};

export default ListItem;
