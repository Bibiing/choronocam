import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UsernameSection from "../components/Profile/UserUsername";
import EmailSection from "../components/Profile/UserEmail";
import PasswordSection from "../components/Profile/UserPassword";
import { useProfile } from "../hooks/useProfil";

const ProfilePage = () => {
  const {
    userData,
    usernameState,
    passwordState,
    setUsernameState,
    setPasswordState,
    handleUpdateUsername,
    handleUpdatePassword,
  } = useProfile();

  return (
    <div className="flex flex-col h-[100vh] font-poppins">
      <Header />
      <main className="flex-grow container max-w-5xl mx-auto px-4 flex items-center justify-center">
        <div className="w-full max-w-sm sm:max-w-lg md:max-w-2xl">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#365486] font-bold text-center mt-20 md:mt-28 lg:mt-26  mb-4 md:mb-8">
            Your Profile
          </h1>

          <div className="bg-[#f0f9ff] shadow-lg rounded-lg p-6 md:p-8">
            <div className="space-y-2 md:space-y-6">
              <UsernameSection
                userData={userData}
                usernameState={usernameState}
                setUsernameState={setUsernameState}
                handleUpdateUsername={handleUpdateUsername}
              />

              <div className="border-gray-200">
                <EmailSection email={userData.email} />
              </div>

              <div className="border-gray-200">
                <PasswordSection
                  passwordState={passwordState}
                  setPasswordState={setPasswordState}
                  handleUpdatePassword={handleUpdatePassword}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
