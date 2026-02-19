import { DataTable } from "@/components/reusables/data-table";
import { columns } from "./column";
interface ShowCustomerDataProps {
  serialNumber: number;
  id: string;
  customer_name: string;
  phone: string;
  email: string;
}
[];
const ShowCustomerData = ({ data }: { data: ShowCustomerDataProps[] }) => {
  //   console.log(data);
  return (
    <div>
      <DataTable columns={columns} data={data ?? []} />
    </div>
  );
};

export default ShowCustomerData;
