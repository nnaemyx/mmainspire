import React, { useEffect } from "react";
import Head from "next/head";
import { toast } from "react-toastify";
import useProductCategoryStore from "@/store/pcategory/pStore";
import { getCategoryFromLocalStorage } from "@/utils/Localstorage";

const Categorylist = () => {
  const productCategoryStore = useProductCategoryStore(); // Get the product category store
  const getCategories = useProductCategoryStore((state) => state.getCategories);

  const handleDeleteCategory = (id) => {
    if (
      window.confirm("Are you sure you want to delete this product category?")
    ) {
      const parsedCategory = getCategoryFromLocalStorage();
      const id = parsedCategory?._id;
      if (!id) {
        throw new Error("User ID not found in localStorage");
      }
      // Update the DELETE request to include the category ID in the URL
      fetch(`/api/product/category?id=${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            // Handle successful deletion
            toast.success("Product category deleted successfully");
            // Refresh the categories list by calling getCategories
            getCategories();
          } else {
            // Handle errors (e.g., show an error message)
            console.error(
              "Error deleting product category:",
              response.statusText
            );
          }
        })
        .catch((error) => {
          // Handle any fetch-related errors
          console.error("Fetch error:", error);
        });
    }
  };

  useEffect(() => {
    // Fetch the product categories when the component mounts
    productCategoryStore.getCategories();
  }, []);

  useEffect(() => {
    // Fetch the list of product categories when the component loads
    getCategories();
  }, [getCategories]);
  return (
    <div>
      <Head>
        <title>Mma-Inspire Admin</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mt-12">
        <Head>
          <title>Mma-Inspire Admin</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h2 className="text-center text-[25px] font-futura">
          Product Categories
        </h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {productCategoryStore.pCategories.map((category) => (
              <tr key={category.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {category.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categorylist;
