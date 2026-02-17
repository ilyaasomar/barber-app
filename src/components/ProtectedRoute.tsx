// import { getMe } from "@/api/auth";
// import { useQuery } from "@tanstack/react-query";
// import { Navigate } from "react-router";

// export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["me"],
//     queryFn: getMe,
//     retry: false, //don't retry 401
//     staleTime: 1000 * 60 * 5, //cache for 5 minute, avoid refetching on every nav
//   });

//   console.log("ProtectedRoute:", { data, isLoading, isError });

//   if (isLoading) {
//     return <span className="text-muted-foreground text-sm">Loading...</span>;
//   }

//   //   Not logged in -> to send login page
//   if (isError || !data.user) return <Navigate to="/login" replace />;
//   //   logged in -> render the page
//   return children;
// };

// //   block logged in user from accessing login and register pages.
// export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["me"],
//     queryFn: getMe,
//     retry: false,
//     staleTime: 1000 * 60 * 5,
//   });

//   console.log("PublicRoute:", { data, isLoading, isError }); // 👈 check isError now

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-background">
//         <span className="text-muted-foreground text-sm">Loading...</span>
//       </div>
//     );
//   }

//   // 👇 if error (not logged in) OR no user data → show login/register
//   if (isError || !data?.user) {
//     return children;
//   }

//   // 👇 logged in → redirect to dashboard
//   return <Navigate to="/dashboard" replace />;
// };

// src/components/ProtectedRoute.tsx
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router";
import { getMe } from "@/api/auth";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  console.log("ProtectedRoute:", { data, isLoading, isError }); // 👈 add this to debug

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <span className="text-muted-foreground text-sm">Loading...</span>
      </div>
    );
  }

  if (isError || !data?.user) {
    console.log("Redirecting to login"); // 👈 check if this fires
    return <Navigate to="/login" replace />;
  }

  return children;
};

export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  console.log("PublicRoute:", { data, isLoading }); // 👈 add this to debug

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <span className="text-muted-foreground text-sm">Loading...</span>
      </div>
    );
  }

  if (data?.user) {
    console.log("Already logged in, redirecting to dashboard");
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};
