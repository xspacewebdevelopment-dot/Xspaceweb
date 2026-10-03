import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

// Configure Cloudinary on the server side
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Uploads a news cover image buffer to Cloudinary in the "xspaceweb/news" folder.
 */
export async function uploadNewsCoverImage(
  buffer: Buffer,
  originalFilename?: string
): Promise<{ url: string; publicId: string }> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "xspaceweb/news",
        resource_type: "image",
        transformation: [
          { quality: "auto:good", fetch_format: "auto" },
        ],
      },
      (error, result: UploadApiResponse | undefined) => {
        if (error || !result) {
          console.error("Cloudinary upload error:", error);
          return reject(error || new Error("Failed to upload image to Cloudinary"));
        }
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    );

    uploadStream.end(buffer);
  });
}

/**
 * Uploads an event cover image buffer to Cloudinary in the "xspaceweb/events" folder.
 */
export async function uploadEventCoverImage(
  buffer: Buffer,
  originalFilename?: string
): Promise<{ url: string; publicId: string }> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "xspaceweb/events",
        resource_type: "image",
        transformation: [{ quality: "auto:good", fetch_format: "auto" }],
      },
      (error, result: UploadApiResponse | undefined) => {
        if (error || !result) {
          console.error("Cloudinary event cover upload error:", error);
          return reject(error || new Error("Failed to upload event cover to Cloudinary"));
        }
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    );

    uploadStream.end(buffer);
  });
}

/**
 * Uploads an event gallery image buffer to Cloudinary in the "xspaceweb/event-gallery" folder.
 */
export async function uploadEventGalleryImage(
  buffer: Buffer,
  originalFilename?: string
): Promise<{ url: string; publicId: string }> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "xspaceweb/event-gallery",
        resource_type: "image",
        transformation: [{ quality: "auto:good", fetch_format: "auto" }],
      },
      (error, result: UploadApiResponse | undefined) => {
        if (error || !result) {
          console.error("Cloudinary event gallery upload error:", error);
          return reject(error || new Error("Failed to upload gallery image to Cloudinary"));
        }
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    );

    uploadStream.end(buffer);
  });
}

/**
 * Uploads a media mention logo buffer to Cloudinary in the "xspaceweb/media-mentions" folder.
 */
export async function uploadMediaMentionLogo(
  buffer: Buffer,
  originalFilename?: string
): Promise<{ url: string; publicId: string }> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "xspaceweb/media-mentions",
        resource_type: "image",
        transformation: [{ quality: "auto:good", fetch_format: "auto" }],
      },
      (error, result: UploadApiResponse | undefined) => {
        if (error || !result) {
          console.error("Cloudinary media logo upload error:", error);
          return reject(error || new Error("Failed to upload media logo to Cloudinary"));
        }
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    );

    uploadStream.end(buffer);
  });
}

/**
 * Uploads a newsletter campaign image buffer to Cloudinary in the "xspaceweb/newsletter" folder.
 */
export async function uploadNewsletterImage(
  buffer: Buffer,
  originalFilename?: string
): Promise<{ url: string; publicId: string }> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "xspaceweb/newsletter",
        resource_type: "image",
        transformation: [{ quality: "auto:good", fetch_format: "auto" }],
      },
      (error, result: UploadApiResponse | undefined) => {
        if (error || !result) {
          console.error("Cloudinary newsletter image upload error:", error);
          return reject(error || new Error("Failed to upload newsletter image to Cloudinary"));
        }
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    );

    uploadStream.end(buffer);
  });
}

/**
 * Safely deletes an image asset from Cloudinary by its public ID.
 */
export async function deleteCloudinaryAsset(publicId: string): Promise<boolean> {
  if (!publicId) return false;

  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
      invalidate: true,
    });
    return result.result === "ok";
  } catch (error) {
    console.error(`Failed to delete Cloudinary asset ${publicId}:`, error);
    return false;
  }
}

/**
 * Uploads a testimonial profile photo buffer to Cloudinary in the "xspaceweb/testimonials" folder.
 */
export async function uploadTestimonialImage(
  buffer: Buffer,
  originalFilename?: string
): Promise<{ url: string; publicId: string }> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "xspaceweb/testimonials",
        resource_type: "image",
        transformation: [
          { quality: "auto:good", fetch_format: "auto", width: 800, height: 800, crop: "limit" },
        ],
      },
      (error, result: UploadApiResponse | undefined) => {
        if (error || !result) {
          console.error("Cloudinary testimonial image upload error:", error);
          return reject(error || new Error("Failed to upload testimonial image to Cloudinary"));
        }
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    );

    uploadStream.end(buffer);
  });
}

/**
 * Uploads an intern profile photo buffer to Cloudinary in the "xspaceweb/interns/profiles" folder.
 */
export async function uploadInternProfileImage(
  buffer: Buffer,
  originalFilename?: string
): Promise<{ url: string; publicId: string }> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "xspaceweb/interns/profiles",
        resource_type: "image",
        transformation: [
          { quality: "auto:good", fetch_format: "auto", width: 800, height: 800, crop: "limit" },
        ],
      },
      (error, result: UploadApiResponse | undefined) => {
        if (error || !result) {
          console.error("Cloudinary intern profile upload error:", error);
          return reject(error || new Error("Failed to upload intern profile photo to Cloudinary"));
        }
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    );

    uploadStream.end(buffer);
  });
}

/**
 * Uploads an intern certificate file (PDF or image) to Cloudinary in the "xspaceweb/interns/certificates" folder.
 */
export async function uploadInternCertificateFile(
  buffer: Buffer,
  originalFilename?: string
): Promise<{ url: string; publicId: string; format?: string }> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "xspaceweb/interns/certificates",
        resource_type: "auto", // Supports PDF and images
      },
      (error, result: UploadApiResponse | undefined) => {
        if (error || !result) {
          console.error("Cloudinary intern certificate upload error:", error);
          return reject(error || new Error("Failed to upload certificate file to Cloudinary"));
        }
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
          format: result.format,
        });
      }
    );

    uploadStream.end(buffer);
  });
}

/**
 * Backward compatibility alias for deleting news cover image.
 */
export const deleteNewsCoverImage = deleteCloudinaryAsset;

export { cloudinary };

