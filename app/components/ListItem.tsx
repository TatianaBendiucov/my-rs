import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { ListItemProps, SearchResult } from "../types/SearchTypes";
import { addOrRemove } from "../store/itemReducer";
import { Link } from "@remix-run/react";

const ListItem = ({ item, index, pageNumber, perPage }: ListItemProps) => {
  const itemsFromStore = useSelector((state: RootState) => state.items.values);
  const dispatch = useDispatch();

  const handleCheckboxChange = (value: SearchResult) => {
    dispatch(addOrRemove(value));
  };

  return (
    <li key={index}>
      <input
        type="checkbox"
        value={item.uid}
        onChange={() => handleCheckboxChange(item)}
        checked={itemsFromStore.includes(item)}
      />
      <Link
        to={`/details?page=${pageNumber}&perPage=${perPage}&detail=${item.uid}`}
      >
        <strong>{item.name}</strong> -
        <span>Earth Animal: {item.earthAnimal ? "Yes" : "No"}</span>
      </Link>
    </li>
  );
};

export default ListItem;
