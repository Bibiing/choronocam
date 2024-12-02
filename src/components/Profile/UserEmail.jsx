import React from "react";

const UserEmail = ({ email }) => (
  <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between">
    <label className="text-black text-lg sm:text-xl font-bold mb-2 sm:mb-0 sm:w-1/4">
      Email :
    </label>
    <div className="text-black text-base sm:text-lg sm:w-3/4"> {email}</div>
  </div>
);

export default UserEmail;
