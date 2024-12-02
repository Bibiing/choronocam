import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchUserData,
  updateUsername,
  updatePassword,
} from "../utils/ProfileAPI";

export const useProfile = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  // User data state
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: null,
  });

  // Username editing states
  const [usernameState, setUsernameState] = useState({
    isEditing: false,
    newUsername: "",
    message: "",
    error: "",
  });

  // Password editing states
  const [passwordState, setPasswordState] = useState({
    currentPassword: "",
    newPassword: "",
    message: "",
    error: "",
  });

  // Fetch user data
  useEffect(() => {
    const loadUserData = async () => {
      if (!userId) {
        navigate("/login");
        return;
      }

      try {
        const data = await fetchUserData(userId);
        setUserData({
          username: data.username || "",
          email: data.email || "",
          password: data.password || null,
        });
      } catch (err) {
        console.error("Error fetching user data:", err);
        navigate("/login");
      }
    };

    loadUserData();
  }, [userId, navigate]);

  // Handle username update
  const handleUpdateUsername = async () => {
    if (!usernameState.newUsername.trim()) {
      setUsernameState((prev) => ({
        ...prev,
        error: "Username cannot be empty",
        message: "",
      }));
      return;
    }

    try {
      const updatedUser = await updateUsername(
        userId,
        usernameState.newUsername
      );

      setUserData((prev) => ({ ...prev, username: updatedUser.username }));
      setUsernameState((prev) => ({
        ...prev,
        message: "Username updated successfully!",
        error: "",
        isEditing: false,
      }));
    } catch (err) {
      setUsernameState((prev) => ({
        ...prev,
        error: err.message,
        message: "",
      }));
    }
  };

  // Handle password update
  const handleUpdatePassword = async () => {
    const { currentPassword, newPassword } = passwordState;

    if (!currentPassword.trim() || !newPassword.trim()) {
      setPasswordState((prev) => ({
        ...prev,
        error: "Both current and new passwords are required",
        message: "",
      }));
      return;
    }

    try {
      await updatePassword(userId, currentPassword, newPassword);

      setPasswordState({
        currentPassword: "",
        newPassword: "",
        message: "Password updated successfully!",
        error: "",
      });
    } catch (err) {
      setPasswordState((prev) => ({
        ...prev,
        error: err.message,
        message: "",
      }));
    }
  };

  return {
    userData,
    usernameState,
    passwordState,
    setUsernameState,
    setPasswordState,
    handleUpdateUsername,
    handleUpdatePassword,
  };
};
