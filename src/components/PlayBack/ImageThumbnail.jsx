const ImageThumbnail = ({ image, onClick }) => {
  return (
    <div
      className="bg-white cursor-pointer flex flex-col items-center space-y-2 p-2 rounded-lg"
      onClick={onClick}
    >
      <div className="w-full">
        <img
          src={image.url}
          alt="Thumbnail"
          className="h-60 w-full rounded-lg object-cover object-center"
        />
      </div>
      <p className="text-sm text-gray-500 text-center w-full">
        {image.date} {image.time}
      </p>
    </div>
  );
};

export default ImageThumbnail;
