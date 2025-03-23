import React, { useState } from "react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Upload, X } from "lucide-react";
import { Input } from "../ui/input";

const RegistrationStep2Props = ({
  formData,
  updateFormData,
  onNext,
  onPrev,
}) => {
  const [previewUrl, setPreviewUrl] = useState(formData.profileImage || null);
  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);

  const uploadImageToCloudinary = async (file) => {
    if (!file) return null;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "profile_pictures");

    try {
      setUploading(true);
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/duzpoj27d/upload",
        { method: "POST", body: formData }
      );
      const data = await response.json();

      setUploading(false);

      return data.secure_url;
    } catch (error) {
      setUploading(false);
      console.error("Cloudinary Upload Error:", error);
      setErrors((prev) => ({
        ...prev,
        profileImage: "Failed to upload image. Try again.",
      }));
      return null;
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setErrors((prev) => ({ ...prev, profileImage: "" }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
      const uploadedImageUrl = await uploadImageToCloudinary(file);
      if (uploadedImageUrl) {
        updateFormData({ profileImage: uploadedImageUrl });
      }
    }
  };

  const removeImage = () => {
    updateFormData({ profileImage: null });
    setPreviewUrl(null);
  };

  const validate = () => {
    let newErrors = {};

    if (!previewUrl) newErrors.profileImage = "Profile picture is required.";
    if (!formData.bio?.trim() || formData.bio.length < 20)
      newErrors.bio = "Bio must be at least 20 characters long.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    updateFormData({ [field]: value });

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (value.trim()) delete newErrors[field];
      return newErrors;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onNext();
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Title and Description */}
      <h2 className="text-4xl font-extrabold text-rose-600 text-center">
        Complete Your Profile
      </h2>
      <p className="text-gray-600 mt-2 mb-2 text-center">
        A great profile helps you find your perfect match faster! 💖
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2 ">
          <Label className="hidden">Profile Picture</Label>
          <div className="flex flex-col items-center justify-center">
            {previewUrl ? (
              <div className="relative">
                <img
                  src={previewUrl || "/placeholder.svg"}
                  alt="Profile preview"
                  className="h-32 w-32 rounded-full object-cover border-2 border-rose-500 shadow-lg"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -right-2 -top-2 rounded-full bg-rose-500 p-1 text-white shadow"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <label
                htmlFor="profileImage"
                className="cursor-pointer flex h-32 w-32 flex-col items-center justify-center rounded-full border-2 border-dashed border-rose-500 bg-rose-100 p-4 text-center"
              >
                <Upload className="mb-2 h-6 w-6 text-rose-500" />
                <span className="text-xs text-rose-500">Upload photo</span>
              </label>
            )}
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            {errors.profileImage && (
              <p className="text-xs text-red-500">{errors.profileImage}</p>
            )}
            {uploading && (
              <p className="text-xs text-gray-500 mt-1">Uploading...</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            placeholder="Tell us about yourself..."
            value={formData.bio}
            onChange={(e) => handleChange("bio", e.target.value)}
            className="min-h-[120px] resize-none border-rose-300 focus:border-rose-500 outline-rose-500 focus:ring-rose-500"
          />
          {errors.bio && (
            <p className="text-xs -mt-2 text-red-500">{errors.bio}</p>
          )}
          <p className="text-xs text-rose-500">
            Share your interests, hobbies, and what you're looking for
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
            className={`flex-1 ${
              uploading ? "bg-gray-400" : "bg-rose-500 hover:bg-rose-600"
            } text-white`}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Continue"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationStep2Props;
