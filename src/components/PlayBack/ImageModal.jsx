const ImageModal = ({ image, closeModal }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
      onClick={closeModal}
    >
      <div
        className="bg-white rounded-lg p-4 max-w-md w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image.url}
          alt="Large view"
          className="w-full h-auto rounded-md"
        />
        <p className="mt-4 text-center text-gray-700">{image.username}</p>
        <p className="text-center text-gray-500 mt-2">
          {image.date} {image.time}
        </p>
      </div>
    </div>
  );
};

export default ImageModal;
