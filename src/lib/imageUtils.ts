/**
 * imageUtils.ts
 *
 * Helpers for handling image and icon uploads.
 *
 * The current CMS stores uploaded images as data URLs in localStorage.
 * This phase keeps that behavior intact while making the processing
 * more defensive.
 */

function isSupportedImageType(type: string): boolean {
  return (
    type === "image/png" ||
    type === "image/jpeg" ||
    type === "image/jpg" ||
    type === "image/webp" ||
    type === "image/svg+xml"
  );
}

function isDataImageUrl(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.trim().startsWith("data:image/")
  );
}

export function isValidImageSource(
  value: unknown,
): value is string {
  if (typeof value !== "string") {
    return false;
  }

  const source = value.trim();

  if (!source) {
    return false;
  }

  return (
    source.startsWith("/") ||
    source.startsWith("https://") ||
    source.startsWith("http://") ||
    source.startsWith("data:image/") ||
    source.startsWith("blob:")
  );
}

export async function processUploadedFile(
  file: File,
  maxDimension = 1200,
  quality = 0.85,
): Promise<string> {
  if (!(file instanceof File)) {
    throw new Error("Invalid upload: expected a File.");
  }

  if (!isSupportedImageType(file.type)) {
    throw new Error(
      `Unsupported image type: ${file.type || "unknown"}`,
    );
  }

  return new Promise((resolve, reject) => {
    /*
     * SVG files are preserved as data URLs.
     */
    if (file.type === "image/svg+xml") {
      const reader = new FileReader();

      reader.onload = () => {
        const result = reader.result;

        if (isDataImageUrl(result)) {
          resolve(result);
        } else {
          reject(
            new Error("Failed to read SVG image."),
          );
        }
      };

      reader.onerror = () => {
        reject(
          new Error("Failed to read SVG image."),
        );
      };

      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const source = event.target?.result;

      if (!isDataImageUrl(source)) {
        reject(
          new Error("Invalid image data returned by FileReader."),
        );
        return;
      }

      const img = new window.Image();

      img.onload = () => {
        let { width, height } = img;

        if (
          !Number.isFinite(width) ||
          !Number.isFinite(height) ||
          width <= 0 ||
          height <= 0
        ) {
          reject(
            new Error("Invalid image dimensions."),
          );
          return;
        }

        if (
          width > maxDimension ||
          height > maxDimension
        ) {
          if (width > height) {
            height = Math.round(
              (height * maxDimension) / width,
            );
            width = maxDimension;
          } else {
            width = Math.round(
              (width * maxDimension) / height,
            );
            height = maxDimension;
          }
        }

        const canvas =
          document.createElement("canvas");

        canvas.width = width;
        canvas.height = height;

        const context =
          canvas.getContext("2d");

        if (!context) {
          resolve(source);
          return;
        }

        context.drawImage(
          img,
          0,
          0,
          width,
          height,
        );

        const outputType =
          file.type === "image/png"
            ? "image/png"
            : "image/jpeg";

        try {
          const dataUrl =
            canvas.toDataURL(
              outputType,
              quality,
            );

          if (isDataImageUrl(dataUrl)) {
            resolve(dataUrl);
          } else {
            resolve(source);
          }
        } catch {
          resolve(source);
        }
      };

      img.onerror = () => {
        /*
         * Keep the original upload available rather than
         * allowing a processing failure to break the CMS.
         */
        resolve(source);
      };

      img.src = source;
    };

    reader.onerror = () => {
      reject(
        new Error("Failed to read uploaded image."),
      );
    };

    reader.readAsDataURL(file);
  });
}
