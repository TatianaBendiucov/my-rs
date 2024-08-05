import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { ListItemProps, SearchResult } from "../types/SearchTypes";
import { addOrRemove } from "../store/itemReducer";
import Link from "next/link";

const ListItem = ({ item, index, pageNumber }: ListItemProps) => {
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
      <Link href={`/details?page=${pageNumber}&detail=${item.uid}`}>
        <strong>{item.name}</strong> -
        <span>Earth Animal: {item.earthAnimal ? "Yes" : "No"}</span>
      </Link>
    </li>
  );
};

export default ListItem;
