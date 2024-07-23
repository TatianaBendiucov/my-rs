import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DetailResult } from "../types/DetailType";

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
  const [loading, setLoading] = useState<boolean>(false);
  const [detail, setDetail] = useState<DetailResult>({
    uid: "",
    name: "",
    earthAnimal: false,
    earthInsect: false,
    avian: false,
    canine: false,
    feline: false,
  });
  const navigate = useNavigate();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const onDismiss = () => {
    navigate(`/?page=${searchParams.get("page")}`);
  };

  const handleLoading = (param: boolean) => {
    setLoading(param);
  };

  const handleResult = (param: DetailResult) => {
    setDetail(param);
  };

  const handleDetail = (uid: string | null) => {
    handleLoading(true);

    fetch(`https://stapi.co/api/v1/rest/animal?uid=${uid}`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Response was not ok");
        }

        return response.json();
      })
      .then(({ animal }) => {
        handleResult(animal);
        handleLoading(false);
      })
      .catch((error) => {
        handleLoading(false);
        throw new Error(error);
      });
  };

  useEffect(() => {
    handleDetail(searchParams.get("detail"));
  }, []);

  return (
    <div style={{ background: 'var(--background)', color: 'var(--color)', padding: '1rem' }}>
      <div className="detail-page">
        <button ref={buttonRef} onClick={onDismiss}>
          Close
        </button>

        <h2>Animal detail:</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <table>
            <tbody>
              {Object.keys(detail).map((el: string) => {
                let val = detail[el as keyof DetailResult];

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
