import { styles } from "@/styles";
import { FileEdit, Trash } from "lucide-react";

const Actions = ({ id }: { id: string }) => {
  return (
    <div className="flex items-center gap-x-2">
      <div
        className={`w-7 h-7 flex items-center rounded-md ${styles.primaryBgColor}`}
        onClick={() => {
          // router.push(`/categories/${categoryData.id}`);
        }}
      >
        <FileEdit
          size={10}
          className="text-white w-full h-full p-1 cursor-pointer"
        />
      </div>

      <div
        className="w-7 h-7 flex items-center rounded-md bg-red-600"
        // onClick={() => setOpen(true)}
      >
        <Trash className="text-white w-full h-full p-1 cursor-pointer" />
      </div>
    </div>
  );
};

export default Actions;
