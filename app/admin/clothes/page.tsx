"use client";

import { useEffect, useState, useRef } from "react";
import { Trash2, Plus, Upload, X, Image as ImageIcon, Pencil } from "lucide-react";

type Clothing = {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  images?: string[];
  category: string;
  price?: number;
};

type ImageItem = {
  id: string;
  url: string;
  file?: File;
  isExisting: boolean;
};

export default function AdminClothes() {
  const [clothes, setClothes] = useState<Clothing[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("traditional-wear");
  const [price, setPrice] = useState("");
  const [imagePreviews, setImagePreviews] = useState<ImageItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchClothes();
  }, []);

  async function fetchClothes() {
    try {
      const res = await fetch("/api/clothes");
      const data = await res.json();
      if (Array.isArray(data)) {
        setClothes(data);
      } else {
        setClothes([]);
      }
    } catch (err) {
      console.error(err);
      setClothes([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      await fetch(`/api/clothes/${id}`, { method: "DELETE" });
      setClothes((prev) => prev.filter((c) => c._id !== id));
      if (editingId === id) {
        handleCancelForm();
      }
    } catch (err) {
      console.error(err);
    }
  }

  function handleEdit(item: Clothing) {
    setTitle(item.title);
    setDescription(item.description);
    setCategory(item.category);
    setPrice(item.price ? String(item.price) : "");
    setEditingId(item._id);

    const existingImages = item.images && item.images.length > 0 
      ? item.images 
      : [item.imageUrl];

    setImagePreviews(
      existingImages.map((url, i) => ({
        id: `existing-${i}-${Math.random()}`,
        url,
        isExisting: true,
      }))
    );

    setShowAddForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleCancelForm() {
    setTitle("");
    setDescription("");
    setCategory("traditional-wear");
    setPrice("");
    setImagePreviews([]);
    setEditingId(null);
    setShowAddForm(false);
    setUploadProgress("");
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    files.forEach((file, index) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newItem: ImageItem = {
          id: `new-${Date.now()}-${index}-${Math.random()}`,
          url: reader.result as string,
          file,
          isExisting: false,
        };
        setImagePreviews((prev) => [...prev, newItem]);
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function removeImage(id: string) {
    setImagePreviews((prev) => prev.filter((item) => item.id !== id));
  }

  async function uploadSingleImage(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        try {
          const base64Image = reader.result;
          const uploadRes = await fetch("/api/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image: base64Image }),
          });
          if (!uploadRes.ok) throw new Error("Upload failed");
          const { url } = await uploadRes.json();
          resolve(url);
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = () => reject(new Error("File read failed"));
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !description || !category || imagePreviews.length === 0) {
      alert("Please fill all fields and select at least one image.");
      return;
    }

    setUploading(true);
    try {
      const newItems = imagePreviews.filter((p) => !p.isExisting && p.file);

      setUploadProgress(
        newItems.length > 0
          ? `Uploading ${newItems.length} image${newItems.length > 1 ? "s" : ""}...`
          : "Saving clothing item..."
      );

      // Upload new images concurrently
      const uploadedUrls = await Promise.all(
        newItems.map((item) => uploadSingleImage(item.file!))
      );

      // Merge existing and newly uploaded URLs preserving the previews order
      let uploadIdx = 0;
      const finalImages = imagePreviews.map((p) => {
        if (p.isExisting) return p.url;
        return uploadedUrls[uploadIdx++];
      });

      const imageUrl = finalImages[0];

      const payload = {
        title,
        description,
        category,
        imageUrl,
        images: finalImages,
        price: price ? Number(price) : null,
      };

      let res;
      if (editingId) {
        setUploadProgress("Updating clothing item...");
        res = await fetch(`/api/clothes/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        setUploadProgress("Saving clothing item...");
        res = await fetch("/api/clothes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) throw new Error("Failed to save clothing");

      handleCancelForm();
      fetchClothes();
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setUploading(false);
      setUploadProgress("");
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <h1 className="font-display text-2xl md:text-3xl italic text-cream">Manage Clothes</h1>
        <button
          onClick={() => {
            if (showAddForm) {
              handleCancelForm();
            } else {
              setShowAddForm(true);
            }
          }}
          className="flex items-center gap-2 font-body text-[10px] tracking-[0.35em] uppercase px-6 py-3 bg-brand text-canvas hover:bg-brand/85 transition-all duration-300"
        >
          {showAddForm ? <><X size={14} /> Cancel</> : <><Plus size={14} /> Add New</>}
        </button>
      </div>

      {showAddForm && (
        <div className="bg-surface p-8 border border-[rgba(255,255,255,0.08)] mb-12">
          <h2 className="font-display text-2xl italic text-cream mb-6">
            {editingId ? "Edit Clothing Item" : "Add New Item"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block font-body text-[9px] tracking-[0.4em] uppercase text-muted mb-2">Title</label>
                <input required type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-transparent border-b border-[rgba(255,255,255,0.18)] focus:border-brand text-cream font-body text-sm py-3 outline-none" />
              </div>
              <div>
                <label className="block font-body text-[9px] tracking-[0.4em] uppercase text-muted mb-2">Collection</label>
                <select required value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-surface border-b border-[rgba(255,255,255,0.18)] focus:border-brand text-cream font-body text-sm py-3 outline-none">
                  <option value="traditional-wear">Traditional Wear</option>
                  <option value="asoebi">Asoebi</option>
                  <option value="wedding-gowns">Wedding Gowns</option>
                </select>
              </div>
              <div>
                <label className="block font-body text-[9px] tracking-[0.4em] uppercase text-muted mb-2">Price (₦ - Optional)</label>
                <input type="number" placeholder="e.g. 45000" value={price} onChange={e => setPrice(e.target.value)} className="w-full bg-transparent border-b border-[rgba(255,255,255,0.18)] focus:border-brand text-cream font-body text-sm py-3 outline-none" />
              </div>
            </div>
            
            <div>
              <label className="block font-body text-[9px] tracking-[0.4em] uppercase text-muted mb-2">Description</label>
              <textarea required rows={3} value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-transparent border-b border-[rgba(255,255,255,0.18)] focus:border-brand text-cream font-body text-sm py-3 outline-none resize-none" />
            </div>

            {/* ── Multi-Image Upload Area ── */}
            <div>
              <label className="block font-body text-[9px] tracking-[0.4em] uppercase text-muted mb-3">
                Images <span className="text-brand ml-1">({imagePreviews.length} selected)</span>
              </label>

              {/* Preview Grid */}
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 mb-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={preview.id} className="relative group aspect-square bg-surface2 overflow-hidden border border-[rgba(255,255,255,0.08)]">
                      <img src={preview.url} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                      {/* Primary badge */}
                      {index === 0 && (
                        <span className="absolute top-1.5 left-1.5 bg-brand text-canvas font-body text-[7px] tracking-[0.3em] uppercase px-2 py-0.5">
                          Primary
                        </span>
                      )}
                      {/* Remove button */}
                      <button
                        type="button"
                        onClick={() => removeImage(preview.id)}
                        className="absolute top-1.5 right-1.5 w-6 h-6 bg-red-500/90 text-white flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}

                  {/* Add more button inside the grid */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-square border-2 border-dashed border-[rgba(255,255,255,0.15)] hover:border-brand flex flex-col items-center justify-center cursor-pointer transition-colors duration-200"
                  >
                    <Plus size={18} className="text-muted mb-1" />
                    <span className="font-body text-[7px] tracking-wide uppercase text-muted">Add More</span>
                  </button>
                </div>
              )}

              {/* Upload drop zone — shown when no images selected */}
              {imagePreviews.length === 0 && (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-40 border-2 border-dashed border-[rgba(255,255,255,0.18)] hover:border-brand flex items-center justify-center cursor-pointer transition-colors duration-300"
                >
                  <div className="flex flex-col items-center text-muted">
                    <div className="w-12 h-12 rounded-full bg-surface2 flex items-center justify-center mb-3">
                      <Upload size={20} className="text-brand" />
                    </div>
                    <span className="font-body text-[10px] tracking-wide uppercase mb-1">Click to upload images</span>
                    <span className="font-body text-[9px] text-muted/60">You can select multiple images at once</span>
                  </div>
                </div>
              )}

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                multiple
                className="hidden"
              />
            </div>

            <div className="flex items-center gap-4">
              <button type="submit" disabled={uploading} className="font-body text-[10px] tracking-[0.35em] uppercase px-8 py-4 bg-brand text-canvas hover:bg-brand/85 transition-all duration-300 disabled:opacity-50">
                {uploading ? uploadProgress || "Processing..." : editingId ? "Update Clothing Item" : "Save Clothing Item"}
              </button>
              {uploading && (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-brand border-t-transparent rounded-full animate-spin" />
                  <span className="font-body text-xs text-muted">{uploadProgress}</span>
                </div>
              )}
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <p className="text-muted font-body">Loading...</p>
      ) : clothes.length === 0 ? (
        <p className="text-muted font-body">No clothes added yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {clothes.map((item) => (
            <div key={item._id} className="bg-surface border border-[rgba(255,255,255,0.08)] group">
              <div className="aspect-[3/4] relative overflow-hidden">
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                {/* Image count badge */}
                {item.images && item.images.length > 1 && (
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-full">
                    <ImageIcon size={11} className="text-cream/80" />
                    <span className="font-body text-[9px] text-cream/80">{item.images.length}</span>
                  </div>
                )}
                {/* Actions overlay */}
                <div className="absolute top-3 right-3 flex gap-2 opacity-100 transition-opacity">
                  <button 
                    onClick={() => handleEdit(item)}
                    className="w-8 h-8 bg-brand text-canvas flex items-center justify-center rounded-full hover:bg-brand/90 transition-colors"
                    title="Edit Item"
                  >
                    <Pencil size={12} />
                  </button>
                  <button 
                    onClick={() => handleDelete(item._id)}
                    className="w-8 h-8 bg-red-500 text-white flex items-center justify-center rounded-full hover:bg-red-600 transition-colors"
                    title="Delete Item"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <div className="p-3 md:p-5">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-2">
                  <span className="font-body text-[7px] md:text-[8px] tracking-[0.4em] uppercase text-brand">{item.category.replace("-", " ")}</span>
                  {item.price && (
                    <span className="font-display text-[10px] md:text-xs text-brand">₦{item.price.toLocaleString()}</span>
                  )}
                </div>
                <h3 className="font-display text-base md:text-xl italic text-cream mb-1 md:mb-2 truncate">{item.title}</h3>
                <p className="font-body text-[10px] md:text-xs text-muted line-clamp-2">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
