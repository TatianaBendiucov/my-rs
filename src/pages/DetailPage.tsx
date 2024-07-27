import { useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DetailResult } from "../types/DetailType";
import { useItemDetailQuery } from "../store/listFetchReducer";

const names = {
  uid: "UID",
  name: "Name",
  earthAnimal: "Earth Animal",
  earthInsect: "Earth Insect",
  avian: "Avian",
  canine: "Canine",
  feline: "Feline",
};

const DetailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const onDismiss = () => {
    navigate(`/?page=${searchParams.get("page")}`);
  };

  const { data, error, isLoading } = useItemDetailQuery({
    uid: searchParams.get("detail") || "",
  });

  if (error) {
    return "<div>Error</div>";
  }

  return (
    <div
      style={{
        background: "var(--background)",
        color: "var(--color)",
        padding: "1rem",
      }}
    >
      <div className="detail-page">
        <button ref={buttonRef} onClick={onDismiss}>
          Close
        </button>

        <h2>Animal detail:</h2>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <table>
            <tbody>
              {Object.keys(!data ? [] : data?.animal).map((el: string) => {
                let val = data?.animal[el as keyof DetailResult];

                if (typeof val === "boolean") {
                  val = val ? "Yes" : "No";
                }

                return (
                  <tr key={el}>
                    <td>
                      <strong>{names[el as keyof DetailResult]}:</strong>
                    </td>
                    <td>{val}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      <div className="page-overlay" onClick={onDismiss}></div>
    </div>
  );
};

export default DetailPage;
