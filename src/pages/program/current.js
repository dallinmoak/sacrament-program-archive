import ProgramItemDetail from "@/components/program-detail/program-item-detail";
import useSWR from "swr";

export default function CurrentProgram() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error, isLoading } = useSWR("/api/program-dates", fetcher);

  if (error) {
    console.log(error);
    return <div>error</div>;
  }
  if (isLoading) return <div>loading...</div>;

  return <ProgramItemDetail id={data[0].id} />;
}
