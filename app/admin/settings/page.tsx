"use client";

import { useEffect, useState, useRef } from "react";
import { Upload } from "lucide-react";
import { defaultAssets } from "@/lib/default-assets";

type Asset = {
  key: string;
  imageUrl: string;
};

export default function AdminSettings() {
  const [dbAssets, setDbAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeUploadKey, setActiveUploadKey] = useState<string | null>(null);

  useEffect(() => {
    fetchAssets();
  }, []);

  async function fetchAssets() {
    try {
      const res = await fetch("/api/settings/assets");
      const data = await res.json();
      setDbAssets(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function handleImageClick(key: string) {
    setActiveUploadKey(key);
    // Reset the file input so the same file can be re-selected
    if (fileInputRef.current) fileInputRef.current.value = "";
    fileInputRef.current?.click();
  }

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !activeUploadKey) return;

    setUploadingKey(activeUploadKey);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64Image = reader.result;

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64Image }),
        });

        if (!uploadRes.ok) throw new Error("Upload failed");

        const { url: imageUrl } = await uploadRes.json();

        const assetRes = await fetch("/api/settings/assets", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: activeUploadKey, imageUrl }),
        });

        if (!assetRes.ok) throw new Error("Failed to save asset");

        fetchAssets();
        setUploadingKey(null);
        setActiveUploadKey(null);
      };
    } catch (err) {
      console.error(err);
      alert("Failed to update image.");
      setUploadingKey(null);
      setActiveUploadKey(null);
    }
  }

  function getUrl(key: string) {
    const dbMatch = dbAssets.find((a) => a.key === key);
    return dbMatch ? dbMatch.imageUrl : defaultAssets[key]?.defaultUrl ?? "";
  }

  // Group all keys from the SHARED registry — always in sync
  const groupedKeys = Object.keys(defaultAssets).reduce((acc, key) => {
    const group = defaultAssets[key].group;
    if (!acc[group]) acc[group] = [];
    acc[group].push(key);
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <div>
      <h1 className="font-display text-3xl italic text-cream mb-8">Site Images</h1>
      <p className="font-body text-sm text-muted mb-12 max-w-2xl leading-loose tracking-wide">
        Click on any image to replace it. Changes are reflected on the site within 60 seconds. Images are stored on your Cloudinary account.
      </p>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
      />

      {loading ? (
        <p className="text-muted font-body">Loading images...</p>
      ) : (
        <div className="space-y-16">
          {Object.entries(groupedKeys).map(([group, keys]) => (
            <div key={group}>
              <h2 className="font-display text-2xl italic text-brand mb-6 border-b border-[rgba(255,255,255,0.08)] pb-4">
                {group}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {keys.map((key) => {
                  const data = defaultAssets[key];
                  const url = getUrl(key);
                  const isUploading = uploadingKey === key;
                  const isCustom = dbAssets.some((a) => a.key === key);

                  return (
                    <div
                      key={key}
                      className="bg-surface border border-[rgba(255,255,255,0.08)] group relative"
                    >
                      <div
                        className="aspect-video relative overflow-hidden bg-black/40 cursor-pointer"
                        onClick={() => !isUploading && handleImageClick(key)}
                      >
                        <img
                          src={url}
                          alt={data.label}
                          className={`w-full h-full object-cover transition-opacity ${
                            isUploading ? "opacity-30" : "group-hover:opacity-60"
                          }`}
                        />

                        {isUploading ? (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <p className="font-body text-[10px] tracking-widest uppercase text-brand">
                              Uploading...
                            </p>
                          </div>
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="flex flex-col items-center">
                              <Upload size={24} className="text-white mb-2" />
                              <p className="font-body text-[10px] tracking-widest uppercase text-white shadow-sm">
                                Replace Image
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Badge: Custom or Default */}
                        <div
                          className={`absolute top-2 left-2 px-2 py-0.5 text-[8px] tracking-widest uppercase font-body ${
                            isCustom
                              ? "bg-brand text-canvas"
                              : "bg-black/50 text-cream/50"
                          }`}
                        >
                          {isCustom ? "Custom" : "Default"}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-body text-xs tracking-wide text-cream">{data.label}</h3>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
