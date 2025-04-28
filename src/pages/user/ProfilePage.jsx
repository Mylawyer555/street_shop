import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function UserProfile() {
  const { user, logOut } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    region: user?.region || "",
    role: user?.role || "",
    profilePicture: user?.profilePicture || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleSave = () => {
    // Save logic (e.g., API call to update the user's profile)
    console.log("Profile saved:", profileData);
    setIsEditing(false);
  };

  const handleLogout = () => {
    logOut();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      {/* Profile Banner */}
      <div className="relative h-48 bg-blue-500 rounded-lg">
        <img
          src={profileData.profileBanner || "/default-banner.jpg"}
          alt="Profile Banner"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Profile Picture */}
      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
        <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg">
          <img
            src={profileData.profilePicture || "/default-avatar.png"}
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </div>

      {/* Profile Information */}
      <div className="pt-24 px-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">{profileData.name}</h2>
            <p className="text-lg text-gray-600">@{profileData.name.split(" ")[0].toLowerCase()}</p>
            <p className="text-sm text-gray-500">{profileData.role} | {profileData.region}</p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {isEditing ? "Save" : "Edit Profile"}
          </button>
        </div>

        {/* Personal Info Section */}
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-700">Personal Information</h3>
            <div className="space-y-2 mt-2">
              <div>
                <label className="block text-gray-600">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full p-2 border border-gray-300 rounded-md mt-1"
                />
              </div>
              <div>
                <label className="block text-gray-600">Email</label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  disabled
                  className="w-full p-2 border border-gray-300 rounded-md mt-1"
                />
              </div>
              <div>
                <label className="block text-gray-600">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full p-2 border border-gray-300 rounded-md mt-1"
                />
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700">Address</h3>
            <textarea
              name="address"
              value={profileData.address}
              onChange={handleInputChange}
              disabled={!isEditing}
              rows="4"
              className="w-full p-2 border border-gray-300 rounded-md mt-2"
            />
          </div>

          {/* Role & Region Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700">Role & Region</h3>
            <div className="space-y-2 mt-2">
              <div>
                <label className="block text-gray-600">Role</label>
                <input
                  type="text"
                  name="role"
                  value={profileData.role}
                  onChange={handleInputChange}
                  disabled
                  className="w-full p-2 border border-gray-300 rounded-md mt-1"
                />
              </div>
              <div>
                <label className="block text-gray-600">Region</label>
                <input
                  type="text"
                  name="region"
                  value={profileData.region}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full p-2 border border-gray-300 rounded-md mt-1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
