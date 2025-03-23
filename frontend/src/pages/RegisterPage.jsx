import RegisterForm from "@/components/auth/RegisterForm";
import { Eye, EyeOff, Heart, Loader, Smile, Sparkles } from "lucide-react";
import React, { useState } from "react";
import ProgressBar from "@/components/auth/ProgressBar";
import RegistrationStep2Props from "@/components/auth/RegistrationStep2Props";
import RegistrationStep3 from "@/components/auth/RegistrationStep3";

const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profileImage: null,
    bio: "",
    gender: "",
    preferredGender: "",
    birthdate: "",
    location: "",
  });

  const updateFormData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-50">
      <div className="w-[90%] h-[90vh] flex shadow-lg bg-white rounded-3xl overflow-hidden border border-rose-300 shadow-rose-400">
        <div className="hidden md:flex flex-1 flex-col justify-center items-center text-center p-8 bg-gradient-to-br from-rose-400 to-pink-300 text-white shadow-md shadow-rose-300 h-full">
          <div className="animate-bounce">
            <Heart className="h-16 w-16 text-white" />
          </div>
          <h1 className="text-5xl font-extrabold mt-4 drop-shadow-lg">
            HeartMatch 💖
          </h1>
          <p className="text-lg mt-4 max-w-md font-medium animate-fadeIn">
            "Find your perfect match and start your love story today!"
          </p>
          <div className="flex gap-2 mt-6 text-xl font-semibold">
            <Sparkles className="h-6 w-6 animate-pulse" />
            <span>Join & Discover Love!</span>
            <Smile className="h-6 w-6 animate-pulse" />
          </div>
          <p className="mt-2 max-w-md text-md italic opacity-90">
            "The journey of love starts with a single sign-up!" ✨
          </p>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center px-6">
          <ProgressBar currentStep={step} totalSteps={3} />
          <div className="mt-6">
            {step === 1 && (
              <RegisterForm
                formData={formData}
                updateFormData={updateFormData}
                onNext={nextStep}
              />
            )}
            {step === 2 && (
              <RegistrationStep2Props
                formData={formData}
                updateFormData={updateFormData}
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}
            {step === 3 && (
              <RegistrationStep3
                formData={formData}
                updateFormData={updateFormData}
                onPrev={prevStep}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
