import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth";
import { uploadEventGalleryImage } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

/**
 * POST /api/admin/events/gallery/upload
 * Securely uploads an event gallery image to Cloudinary (xspaceweb/event-gallery folder).
 */
export async function POST(req: NextRequest) {
  const session = await verifyAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No image file provided" }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Uploaded file must be an image" }, { status: 400 });
    }

    const MAX_SIZE_BYTES = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json({ error: "Image size exceeds 10MB limit" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await uploadEventGalleryImage(buffer, file.name);

    return NextResponse.json(
      {
        url: uploadResult.url,
        publicId: uploadResult.publicId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Gallery image upload failed:", error);
    return NextResponse.json(
      { error: "Failed to upload gallery image. Please try again." },
      { status: 500 }
    );
  }
}
