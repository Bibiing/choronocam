import { useEffect, useState } from "react";

export const useFetchImages = (userId, filters) => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      if (!userId) {
        console.log("No username provided. Skipping fetch.");
        return;
      }

      try {
        console.log("Fetching images with filters:", filters);
        const params = new URLSearchParams({ userId, ...filters }).toString();
        const response = await fetch(
          `http://localhost:8080/images/user-images?${params}`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        console.log(`Received ${data.length} images from server.`);
        setImages(data);
      } catch (error) {
        console.error("Error fetching images:", error);
        setError(error.message);
      }
    };

    fetchImages();
  }, [userId, filters]);

  return { images, error };
};
