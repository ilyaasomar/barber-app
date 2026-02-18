import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router";
import { getMe } from "@/api/auth";
import Spinner from "./Spinner";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
  if (isLoading) {
    return <Spinner />;
  }

  if (!data) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (data) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};
