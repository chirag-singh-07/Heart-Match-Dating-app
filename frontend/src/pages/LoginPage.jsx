import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/authStore";
import { Eye, EyeOff, Heart, Loader, Smile, Sparkles } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const { loginUser, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const validate = () => {
    let isValid = true;

    let newErrors = { email: "", password: "" };

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
      isValid = false;
    }
    if (formData.password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters, contain 1 uppercase, 1 lowercase & 1 number.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Remove error when user starts typing correctly
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      // Proceed with API request
      loginUser(formData, navigate);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-50">
      {/* Card Container (90% Height & Width) */}
      <div className="w-[90%] h-[90vh] flex shadow-lg bg-white rounded-3xl overflow-hidden border border-rose-200 shadow-rose-300">
        {/* Left Section - Branding & Theme (Full Height & Width) */}

        <div className="hidden md:flex flex-1 flex-col justify-center items-center text-center p-8 bg-gradient-to-br from-rose-400 to-pink-300 text-white shadow-md shadow-rose-300 h-full">
          <div className="animate-bounce">
            <Heart className="h-16 w-16 text-white" />
          </div>
          <h1 className="text-5xl font-extrabold mt-4 drop-shadow-lg">
            HeartMatch 💖
          </h1>
          <p className="text-lg mt-4 max-w-md font-medium animate-fadeIn">
            "Where every heartbeat finds its rhythm. Discover connections that
            last forever!"
          </p>
          <div className="flex gap-2 mt-6 text-xl font-semibold">
            <Sparkles className="h-6 w-6 animate-pulse" />
            <span>Love Awaits You!</span>
            <Smile className="h-6 w-6 animate-pulse" />
          </div>
          <p className="mt-2 max-w-md text-md italic opacity-90">
            "Thousands of love stories begin here. Start yours today!" ✨
          </p>
        </div>

        {/* Right Section - Login Form (Full Height & Width) */}
        <div className="flex-1 flex flex-col justify-center items-center px-6 h-full">
          <h2 className="text-3xl font-bold text-rose-600">Welcome Back!</h2>
          <p className="text-gray-600 mt-2 text-center">
            Sign in to continue your journey. 💕
            {/* By signing up, you’ll get access to exclusive matches, premium
            features, and start your love journey today! 💘 */}
          </p>

          <form
            onSubmit={handleSubmit}
            className="w-full max-w-sm mt-6 space-y-4"
          >
            <div>
              <Label className="block text-sm mb-1 font-medium text-gray-700">
                Email
              </Label>
              <input
                type="email"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-rose-500  border-rose-500 focus:border-rose-500 bg-white shadow-md ${
                  errors.name ? "border-red-500" : "outline-rose-500"
                }`}
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className={`w-full px-4 py-2 border rounded-lg  border-rose-500 focus:ring-rose-500 bg-white focus:border-rose-500 shadow-md ${
                  errors.name ? "border-red-500" : "outline-rose-500"
                }`}
                placeholder="Enter your password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {/* Toggle Button for Password Visibility */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 top-5 right-3 flex items-center text-gray-500 hover:text-rose-500"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}

            <Button
              type="submit"
              className="w-full  bg-rose-500 text-white py-5 rounded-lg font-semibold hover:bg-rose-600 transition shadow-md"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="text-lg animate-spin" />
              ) : (
                "Log In"
              )}
            </Button>
          </form>

          {/* Extra Details Below Sign-Up Link */}
          <div className="mt-6 text-center text-sm text-gray-600 max-w-xs">
            <p>
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-rose-500 font-semibold hover:underline"
              >
                Sign Up
              </Link>
            </p>
            <p className="mt-2 text-gray-500 text-xs">
              By signing up, you’ll get access to exclusive matches, premium
              features, and start your love journey today! 💘
            </p>
            <p className="mt-1 text-gray-500 italic text-xs">
              "Your soulmate might be just a click away!"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
