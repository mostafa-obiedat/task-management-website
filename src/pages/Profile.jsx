import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { database, ref, set } from "../firebase/firebaseConfig";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newFullName, setNewFullName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newRole, setNewRole] = useState("");

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    if (storedUserData) {
      setUserData(storedUserData);
      setNewFullName(storedUserData.username || "");
      setNewPhone(storedUserData.phoneNumber || "");
      setNewRole(storedUserData.role || "");
    }
  }, []);

  const handleSaveChanges = () => {
    if (!newFullName || !/^[a-zA-Z ]+$/.test(newFullName)) {
      Swal.fire({
        title: "Invalid Name",
        text: "Please enter a valid full name!",
        icon: "error",
      });
      return;
    }

    if (!newPhone || !/^07\d{8}$/.test(newPhone)) {
      Swal.fire({
        title: "Invalid Phone",
        text: "Phone number must be 10 digits and start with 07!",
        icon: "error",
      });
      return;
    }

    if (userData?.uid) {
      try {
        const userRef = ref(database, `users/${userData.uid}`);
        set(userRef, {
          username: newFullName,
          phoneNumber: newPhone,
          email: userData.email,
          role: newRole,
        });

        userData.username = newFullName;
        userData.phoneNumber = newPhone;
        userData.role = newRole;
        localStorage.setItem("userData", JSON.stringify(userData));

        Swal.fire({
          title: "Profile Updated",
          text: "Your changes have been saved successfully.",
          icon: "success",
        }).then(() => {
          setIsEditing(false);
          setUserData({ ...userData });
        });
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Failed to update profile. Please try again later.",
          icon: "error",
        });
        console.error("Update Error:", error);
      }
    } else {
      Swal.fire({
        title: "Error",
        text: "User ID is missing. Please log in again.",
        icon: "error",
      });
    }
  };

  if (!userData) return <p>Loading...</p>;

  return (
    <div className="max-w-lg mx-auto my-10 p-6 bg-white shadow-xl rounded-lg">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-6 rounded-t-lg text-center relative">
        <img
          src="https://www.w3schools.com/howto/img_avatar.png"
          alt="User Profile"
          className="w-24 h-24 rounded-full mx-auto border-4 border-white -mt-12"
        />
      </div>

      {/* Personal Information */}
      <div className="p-6">
        <h5 className="text-2xl font-bold mb-6 text-purple-800">Personal Information</h5>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Full Name:</label>
          <input
            type="text"
            className="w-full mt-1 p-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-600"
            value={userData.username || "Full Name"}
            disabled
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email:</label>
          <input
            type="email"
            className="w-full mt-1 p-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-600"
            value={userData.email || "Email"}
            disabled
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Phone:</label>
          <input
            type="text"
            className="w-full mt-1 p-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-600"
            value={userData.phoneNumber || "Phone"}
            disabled
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Role:</label>
          <input
            type="text"
            className="w-full mt-1 p-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-600"
            value={userData.role || "Role"}
            disabled
          />
        </div>
      </div>

      {/* Account Settings */}
      <div className="p-6">
        <h5 className="text-2xl font-bold mb-6 text-purple-800">Account Settings</h5>
        <button
          className="bg-purple-700 hover:bg-purple-800 text-white py-2 px-4 rounded-lg shadow-md w-full transition duration-300 ease-in-out transform hover:scale-105"
          onClick={() => setIsEditing(true)}
        >
          Edit Profile
        </button>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h5 className="bg-purple-600 mb-8 text-white py-2 px-4 rounded-lg text-center text-xl font-bold">Edit Profile</h5>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Full Name:</label>
              <input
                type="text"
                className="w-full mt-1 p-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-600"
                value={newFullName}
                onChange={(e) => setNewFullName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Phone:</label>
              <input
                type="text"
                className="w-full mt-1 p-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-600"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
              />
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                onClick={() => setIsEditing(false)}
              >
                Close
              </button>
              <button
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;