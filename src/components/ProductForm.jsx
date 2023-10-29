import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import useColorStore from "@/store/color/colorStore";
import { saveProductsToLocalStorage } from "@/utils/Localstorage";
import { toast } from "react-toastify";
import useProductCategoryStore from "@/store/pcategory/pStore";

const ProductUploadForm = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [material, setMaterial] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [sizeQuantities, setSizeQuantities] = useState({});
  const [tags, setTags] = useState(""); // Initialize the "tags" state


  const handleTagsChange = (e) => {
    setTags(e.target.value);
  };
  

  const handleSizeChange = (e) => {
    const size = e.target.value;
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  const handleQuantityChange = (e) => {
    const size = e.target.name;
    const quantity = parseInt(e.target.value, 10);
    setSizeQuantities({ ...sizeQuantities, [size]: quantity });
  };

  const colorStore = useColorStore(); // Get the color store
  const categoryStore = useProductCategoryStore(); // Get the product category store

  useEffect(() => {
    // Fetch the colors when the component mounts
    colorStore.getColors();
    // Fetch the product categories when the component mounts
    categoryStore.getCategories();
  }, []);

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
      material,
      color: [JSON.parse(selectedColor)],
      sizes: sizeQuantities,
      tags: tags,
    };

    setIsLoading(true);

    try {
      // Send a POST request to your API route with JSON data
      const res = await fetch("/api/product/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (res.ok) {
        const data = await res.json();
        // Product uploaded successfully, navigate to the image upload page
        toast.success("Product uploaded successfully");
        saveProductsToLocalStorage(data);
        router.push("/admin/imageupload");
      } else {
        // Handle errors
        console.error("Error uploading product:", res.statusText);
      }
    } catch (error) {
      console.error("Error uploading product:", error);
    }

    setIsLoading(false);
  };

  return (
    <div className="w-full text-center font-opensans mt-12">
      <h2 className="mt-6 text-[30px] ">Upload Product Description</h2>
      <form onSubmit={handleFormSubmit} className="pt-6">
        <div>
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-[800px] px-4 py-4 focus:outline-none  border border-dark border-solid"
          />
        </div>
        <div className="mt-6">
          <input
            type="text"
            placeholder="Slug"
            name="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            className="w-[800px] px-4 py-4 focus:outline-none  border border-dark border-solid"
          />
        </div>
        <div className="mt-6">
          <textarea
            placeholder="Product Description"
            value={description}
            name="description"
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-[800px] px-4 py-4 focus:outline-none  border border-dark border-solid"
          />
        </div>
        <div className="mt-6">
          <input
            type="number"
            placeholder="Price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-[800px] px-4 py-4 focus:outline-none  border border-dark border-solid"
          />
        </div>
        <div className="mt-6">
          <select
            name="category"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="w-[800px] px-4 py-4 focus:outline-none border border-dark border-solid"
          >
            <option value="" disabled>
              Select Category
            </option>
            {categoryStore.pCategories.map((productCategory) => (
              <option key={productCategory.id} value={productCategory.title}>
                {productCategory.title}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-6">
          <select
            name="tags"
            onChange={handleTagsChange}
            value={tags}
            className="w-[800px] px-4 py-4 focus:outline-none border border-dark border-solid"
          >
            <option value="" disabled>
              Select Tag
            </option>
            <option value="featured">Hero section</option>
            <option value="popular">New Arrival</option>
            <option value="special">Special</option>
            <option value="special">Collection</option>
          </select>
        </div>

        <div className="mt-6">
          <input
            type="text"
            placeholder="Material"
            name="material"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            required
            className="w-[800px] px-4 py-4 focus:outline-none  border border-dark border-solid"
          />
        </div>

        <div className="mt-6">
          <select
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            required
            className="w-[800px] px-4 py-4 focus:outline-none border border-dark border-solid"
          >
            <option value="" disabled>
              Select a Color
            </option>
            {colorStore.colors.map((color) => (
              <option key={color.id} value={JSON.stringify(color)}>
                {color.title} - {color.hex}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-6">
          <label className="text-lg font-semibold">Select Sizes:</label>
          <div className="flex justify-center gap-8 mt-2">
            {["S", "M", "L", "XL"].map((size) => (
              <div key={size} className="flex items-center">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={size}
                    checked={selectedSizes.includes(size)}
                    onChange={handleSizeChange}
                    className="form-checkbox h-5 w-5 mr-2 text-dark"
                  />
                  {size}
                </label>
                {selectedSizes.includes(size) && (
                  <input
                    type="number"
                    name={size}
                    value={sizeQuantities[size]}
                    onChange={handleQuantityChange}
                    min={0}
                    className="w-16 px-2 ml-4 py-1 focus:outline-none border border-dark border-solid"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <input
            type="number"
            placeholder="Quantity"
            name="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            className="w-[800px] px-4 py-4 focus:outline-none  border border-dark border-solid"
          />
        </div>
        <button
          type="submit"
          className="mt-[24px]  text-[12px] md:text-[14px] font-semibold bg-dark text-white px-[0px] tracking-[1.5px] py-[18px] w-[800px]"
        >
          {" "}
          {isLoading ? <Spinner /> : "Upload Product and Proceed"}
        </button>
      </form>
    </div>
  );
};

export default ProductUploadForm;
