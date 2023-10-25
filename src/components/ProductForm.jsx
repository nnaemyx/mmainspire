import { useRouter } from 'next/router';
import React, { useState } from 'react';

const ProductUploadForm = () => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');

  const router = useRouter();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      title,
      slug,
      description,
      price,
      category,
      quantity,
    };

    try {
      // Send a POST request to your API route with JSON data
      const res = await fetch('/api/product/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (res.ok) {
        // Product uploaded successfully, navigate to the image upload page
        console.log('Product uploaded successfully');
        router.push('/admin/imageupload');
      } else {
        // Handle errors
        console.error('Error uploading product:', res.statusText);
      }
    } catch (error) {
      console.error('Error uploading product:', error);
    }
  };

  return (
    <div>
      <h2>Upload Product Description</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Slug"
            name="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
          />
        </div>
        <div>
          <textarea
            placeholder="Product Description"
            value={description}
            name="description"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Quantity"
            name="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <button type="submit">Upload Product and Proceed</button>
      </form>
    </div>
  );
};

export default ProductUploadForm;
