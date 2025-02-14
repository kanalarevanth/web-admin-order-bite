// ImageUpload.js
import React, { useState } from "react";

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle file selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!image) {
      setMessage("Please select an image to upload.");
      return;
    }

    setUploading(true);
    setMessage("");

    // Create FormData to send the file
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:3006/v1/recipe", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setUploading(false);
        setMessage("Image uploaded successfully!");
        console.log("Server response:", data); // This will log the server response
      } else {
        setUploading(false);
        setMessage("Error uploading image.");
      }
    } catch (error) {
      setUploading(false);
      setMessage("Error uploading image.");
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <h1>Upload Image</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
        <button type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default ImageUpload;
