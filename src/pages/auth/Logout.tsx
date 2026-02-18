import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutUser } from "@/api/auth";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onSettled: () => {
      // Always clear regardless of API success/failure
      // localStorage.removeItem("token");
      queryClient.setQueryData(["me"], null); // 👈 clean null, not undefined
      navigate("/login", { replace: true });
    },
    onError: () => {
      // Still log out locally even if backend call fails
      // localStorage.removeItem("token");
      queryClient.setQueryData(["me"], null); // 👈 clean null, not undefined
      navigate("/login", { replace: true });
    },
  });

  return logoutMutation;
};
