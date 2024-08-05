import { useRef } from "react";
import { useRouter } from "next/router";
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
  const router = useRouter();
  const { query } = router;
  const buttonRef = useRef<HTMLButtonElement>(null);

  const onDismiss = () => {
    router.push(`/search?page=${query.page}`);
  };

  const { data, error, isLoading } = useItemDetailQuery({
    uid: (query.detail as string) || "",
  });

  if (error) {
    return <div>Error</div>;
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
