import { useQuery } from "@tanstack/react-query";
import ShowData from "./components/ShowData";
import { getDashboardData } from "@/api/dashboard";

export default function Dashboard() {
  const { data } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardData,
  });
  return <ShowData data={data} />;
}
