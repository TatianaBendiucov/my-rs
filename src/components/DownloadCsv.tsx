import { useDispatch, useSelector } from "react-redux";
import { removeAll } from "../store/itemReducer";
import { RootState } from "../store/store";
import { SearchResult } from "src/types/SearchTypes";

const DownloadCsv = () => {
  // const itemsData = useSelector((state: RootState) => state.itemApi);
  const checkedItems = useSelector((state: RootState) => state.items.values);
  const dispatch = useDispatch();

  const handleUnselect = () => {
    dispatch(removeAll());
  };

  const convertToCSV = (items: SearchResult[]) => {
    const header = ["UUID", "Name", "Earth Animal"];
    const rows = items.map((item) => [item.uid, item.name, item.earthAnimal]);

    const csvContent = [header, ...rows].map((e) => e.join(",")).join("\n");
    return csvContent;
  };

  const handleDownload = () => {
    const csvContent = convertToCSV(checkedItems);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", checkedItems.length + "_animals.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (checkedItems.length) {
    return (
      <footer>
        <span>{checkedItems.length} items are selected.</span>
        <button onClick={handleUnselect}>Unselect all</button>
        <button onClick={handleDownload}>Download</button>
      </footer>
    );
  }

  return <footer></footer>;
};

export default DownloadCsv;
