/**
 * Compresses an image file client-side using the Canvas API.
 * Resizes the image to fit within maxWidth and maxHeight (maintaining aspect ratio),
 * and compresses it to JPEG format at the specified quality.
 */
export async function compressImage(
  file: File,
  { maxWidth = 1200, maxHeight = 1200, quality = 0.8 } = {}
): Promise<File> {
  if (!file.type.startsWith("image/") || file.type === "image/gif") {
    return file; // Return as-is if not an image or if it's an animated GIF
  }

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // Calculate aspect ratio scale
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(file); // Fallback to original
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Convert PNGs with transparency to PNG, otherwise use JPEG for standard photos
        const isPng = file.type === "image/png";
        const mimeType = isPng ? "image/png" : "image/jpeg";

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: mimeType,
                lastModified: Date.now(),
              });
              // Return the compressed version only if it's actually smaller
              resolve(compressedFile.size < file.size ? compressedFile : file);
            } else {
              resolve(file);
            }
          },
          mimeType,
          mimeType === "image/jpeg" ? quality : undefined
        );
      };
      img.onerror = () => resolve(file);
    };
    reader.onerror = () => resolve(file);
  });
}
