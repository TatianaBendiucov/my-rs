"use client";

import { useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useItemDetailQuery } from "../store/listFetchReducer";
import { DetailResult, ItemDetailFullResponse } from "../types/DetailType";

interface SearchPageClientProps {
  initialData: ItemDetailFullResponse | undefined;
  uid: string;
}

const names = {
  uid: "UID",
  name: "Name",
  earthAnimal: "Earth Animal",
  earthInsect: "Earth Insect",
  avian: "Avian",
  canine: "Canine",
  feline: "Feline",
};

const DetailPageClient = ({ initialData, uid }: SearchPageClientProps) => {
  const router = useRouter();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const searchParams = useSearchParams();
  const page = searchParams?.get("page") || 1;
  const perPage = searchParams?.get("perPage") || 10;

  const onDismiss = () => {
    router.push(`/search?page=${page}&perPage=${perPage}`);
  };

  const { data, error, isLoading } = useItemDetailQuery(
    {
      uid: uid || "",
    },
    {
      skip: initialData !== undefined,
      selectFromResult: (result) => ({
        ...result,
        data: initialData || result.data,
      }),
    },
  );

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

export default DetailPageClient;
