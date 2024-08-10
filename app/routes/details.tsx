import { json, LoaderFunction } from "@remix-run/node";
import { store } from "../store/store";
import DetailPageClient from "../components/DetailPageClient";
import itemApi from "../store/listFetchReducer";
import { useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const uid = url.searchParams.get("detail");

  if (!uid) {
    throw new Response("UID is required", { status: 400 });
  }

  // Fetch data on the server
  const result = await store.dispatch(
    itemApi.endpoints.itemDetail.initiate({ uid }),
  );

  await Promise.all(store.dispatch(itemApi.util.getRunningQueriesThunk()));

  if (!result.data) {
    return json(null, { status: 404 });
  }

  return json({ initialData: result.data, uid });
};

export default function DetailPage() {
  const { initialData, uid } = useLoaderData<typeof loader>();
  return <DetailPageClient initialData={initialData} uid={uid} />;
}
