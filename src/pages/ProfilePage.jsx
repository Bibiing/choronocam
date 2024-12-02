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
    <div className="mx-auto font-poppins">
      <Header />
      <main className="mt-[120px] container max-w-5xl mx-auto px-4 py-8 flex-grow">
        <div className="w-full px-4 py-10 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl text-[#365486] font-bold text-center mb-8">
              Your Profile
            </h1>

            <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 md:p-8">
              <UsernameSection
                userData={userData}
                usernameState={usernameState}
                setUsernameState={setUsernameState}
                handleUpdateUsername={handleUpdateUsername}
              />

              <EmailSection email={userData.email} />

              <PasswordSection
                passwordState={passwordState}
                setPasswordState={setPasswordState}
                handleUpdatePassword={handleUpdatePassword}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
