"use client";

import { useEffect, useState, useRef } from "react";
import { Trash2, Plus, Upload, X } from "lucide-react";

type Clothing = {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
};

export default function AdminClothes() {
  const [clothes, setClothes] = useState<Clothing[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("traditional-wear");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    fetchClothes();
  }, []);

  async function fetchClothes() {
    try {
      const res = await fetch("/api/clothes");
      const data = await res.json();
      setClothes(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      await fetch(`/api/clothes/${id}`, { method: "DELETE" });
      setClothes((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !description || !category || !imageFile) {
      alert("Please fill all fields and select an image.");
      return;
    }

    setUploading(true);
    try {
      // 1. Upload image to Cloudinary via our API
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onloadend = async () => {
        const base64Image = reader.result;
        
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64Image }),
        });
        
        if (!uploadRes.ok) throw new Error("Upload failed");
        
        const { url: imageUrl } = await uploadRes.json();

        // 2. Save clothing item to DB
        const clotheRes = await fetch("/api/clothes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, description, category, imageUrl }),
        });
        
        if (!clotheRes.ok) throw new Error("Failed to save clothing");

        // 3. Reset and refresh
        setTitle("");
        setDescription("");
        setCategory("traditional-wear");
        setImageFile(null);
        setImagePreview(null);
        setShowAddForm(false);
        fetchClothes();
        setUploading(false);
      };
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
      setUploading(false);
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display text-3xl italic text-cream">Manage Clothes</h1>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 font-body text-[10px] tracking-[0.35em] uppercase px-6 py-3 bg-brand text-canvas hover:bg-brand/85 transition-all duration-300"
        >
          {showAddForm ? <><X size={14} /> Cancel</> : <><Plus size={14} /> Add New</>}
        </button>
      </div>

      {showAddForm && (
        <div className="bg-surface p-8 border border-[rgba(255,255,255,0.08)] mb-12">
          <h2 className="font-display text-2xl italic text-cream mb-6">Add New Item</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </div>
            
            <div>
              <label className="block font-body text-[9px] tracking-[0.4em] uppercase text-muted mb-2">Description</label>
              <textarea required rows={3} value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-transparent border-b border-[rgba(255,255,255,0.18)] focus:border-brand text-cream font-body text-sm py-3 outline-none resize-none" />
            </div>

            <div>
              <label className="block font-body text-[9px] tracking-[0.4em] uppercase text-muted mb-2">Image</label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-32 border-2 border-dashed border-[rgba(255,255,255,0.18)] hover:border-brand flex items-center justify-center cursor-pointer transition-colors"
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="h-full object-contain" />
                ) : (
                  <div className="flex flex-col items-center text-muted">
                    <Upload size={20} className="mb-2" />
                    <span className="font-body text-[10px] tracking-wide uppercase">Click to upload image</span>
                  </div>
                )}
              </div>
              <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
            </div>

            <button type="submit" disabled={uploading} className="font-body text-[10px] tracking-[0.35em] uppercase px-8 py-4 bg-brand text-canvas hover:bg-brand/85 transition-all duration-300 disabled:opacity-50">
              {uploading ? "Uploading & Saving..." : "Save Clothing Item"}
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <p className="text-muted font-body">Loading...</p>
      ) : clothes.length === 0 ? (
        <p className="text-muted font-body">No clothes added yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {clothes.map((item) => (
            <div key={item._id} className="bg-surface border border-[rgba(255,255,255,0.08)] group">
              <div className="aspect-[3/4] relative overflow-hidden">
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                <button 
                  onClick={() => handleDelete(item._id)}
                  className="absolute top-3 right-3 w-8 h-8 bg-red-500 text-white flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <div className="p-5">
                <span className="font-body text-[8px] tracking-[0.4em] uppercase text-brand mb-2 block">{item.category.replace("-", " ")}</span>
                <h3 className="font-display text-xl italic text-cream mb-2 truncate">{item.title}</h3>
                <p className="font-body text-xs text-muted line-clamp-2">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
