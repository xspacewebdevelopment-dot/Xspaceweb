import fs from "fs";
import path from "path";
import crypto from "crypto";
import { ResumeInfo } from "@/lib/db/schema";

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"];
const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/octet-stream", // Some browsers send octet-stream for docx
];

export interface ProcessedResumeResult {
  success: boolean;
  resumeInfo?: ResumeInfo;
  error?: string;
}

/**
 * Validates and saves an uploaded resume file to public/uploads/resumes/
 */
export async function saveUploadedResume(
  file: File | Blob | Buffer,
  originalFilename: string,
  declaredMimeType?: string
): Promise<ProcessedResumeResult> {
  try {
    // 1. Validate file extension
    const ext = path.extname(originalFilename || "").toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return {
        success: false,
        error: "Invalid file type. Only PDF, DOC, and DOCX files are allowed.",
      };
    }

    // 2. Determine file buffer & size
    let buffer: Buffer;
    let size: number;

    if (file instanceof Buffer) {
      buffer = file;
      size = file.length;
    } else if (file instanceof Blob || typeof (file as { arrayBuffer?: () => Promise<ArrayBuffer> }).arrayBuffer === "function") {
      const arrayBuffer = await (file as Blob).arrayBuffer();
      buffer = Buffer.from(arrayBuffer);
      size = buffer.length;
    } else {
      return {
        success: false,
        error: "Invalid file payload received.",
      };
    }

    // 3. Validate file size
    if (size === 0) {
      return {
        success: false,
        error: "Uploaded file is empty.",
      };
    }

    if (size > MAX_FILE_SIZE_BYTES) {
      return {
        success: false,
        error: `File size exceeds the 5MB limit (${(size / (1024 * 1024)).toFixed(1)}MB).`,
      };
    }

    // 4. Validate MIME type
    const mimeType = declaredMimeType || (ext === ".pdf" ? "application/pdf" : ext === ".docx" ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document" : "application/msword");
    if (!ALLOWED_MIME_TYPES.includes(mimeType) && !ALLOWED_EXTENSIONS.includes(ext)) {
      return {
        success: false,
        error: "Invalid file MIME type.",
      };
    }

    // 5. Basic file header / magic byte inspection to reject executables / HTML / scripts
    const fileHeaderHex = buffer.subarray(0, 8).toString("hex").toLowerCase();
    const textHeader = buffer.subarray(0, 100).toString("utf8").toLowerCase();

    // Check for dangerous scripts/HTML
    if (
      textHeader.includes("<html") ||
      textHeader.includes("<script") ||
      textHeader.includes("<?php") ||
      textHeader.includes("#!/")
    ) {
      return {
        success: false,
        error: "File content contains disallowed script data.",
      };
    }

    // Executable check (MZ header: 4d5a)
    if (fileHeaderHex.startsWith("4d5a")) {
      return {
        success: false,
        error: "Executable files are strictly prohibited.",
      };
    }

    // 6. Ensure target directory exists
    const uploadsDir = path.join(process.cwd(), "public", "uploads", "resumes");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // 7. Generate safe unique filename
    const cleanName = path
      .basename(originalFilename, ext)
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .slice(0, 40);
    const uniqueId = crypto.randomBytes(6).toString("hex");
    const storedFileName = `${Date.now()}-${uniqueId}-${cleanName}${ext}`;
    const destinationPath = path.join(uploadsDir, storedFileName);

    // 8. Write file to disk
    fs.writeFileSync(destinationPath, buffer);

    const publicUrl = `/uploads/resumes/${storedFileName}`;

    return {
      success: true,
      resumeInfo: {
        url: publicUrl,
        fileName: originalFilename,
        mimeType: mimeType,
        size: size,
      },
    };
  } catch (error: unknown) {
    console.error("Error saving uploaded resume:", error);
    const message = error instanceof Error ? error.message : "Failed to process resume file.";
    return {
      success: false,
      error: message,
    };
  }
}
