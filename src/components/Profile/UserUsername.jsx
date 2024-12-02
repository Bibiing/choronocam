import React from "react";

const UserUsername = ({
  userData,
  usernameState,
  setUsernameState,
  handleUpdateUsername,
}) => {
  return (
    <>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between">
        <label className="text-black text-lg sm:text-xl font-bold mb-2 sm:mb-0 sm:w-1/4">
          Username :
        </label>

        {usernameState.isEditing ? (
          <div className="flex flex-col sm:flex-row items-center w-full sm:w-3/4 space-y-2 sm:space-y-0 sm:space-x-2">
            <input
              type="text"
              value={usernameState.newUsername}
              onChange={(e) =>
                setUsernameState((prev) => ({
                  ...prev,
                  newUsername: e.target.value,
                }))
              }
              className="bg-white border border-black p-2 rounded w-full"
            />
            <div className="flex space-x-2 w-full sm:w-auto">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded flex-1 sm:flex-none"
                onClick={handleUpdateUsername}
              >
                Save
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded flex-1 sm:flex-none"
                onClick={() =>
                  setUsernameState((prev) => ({
                    ...prev,
                    isEditing: false,
                  }))
                }
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center w-full sm:w-3/4 justify-between">
            <span className="text-black text-base sm:text-lg flex-grow">
              {userData.username}
            </span>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() =>
                setUsernameState((prev) => ({
                  ...prev,
                  isEditing: true,
                  newUsername: userData.username,
                }))
              }
            >
              Edit
            </button>
          </div>
        )}
      </div>

      {/* Username Message */}
      {usernameState.message && (
        <p className="text-green-500 text-sm sm:text-base mb-4">
          {usernameState.message}
        </p>
      )}
      {usernameState.error && (
        <p className="text-red-500 text-sm sm:text-base mb-4">
          {usernameState.error}
        </p>
      )}
    </>
  );
};

export default UserUsername;
