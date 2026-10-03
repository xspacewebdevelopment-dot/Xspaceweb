"use client";

import { toPng } from "html-to-image";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

/**
 * Robustly captures an element as a high-resolution PNG data URL.
 * Uses html-to-image (native browser SVG rendering - immune to CSS parser errors like oklab/oklch/lab)
 * with a fallback to html2canvas-pro (fork supporting modern CSS color functions).
 */
async function captureElementToPng(element: HTMLElement): Promise<string> {
  // Method 1: html-to-image (Uses native browser SVG rasterization - 100% immune to modern CSS/oklab parser errors)
  try {
    const dataUrl = await toPng(element, {
      quality: 1,
      pixelRatio: 2.5,
      backgroundColor: "#FFFFFF",
      cacheBust: true,
    });
    if (dataUrl && dataUrl.startsWith("data:image/png") && dataUrl.length > 500) {
      return dataUrl;
    }
  } catch (err1) {
    console.warn("html-to-image capture attempt failed, falling back to html2canvas-pro:", err1);
  }

  // Method 2: html2canvas-pro (supports modern CSS color functions including oklab/oklch/lab)
  try {
    const canvas = await html2canvas(element, {
      scale: 2.5,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: "#FFFFFF",
    });
    return canvas.toDataURL("image/png");
  } catch (err2) {
    console.error("html2canvas-pro fallback also failed:", err2);
    throw err2;
  }
}

/**
 * Downloads a DOM element as a high-resolution landscape A4 PDF certificate.
 */
export async function downloadCertificatePdf(
  element: HTMLElement,
  fileName = "XSPACEWEB-Certificate.pdf"
): Promise<void> {
  try {
    const imgData = await captureElementToPng(element);

    // A4 landscape dimensions in millimeters: 297mm x 210mm
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    const pdfWidth = 297;
    const pdfHeight = 210;

    // Load image natural dimensions to preserve exact aspect ratio without distortion
    const img = new Image();
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("Failed to load captured certificate image"));
      img.src = imgData;
    });

    const imgWidth = img.naturalWidth || 1040;
    const imgHeight = img.naturalHeight || 730;
    const imgRatio = imgWidth / imgHeight;

    let renderWidth = pdfWidth;
    let renderHeight = pdfWidth / imgRatio;

    if (renderHeight > pdfHeight) {
      renderHeight = pdfHeight;
      renderWidth = pdfHeight * imgRatio;
    }

    const xOffset = (pdfWidth - renderWidth) / 2;
    const yOffset = (pdfHeight - renderHeight) / 2;

    pdf.addImage(imgData, "PNG", xOffset, yOffset, renderWidth, renderHeight, undefined, "FAST");
    pdf.save(fileName);
  } catch (error) {
    console.error("Failed to generate certificate PDF:", error);
    throw error;
  }
}

/**
 * Generates an official certificate serial number based on the intern's ID and completion year.
 * e.g. "XSW-INTERN-001" -> "CERT-XSW-2026-001"
 */
export function getCertificateSerialNumber(
  internshipId: string,
  endDate: string | Date = new Date()
): string {
  const year = new Date(endDate).getFullYear() || 2026;
  const numMatch = internshipId.match(/(\d+)$/);
  const num = numMatch ? numMatch[1] : "001";
  return `CERT-XSW-${year}-${num}`;
}
