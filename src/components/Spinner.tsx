import { Loader } from "lucide-react";

const Spinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader className="animate-spin w-10 h-10 text-blue-500" />
    </div>
  );
};

export default Spinner;
