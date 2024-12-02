import { useState } from "react";
import { useFetchImages } from "../../hooks/useFetchImages";
import ImageThumbnail from "./ImageThumbnail";
import ImageModal from "./ImageModal";

const Playback = () => {
  const [date, setDate] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");

  const [filters, setFilters] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(null);

  const userId = localStorage.getItem("userId");

  const { images, error } = useFetchImages(userId, filters);

  const handleSubmit = (e) => {
    e.preventDefault();

    setFilters({
      date,
      starttime: timeStart,
      endtime: timeEnd,
    });

    console.log("Filters applied:", { date, timeStart, timeEnd });
  };

  const openModal = (image) => {
    setActiveImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveImage(null);
  };

  return (
    <div className="bg-[#f8fbff] font-poppins min-h-screen flex flex-col items-center py-4 sm:py-8 px-4 sm:px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl flex flex-col space-y-4 sm:space-y-0 sm:flex-row justify-center sm:space-x-4 mb-6 sm:mb-8"
      >
        <div className="flex items-center space-x-2 pr-1">
          <label
            htmlFor="date"
            className="text-black whitespace-nowrap sm:mr-0 mr-14"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="rounded-md px-1 py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 flex-grow"
          />
        </div>

        <div className="flex items-center space-x-2 pr-1">
          <label
            htmlFor="timeStart"
            className="mr-3 sm:mr-0 text-black whitespace-nowrap"
          >
            Time Start
          </label>
          <input
            type="time"
            id="timeStart"
            name="timeStart"
            value={timeStart}
            onChange={(e) => setTimeStart(e.target.value)}
            className="rounded-md px-2 py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 flex-grow"
          />
        </div>

        <div className="flex items-center space-x-2 pr-1">
          <label
            htmlFor="timeEnd"
            className="text-black whitespace-nowrap mr-5 sm:mr-0"
          >
            Time End
          </label>
          <input
            type="time"
            id="timeEnd"
            name="timeEnd"
            value={timeEnd}
            onChange={(e) => setTimeEnd(e.target.value)}
            className="rounded-md px-2 py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 flex-grow"
          />
        </div>

        <button
          type="submit"
          className="bg-[#365486] text-white font-bold rounded-md px-4 py-2 hover:bg-[#2a4675] transition duration-300"
        >
          Submit
        </button>
      </form>

      <div className="w-full max-w-7xl h-[320px] sm:h-[480px] md:h-[580px] bg-[#f0faff] rounded-md shadow-md mb-8 overflow-y-auto">
        <div className="p-2 sm:p-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 lg:gap-4">
          {error && (
            <p className="col-span-full text-red-500">Error: {error}</p>
          )}
          {images.length === 0 && !error && (
            <p className="col-span-full text-center text-gray-500">
              No images found
            </p>
          )}
          {images.map((image, index) => (
            <ImageThumbnail
              key={index}
              image={image}
              onClick={() => openModal(image)}
            />
          ))}
        </div>
      </div>

      {isModalOpen && activeImage && (
        <ImageModal image={activeImage} closeModal={closeModal} />
      )}
    </div>
  );
};

export default Playback;
