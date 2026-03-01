import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  LayoutDashboard,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "@/api/auth";

const Login = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  //   login mutation
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      toast.success(data.message);
      // i commented this because i am using cookies
      // localStorage.setItem("token", data.data.token);

      // Wait a tiny delay for the cookie to be set
      setTimeout(async () => {
        await queryClient.refetchQueries({ queryKey: ["me"] });
        navigate("/dashboard");
      }, 50); // 50ms usually enough
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.log((error as any).response?.data?.message);
        toast.error((error as any).response?.data?.message);
      }
    },
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutation.mutate(userData);
  };
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="p-6 w-full md:w-2/3 lg:w-1/3 items-center bg-gray-50 dark:bg-gray-800 shadow-lg">
        <div className="w-full max-w-sm space-y-8">
          {/* Logo */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-[#4191F9]">
              <LayoutDashboard className="size-6 text-white" />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Welcome back
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-[#4191F9] font-medium hover:underline underline-offset-4"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  className="pl-9 h-11 focus-visible:ring-[#4191F9] focus-visible:border-[#4191F9]"
                  required
                  value={userData.email}
                  onChange={handleChange}
                  disabled={loginMutation.isPending}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-[#4191F9] hover:underline underline-offset-4"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pl-9 pr-10 h-11 focus-visible:ring-[#4191F9] focus-visible:border-[#4191F9]"
                  required
                  value={userData.password}
                  onChange={handleChange}
                  disabled={loginMutation.isPending}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  tabIndex={-1}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors disabled:pointer-events-none"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-11 bg-[#4191F9] hover:bg-[#2d7de8] text-white font-medium group mt-2 cursor-pointer"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Signing in..." : "Sign In"}
              <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Login;
