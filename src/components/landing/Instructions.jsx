const CCTVInstructions = () => {
  return (
    <div className="mt-12 bg-white shadow rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-4">How to Check Your CCTV</h2>
      <ol className="list-decimal list-inside space-y-2 text-gray-700">
        <li>Log in to your account to save your data.</li>
        <li>
          If you want to update your database, upload the image on this page.
        </li>
        <li>If you want to find your CCTV image, go to the playback page.</li>
        <li>Use the filtering feature to set the date and time.</li>
        <li>The image for the specified date and time will be displayed.</li>
      </ol>
    </div>
  );
};

export default CCTVInstructions;
