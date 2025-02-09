import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { User, Lock, LogIn } from "lucide-react";
import LoginLeftPanel from "../components/LoginLeftPanel";

const Signup: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match. Please confirm your password.");
      return;
    }
    setIsLoading(true);
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    try {
      await axios.post(`${BACKEND_URL}/auth/signup`, {
        username,
        password,
      });
      toast.success("User created successfully. Please login.");
      navigate("/");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.error || "Signup failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Panel - Decorative */}
      <LoginLeftPanel />

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">Sign Up</h2>
              <p className="text-gray-600 mt-2">
                Create an account to get started.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                {/* Username Field */}
                
                <div className="relative">
                {/* <label className="block text-sm font-medium text-gray-700 mb-1">Username</label> */}
                  <Input
                    type="text"
                    id="username"
                    placeholder="Enter Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="peer w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-purple-400 transition-all duration-200"
                    required
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                </div>

                {/* Password Field */}
                {/* <label className="block text-sm font-medium text-gray-700 mb-1">Password</label> */}
                <div className="relative">
                  <Input
                    type="password"
                    id="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="peer w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-purple-400 transition-all duration-200"
                    required
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div className="relative">
                  <Input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="peer w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-purple-400 transition-all duration-200"
                    required
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    <span>Sign Up</span>
                  </>
                )}
              </Button>

              <p className="text-center text-gray-600 text-sm">
                Already have an account?{" "}
                <Link
                  to="/"
                  className="text-purple-600 hover:text-purple-500 font-medium transition-colors"
                >
                  Login
                </Link>
              </p>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                By signing up, you agree to our{" "}
                <Link
                  to="/terms"
                  className="text-purple-600 hover:text-purple-500"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  className="text-purple-600 hover:text-purple-500"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Signup;
