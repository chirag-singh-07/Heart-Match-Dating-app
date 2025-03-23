import React, { useState } from "react";
import { Eye, EyeOff, Loader } from "lucide-react";
import { Link } from "react-router-dom";

const RegisterForm = ({ formData, updateFormData, onNext }) => {
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Full name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password || formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters long";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) onNext(); // Proceed to next step
  };

  const handleChange = (field, value) => {
    updateFormData({ [field]: value });

    // Remove error dynamically when the user enters valid input
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (value.trim()) delete newErrors[field];
      if (field === "password" && value.length >= 6) delete newErrors.password;
      return newErrors;
    });
  };

  return (
    <div className="w-full flex flex-col items-center space-y-14">
      <div className="text-center">
        <h2 className="text-4xl font-extrabold text-rose-600">
          Create an Account
        </h2>
        <p className="text-gray-600 mt-2">Start your love journey today. 💕</p>
      </div>
      <form onSubmit={handleSubmit} className="w-full max-w-sm mt-6 space-y-4">
        <div>
          <input
            type="text"
            name="name"
            className={`w-full px-4 py-2 border rounded-lg  border-rose-500 focus:ring-rose-500 bg-white ${
              errors.name ? "border-red-500" : "outline-rose-500"
            }`}
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
        </div>

        <div>
          <input
            type="email"
            name="email"
            className={`w-full px-4 py-2 border  border-rose-500 rounded-lg focus:ring-rose-500 bg-white ${
              errors.name ? "border-red-500" : "outline-rose-500"
            }`}
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email}</p>
          )}
        </div>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className={`w-full px-4 py-2 border rounded-lg border-rose-500 focus:ring-rose-500 bg-white ${
              errors.name ? "border-red-500" : "outline-rose-500"
            }`}
            placeholder="Password"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2 text-gray-500"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-xs">{errors.password}</p>
        )}

        <button
          type="submit"
          className="w-full bg-rose-500 text-white py-2 rounded-lg font-semibold hover:bg-rose-600 transition"
        >
          Next
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600 max-w-xs animate-fadeIn">
        <p>
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-rose-500 font-semibold hover:underline"
          >
            Log In
          </Link>
        </p>
        <p className="mt-3 text-gray-500 text-xs">
          Creating an account allows you to unlock premium features & find your
          perfect match!
        </p>
        <p className="mt-1 text-gray-500 italic text-xs">
          "Your soulmate is just one step away!" 💞
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
