// components/ProductUploadForm.js
import React, { useState } from 'react';

const ProductUploadForm = () => {
  const [prodName, setProdName] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setImages(selectedImages);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to send to the API
    const formData = new FormData();
    formData.append('prodName', prodName);
    formData.append('description', description);

    images.forEach((image) => {
      formData.append('images', image);
    });

    try {
      // Send a POST request to your API route
      const response = await fetch('/api/product/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.status === 201) {
        // Product uploaded successfully, handle the response as needed
        console.log('Product uploaded successfully');
      } else {
        // Handle errors
        console.error('Error uploading product:', response.statusText);
      }
    } catch (error) {
      console.error('Error uploading product:', error);
    }
  };

  return (
    <div>
      <h1>Upload a Product</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <input
            type="text"
            placeholder="Product Name"
            name="prodName"
            value={prodName}
            onChange={(e) => setProdName(e.target.value)}
            required
          />
        </div>
        <div>
          <textarea
            placeholder="Product Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            required
          />
        </div>
        <button type="submit">Upload Product</button>
      </form>
    </div>
  );
};

export default ProductUploadForm;
