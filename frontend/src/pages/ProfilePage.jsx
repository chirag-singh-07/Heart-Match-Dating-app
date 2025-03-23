import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/authStore";
import { useProfileStore } from "@/store/userStore";
import {
  Cake,
  Calendar,
  Heart,
  Mail,
  MapPin,
  Pencil,
  User,
} from "lucide-react";
import React, { useState } from "react";

const ProfilePage = () => {
  const { user } = useAuthStore();
  const { updateUserProfile } = useProfileStore();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    location: user?.location || "",
    bio: user?.bio || "",
    gender: user?.gender || "",
    preferredGender: user?.preferredGender || "",
    birthdate: user?.birthdate || "",
    interests: user?.interests || [],
    profileImage: user?.profileImage || "",
  });

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInterestChange = (e) => {
    const { value } = e.target;
    const interests = value.split(",").map((int) => int.trim());
    setFormData((prev) => ({
      ...prev,
      interests,
    }));
  };

  const handleSave = async () => {
    try {
      await updateUserProfile(formData);
      // toast.success("Profile updated successfully!");
      setEditing(false);
    } catch (error) {
      // toast.error("Failed to update profile");
      console.error("Error updating profile:", error);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "profile_pictures");
    try {
      setLoading(true);
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/duzpoj27d/upload",
        { method: "POST", body: formData }
      );
      const data = await response.json();
      if (data.secure_url) {
        setFormData((prev) => ({
          ...prev,
          profileImage: data.secure_url, // ✅ Update profile image URL
        }));
      }

      setLoading(false);

      return data.secure_url;
    } catch (error) {
      setLoading(false);
      console.error("Cloudinary Upload Error:", error);
      return null;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-rose-600 mb-6">Profile Page 💖</h1>

      <div className="bg-white shadow-lg rounded-xl border border-gray-200 p-6 flex gap-8 max-w-4xl mx-auto h-[600px] overflow-hidden">
        {/* Left Side - Profile Image */}
        <div className="w-1/3 h-full">
          <img
            src={user?.profileImage || "/default-avatar.png"}
            alt="Profile"
            className="w-full h-[90%] object-cover rounded-md border-4 border-rose-400 shadow-md"
          />

          {/* Buttons Container */}
          <div className="mt-3 flex gap-3 h-auto w-auto">
            {/* Change Photo Button */}
            {/* <button className="bg-rose-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-rose-600 transition w-full">
              <Pencil className="w-4 h-4 inline mr-1" />
              Photo
            </button> */}
            <label className="bg-rose-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-rose-600 transition w-full cursor-pointer flex items-center ">
              <Pencil className="w-4 h-4 inline mr-1" />
              {loading ? "Uploading" : "Photo"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>

            {/* Edit/Save Button */}
            {editing ? (
              <button
                onClick={handleSave}
                className="bg-gray-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-600 transition w-full"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-600 transition w-full"
              >
                Edit
              </button>
            )}
          </div>
        </div>

        {/* Right Side - User Details */}
        <div className="w-2/3 space-y-4">
          {/* Name */}
          <div>
            <label className="text-gray-600 font-semibold">Name:</label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-rose-500" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border border-gray-300 pl-10 pr-4 py-2 rounded-md w-full bg-white"
                disabled={!editing}
              />
            </div>
          </div>

          {/* Gender & Preferred Gender */}
          <div className="grid grid-cols-2 gap-4">
            {/* Gender */}
            <div>
              <label className="text-gray-600 font-semibold">Gender:</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="border border-gray-300 pl-3 pr-4 py-2 rounded-md w-full bg-white"
                disabled={!editing}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-Binary</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Preferred Gender */}
            <div>
              <label className="text-gray-600 font-semibold">
                Looking for:
              </label>
              <select
                name="preferredGender"
                value={formData.preferredGender}
                onChange={handleChange}
                className="border border-gray-300 pl-3 pr-4 py-2 rounded-md w-full bg-white"
                disabled={!editing}
              >
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="everyone">Everyone</option>
                <option value="any">Any</option>
              </select>
            </div>
          </div>

          {/* Location & Birthdate */}
          <div className="grid grid-cols-2 gap-4">
            {/* Location */}
            <div>
              <label className="text-gray-600 font-semibold">Location:</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-rose-500" />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="border border-gray-300 pl-10 pr-4 py-2 rounded-md w-full bg-white"
                  disabled={!editing}
                />
              </div>
            </div>

            {/* Birthdate */}
            <div>
              <label className="text-gray-600 font-semibold">Birthdate:</label>
              <div className="relative">
                <Cake className="absolute left-3 top-3 w-5 h-5 text-rose-500" />
                <input
                  type="date"
                  name="birthdate"
                  value={formData.birthdate}
                  onChange={handleChange}
                  className="border border-gray-300 pl-10 pr-4 py-2 rounded-md w-full bg-white"
                  disabled={!editing}
                />
              </div>
            </div>
          </div>

          {/* Interests */}
          <div>
            <label className="text-gray-600 font-semibold">Interests:</label>
            <input
              type="text"
              value={formData.interests.join(", ")}
              onChange={handleInterestChange}
              className="border border-gray-300 pl-4 pr-4 py-2 rounded-md w-full bg-white"
              disabled={!editing}
            />
          </div>

          {/* Bio */}
          <div>
            <label className="text-gray-600 font-semibold">Biography:</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="border border-gray-300 pl-4 pr-4 py-2 rounded-md w-full h-24 bg-white"
              disabled={!editing}
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-gray-600 font-semibold">Email:</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-rose-500" />
              <input
                type="email"
                value={user?.email}
                disabled
                className="border  border-gray-300 pl-10 pr-4 py-2 rounded-md w-full bg-gray-100 text-gray-700 cursor-not-allowed"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
