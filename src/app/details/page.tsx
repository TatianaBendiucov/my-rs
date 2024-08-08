import DetailPageClient from "../../components/DetailPageClient";
import itemApi from "../../store/listFetchReducer";
import { store } from "../../store/store";

const DetailPage = async ({ searchParams }) => {
  const uid = searchParams.detail as string;

  // Fetch data on the server
  const result = await store.dispatch(
    itemApi.endpoints.itemDetail.initiate({ uid }),
  );

  await Promise.all(store.dispatch(itemApi.util.getRunningQueriesThunk()));

  if (!result.data) {
    return <div>Error: Data not found</div>;
  }

  return <DetailPageClient initialData={result.data} uid={uid} />;
};

export default DetailPage;
