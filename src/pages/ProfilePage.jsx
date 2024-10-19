import React, { useState, useEffect } from "react";
//import axios from "axios";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    skills: "",
    experience: "",
    location: "",
  });
  const [message, setMessage] = useState("");

  // Fetch the user profile data on component mount
  /**useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // Assume the token is stored in localStorage after login
        const res = await axios.get("/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(res.data);
      } catch (error) {
        console.error("Error fetching profile", error);
      }
    };
    fetchProfile();
  }, []); **/

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put("/api/profile", profile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile", error);
      setMessage("Failed to update profile");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Update Profile</h2>
        {message && <p className="text-center text-green-600 mb-4">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
              Skills
            </label>
            <input
              type="text"
              id="skills"
              name="skills"
              value={profile.skills}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your skills"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
              Experience
            </label>
            <textarea
              id="experience"
              name="experience"
              value={profile.experience}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Describe your experience"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Preferred Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={profile.location}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your preferred location"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
