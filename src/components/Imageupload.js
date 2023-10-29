import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Spinner from "./Spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

function ImageUpload() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [productSlug, setProductSlug] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setSelectedImage(file);

      // Use FileReader to read the selected file and set it as a data URL
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataURL = e.target.result;
        // Now you can use this dataURL to display the image
        // For example, you can set it as the source of an image tag
        const previewImage = document.getElementById('preview-image');
        previewImage.src = dataURL;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProductSlugChange = (e) => {
    const slug = e.target.value;
    setProductSlug(slug);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedImage || !productSlug) {
      alert("Please select an image and enter a product slug");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);

    setIsLoading(true);
    try {
      const response = await fetch(`/api/upload?productSlug=${productSlug}`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Image uploaded successfully");
       router.push("/admin/catalog/Productlist")
      } else {
        console.error("Image upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="w-full text-center font-opensans mt-12">
      <h2 className="mt-6 text-3xl">Upload Product Image</h2>
      <form onSubmit={handleUpload} className="">
        <div className="w-full h-full flex items-center justify-center">
          <label className="relative w-[800px] h-[300px] mt-6 border-2 border-dashed border-gray-400 rounded-md cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600">
              {selectedFile ? (
                  <div>
                  <Image
                    id="preview-image"
                    src=""
                    alt="Selected File"
                    width={200}
                    height={200}
                    className=" mx-auto mb-2"
                  />
                  <p className="text-lg font-semibold">{selectedFile.name}</p>
                  </div>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-10 mb-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 10.586l4.293-4.293a1 1 0 111.414 1.414L11.414 12l4.293 4.293a1 1 0 01-1.414 1.414L10 13.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 12 4.293 7.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p>Click here to choose an image</p>
                </>
              )}
            </div>
          </label>
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter Product Slug"
            value={productSlug}
            onChange={handleProductSlugChange}
            className="w-[800px] p-4 mt-4 focus:outline-none border-2 border-gray-400 rounded-md"
          />

        </div>
        <button type="submit"   className="mt-[24px]  text-[12px] md:text-[14px] font-semibold bg-dark text-white px-[0px] tracking-[1.5px] py-[18px] w-[800px]"> {isLoading ? <Spinner /> : "Upload Image"}</button>
      </form>
      <Link href="/admin/catalog/Addproduct">
        <p className="text-primary mb-6 hover:underline mt-4">
          Back to Product Upload
        </p>
      </Link>
    </div>
  );
}

export default ImageUpload;
