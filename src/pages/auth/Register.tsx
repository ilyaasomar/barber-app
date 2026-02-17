import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import {
  Eye,
  EyeOff,
  UserRound,
  Mail,
  Lock,
  ArrowRight,
  LayoutDashboard,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerUser } from "@/api/auth";
import { toast } from "sonner";

const Register = () => {
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //   create tanStack mutation
  const createMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      toast.success(data.message);
      //   console.log(data.message);
      queryClient.invalidateQueries({ queryKey: ["register"] });
      setTimeout(() => navigate("/login"), 2000);
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        // console.log((error as any).response?.data?.message);
        toast.error((error as any).response?.data?.message);
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(userData);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-8">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-[#4191F9]">
            <LayoutDashboard className="size-6 text-white" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#4191F9] font-medium hover:underline underline-offset-4"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="space-y-1.5">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <UserRound className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={userData.name}
                onChange={handleChange}
                className="pl-9 h-11 focus-visible:ring-[#4191F9] focus-visible:border-[#4191F9]"
                required
                disabled={createMutation.isPending}
              />
            </div>
          </div>

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
                value={userData.email}
                onChange={handleChange}
                className="pl-9 h-11 focus-visible:ring-[#4191F9] focus-visible:border-[#4191F9]"
                required
                disabled={createMutation.isPending}
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Min. 8 characters"
                value={userData.password}
                onChange={handleChange}
                className="pl-9 pr-10 h-11 focus-visible:ring-[#4191F9] focus-visible:border-[#4191F9]"
                required
                disabled={createMutation.isPending}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
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
            className="w-full h-11 bg-[#4191F9] hover:bg-[#2d7de8] text-white font-medium group mt-2"
            disabled={createMutation.isPending}
          >
            {createMutation.isPending ? "Creating...." : "Create Account"}

            <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
