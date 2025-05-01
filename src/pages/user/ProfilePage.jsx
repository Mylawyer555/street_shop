import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getUserProfile } from "../../services/userService"
import { toast } from "react-toastify";

export default function UserProfile() {
  const { logOut } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    region: "",
    role: "",
    profilePicture: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { user } = await getUserProfile();
        setProfileData({
          fullName: user.fullName || "",
          email: user.email || "",
          phone: user.phone || "",
          address: user.address || "",
          region: user.region || "",
          role: user.isAdmin ? "admin" : "user",
          profilePicture: user.profilePicture || "",
        });
      } catch (error) {
        toast.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // TODO: Save updated profile to backend
    toast.success("Profile saved successfully!");
    setIsEditing(false);
  };

  const handleLogout = () => {
    logOut();
  };

  if (loading) {
    return <div className="text-center mt-10 text-lg font-semibold">Loading profile...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10 relative">
      {/* Profile Banner */}
      <div className="relative h-48 bg-blue-500 rounded-lg overflow-hidden">
        <img
          src="/blueBackground.jpg"
          alt="Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Picture */}
      <div className="absolute top-24 left-1/2 transform -translate-x-1/2">
        <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg">
          <img
            src={profileData.profilePicture || "/default-avatar.png"}
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </div>

      {/* Profile Info */}
      <div className="pt-24 px-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">{profileData.fullName}</h2>
            <p className="text-gray-500">@{profileData.fullName?.split(" ")[0]?.toLowerCase()}</p>
            <p className="text-sm text-gray-500 capitalize">{profileData.role} | {profileData.region}</p>
          </div>
          <button
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {isEditing ? "Save" : "Edit Profile"}
          </button>
        </div>

        {/* Personal Info */}
        <div className="space-y-4">
          <div>
            <label className="block text-gray-600">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={profileData.fullName}
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
              disabled
              className="w-full p-2 border border-gray-300 rounded-md mt-1 bg-gray-100"
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
          <div>
            <label className="block text-gray-600">Address</label>
            <textarea
              name="address"
              value={profileData.address}
              onChange={handleInputChange}
              disabled={!isEditing}
              rows="3"
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

        {/* Logout */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
