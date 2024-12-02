const FAQ = () => {
  return (
    <div className="mt-12 bg-white shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-4">
        Frequently Asked Questions (FAQ)
      </h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold">
            Why is my image not showing up after uploading?
          </h3>
          <p className="text-gray-700">
            Ensure the file size does not exceed 1GB and is in a supported
            format (JPEG/PNG).
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Can I upload multiple images?</h3>
          <p className="text-gray-700">
            Currently, the system supports one file upload at a time.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">
            How long does it take for the uploaded images to be available for
            playback?
          </h3>
          <p className="text-gray-700">
            Uploaded images should appear in the playback section immediately.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">
            What should I do if I encounter an error while uploading?
          </h3>
          <p className="text-gray-700">
            Please check your internet connection and try again. If the problem
            persists, contact support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
