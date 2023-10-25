import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

function ImageUpload() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [productSlug, setProductSlug] = useState('');
  const router = useRouter();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleProductSlugChange = (e) => {
    const slug = e.target.value;
    setProductSlug(slug);
  };

  const handleUpload = async () => {
    if (!selectedImage || !productSlug) {
      alert('Please select an image and enter a product slug');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await fetch(`/api/upload?productSlug=${productSlug}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        alert('Image uploaded successfully');
        console.log('Image URL:', data.message);
        router.push('/success-page'); // Optionally, navigate to a success page
      } else {
        console.error('Image upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <h2>Upload Product Image</h2>
      <form onSubmit={handleUpload}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <input
          type="text"
          placeholder="Enter Product Slug"
          value={productSlug}
          onChange={handleProductSlugChange}
        />
        <button type='submit'>Upload Image</button>
      </form>
      <Link href="/admin/catalog/Addproduct">Back to Product Upload</Link>
    </div>
  );
}

export default ImageUpload;
