import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { uploadInternProfileImage, uploadInternCertificateFile } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const type = (formData.get("type") as string) || "profile"; // "profile" | "certificate"

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    if (type === "certificate") {
      // Validate file type (PDF or Image)
      const isPdf = file.type === "application/pdf" || file.name.endsWith(".pdf");
      const isImage = file.type.startsWith("image/");

      if (!isPdf && !isImage) {
        return NextResponse.json(
          { error: "Invalid certificate format. Only PDF and image files are supported." },
          { status: 400 }
        );
      }

      const result = await uploadInternCertificateFile(buffer, file.name);
      return NextResponse.json({
        url: result.url,
        publicId: result.publicId,
        format: result.format || (isPdf ? "pdf" : "image"),
      });
    }

    // Default: Profile image
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Only image files are allowed for profile photos." }, { status: 400 });
    }

    const result = await uploadInternProfileImage(buffer, file.name);
    return NextResponse.json({
      url: result.url,
      publicId: result.publicId,
    });
  } catch (error) {
    console.error("Intern upload API error:", error);
    return NextResponse.json(
      { error: "File upload failed", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
