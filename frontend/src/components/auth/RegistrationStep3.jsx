import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";

const RegistrationStep3 = ({ formData, updateFormData, onPrev }) => {
  const [errors, setErrors] = useState({});
  const { registerUser, isLoading } = useAuthStore();

  const navigate = useNavigate();

  const validate = () => {
    let newErrors = {};
    if (!formData.gender) {
      newErrors.gender = "Please select your gender.";
    }
    if (!formData.preferredGender) {
      newErrors.preferredGender = "Please select what you are looking for.";
    }
    if (!formData.birthdate) {
      newErrors.birthdate = "Please enter your date of birth.";
    } else {
      const age =
        new Date().getFullYear() - new Date(formData.birthdate).getFullYear();
      if (age < 18) {
        newErrors.birthdate = "You must be at least 18 years old.";
      }
    }
    if (!formData.location) {
      newErrors.location = "Please enter your location.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      registerUser(formData, navigate);
    }
  };

  const handleChange = (field, value) => {
    updateFormData({ [field]: value });

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (value.trim()) delete newErrors[field];
      return newErrors;
    });
  };

  return (
    <div className="max-w-full mx-auto p-6 bg-white rounded-lg  space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-rose-500 mb-1">
          Finalize Your Profile
        </h2>
        <p className="text-sm text-gray-600">
          Please provide a few more details to complete your profile and help us
          find the best matches for you!
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <div className="space-y-2">
          <Label htmlFor="location">location</Label>
          <Input
            id="location"
            type="text"
            placeholder="Enter your location"
            value={formData.location}
            onChange={(e) => handleChange("location", e.target.value)}
            className="border-rose-300 focus:border-rose-500 focus:ring-rose-500"
          />
          {errors.location && (
            <p className="text-xs text-red-500">{errors.location}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Select
            value={formData.gender}
            onValueChange={(value) => handleChange("gender", value)}
          >
            <SelectTrigger
              id="gender"
              className="border-rose-300 focus:border-rose-500 focus:ring-rose-500"
            >
              <SelectValue placeholder="Select your gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="non-binary">Non-binary</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.gender && (
            <p className="text-xs text-red-500">{errors.gender}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lookingFor">Looking For</Label>
          <Select
            value={formData.preferredGender}
            onValueChange={(value) => handleChange("preferredGender", value)}
          >
            <SelectTrigger
              id="preferredGender"
              className="border-rose-300 focus:border-rose-500 focus:ring-rose-500"
            >
              <SelectValue placeholder="I am interested in" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="men">Men</SelectItem>
              <SelectItem value="women">Women</SelectItem>
              <SelectItem value="everyone">Everyone</SelectItem>
            </SelectContent>
          </Select>
          {errors.preferredGender && (
            <p className="text-xs text-red-500">{errors.lookingFor}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="birthdate">Date of Birth</Label>
          <Input
            id="birthdate"
            type="date"
            value={formData.birthdate}
            onChange={(e) => handleChange("birthdate", e.target.value)}
            className="border-rose-300 focus:border-rose-500 focus:ring-rose-500"
          />
          {errors.birthdate && (
            <p className="text-xs text-red-500">{errors.birthdate}</p>
          )}
          <p className="text-xs text-rose-500">
            You must be at least 18 years old to register
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onPrev}
            className="flex-1 border-rose-500 text-rose-500 hover:bg-rose-100"
          >
            Back
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center"
          >
            {isLoading ? (
              <Loader className="text-lg animate-spin" />
            ) : (
              "Complete Registration"
            )}
          </Button>
        </div>
      </form>

      <div className="text-center text-sm text-gray-500">
        <p>
          Almost there! Just a few more steps and you'll be ready to start
          connecting.
        </p>
      </div>
    </div>
  );
};

export default RegistrationStep3;
