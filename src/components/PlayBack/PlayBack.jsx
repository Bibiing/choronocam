import { useState } from "react";
import { useFetchImages } from "../../hooks/useFetchImages";
import ImageThumbnail from "./ImageThumbnail";
import ImageModal from "./ImageModal";
import ImageList from "./imageList"; // Pastikan ImageList diimport dengan benar

const Playback = () => {
  const [date, setDate] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [filters, setFilters] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // State untuk mode tampilan

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

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  return (
    <div className="bg-[#f8fbff] font-poppins min-h-screen flex flex-col items-center py-4 sm:py-8 px-4 sm:px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl flex flex-col space-y-4 sm:space-y-0 sm:flex-row justify-center sm:space-x-4 mb-6 sm:mb-8"
      >
        {/* Formulir Filter */}
        <div className="flex items-center space-x-2 pr-1">
          <label htmlFor="date" className="text-black whitespace-nowrap sm:mr-0 mr-14">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="rounded-md px-1 py-2 border border-black shadow-sm focus:ring-blue-500 focus:border-blue-500 flex-grow"
          />
        </div>

        <div className="flex items-center space-x-2 pr-1">
          <label htmlFor="timeStart" className="mr-3 sm:mr-0 text-black whitespace-nowrap">
            Time Start
          </label>
          <input
            type="time"
            id="timeStart"
            name="timeStart"
            value={timeStart}
            onChange={(e) => setTimeStart(e.target.value)}
            className="rounded-md px-2 py-2 border border-black shadow-sm focus:ring-blue-500 focus:border-blue-500 flex-grow"
          />
        </div>

        <div className="flex items-center space-x-2 pr-1">
          <label htmlFor="timeEnd" className="text-black whitespace-nowrap mr-5 sm:mr-0">
            Time End
          </label>
          <input
            type="time"
            id="timeEnd"
            name="timeEnd"
            value={timeEnd}
            onChange={(e) => setTimeEnd(e.target.value)}
            className="rounded-md px-2 py-2 border border-black shadow-sm focus:ring-blue-500 focus:border-blue-500 flex-grow"
          />
        </div>

        <button
          type="submit"
          className="bg-[#365486] text-white font-bold rounded-md px-4 py-2 hover:bg-[#2a4675] transition duration-300"
        >
          Submit
        </button>
      </form>

      {/* Tombol untuk memilih tampilan List atau Grid */}
      <div className="items-start w-full max-w-7xl mb-8 overflow-y-auto mx-auto pl-2 ">
        <button
          onClick={() => handleViewModeChange("list")}
          className={`p-2 rounded-md ${viewMode === "list" ? "bg-[#2a4675]" : "bg-[#e0e0e0]"}`}
        >
          <img src="./src/assets/list.svg" alt="List View" width="30" />
        </button>
        <button
          onClick={() => handleViewModeChange("grid")}
          className={`p-2 rounded-md ${viewMode === "grid" ? "bg-[#2a4675]" : "bg-[#e0e0e0]"}`}
        >
          <img src="./src/assets/grid.svg" alt="Grid View" width="30" />
        </button>
      </div>

      {/* Gambar Ditampilkan Berdasarkan Mode Tampilan */}
      <div className="w-full max-w-7xl h-[320px] sm:h-[480px] md:h-[580px] bg-[#f0faff] rounded-md shadow-md mb-8 ">
        <div className="p-4">
          {/* Header yang menampilkan Image, Date, Time hanya pada mode List */}
          {viewMode === "list" && (
            <div className="overflow-x-auto h-[320px] sm:h-[480px] md:h-[550px]">
              <table className="min-w-full table-auto border-collapse ">
                <thead className="sticky top-0 bg-gray-20 shadow-md z-10">
                  <tr>
                    <th className="border border-black p-2 bg-gray-200 text-center">Image</th>
                    <th className="border border-black p-2 bg-gray-200 text-center">Date</th>
                    <th className="border border-black p-2 bg-gray-200 text-center">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {images.map((image, index) => (
                    <tr key={index} className="border-b">
                      <td className="border border-black p-2">
                        <ImageList image={image} onClick={() => openModal(image)} />
                      </td>
                      <td className="border border-black p-2 text-center">{image.date}</td>
                      <td className="border border-black p-2 text-center">{image.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Menampilkan komponen gambar berdasarkan mode */}
          <div className={viewMode === "grid" ? "grid grid-cols-3 gap-4" : ""}>
            {error && <p className="col-span-full text-red-500">Error: {error}</p>}
            {images.length === 0 && !error && (
              <p className="col-span-full text-center text-gray-500">No images found</p>
            )}
            {viewMode === "grid" ? (
              images.map((image, index) => (
                <div key={index} className="flex justify-center">
                  <ImageThumbnail image={image} onClick={() => openModal(image)} />
                </div>
              ))
            ) : null}
          </div>
        </div>
      </div>

      {isModalOpen && activeImage && <ImageModal image={activeImage} closeModal={closeModal} />}
    </div>
  );
};

export default Playback;
