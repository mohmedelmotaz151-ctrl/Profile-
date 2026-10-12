import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';

export interface GeneratePdfOptions {
  fileName?: string;
  onProgress?: (progressText: string) => void;
}

/**
 * Normalizes any modern CSS colors (oklch, oklab, lch, etc.) into standard hex/rgba
 * using a transient Canvas 2D context.
 */
function normalizeColor(colorStr: string): string {
  if (!colorStr) return colorStr;
  if (!colorStr.includes('oklch') && !colorStr.includes('oklab') && !colorStr.includes('lch')) {
    return colorStr;
  }
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = colorStr;
      return ctx.fillStyle; // Automatically converts to standard hex or rgba
    }
  } catch {
    // fallback
  }
  return colorStr;
}

/**
 * Sanitizes all elements in a cloned document to ensure no unparsed color functions linger
 */
function sanitizeClonedNodeColors(node: HTMLElement) {
  const elements = [node, ...Array.from(node.querySelectorAll('*'))] as HTMLElement[];
  for (const el of elements) {
    if (!el.style) continue;
    const computed = window.getComputedStyle(el);

    if (computed.color && computed.color.includes('oklch')) {
      el.style.color = normalizeColor(computed.color);
    }
    if (computed.backgroundColor && computed.backgroundColor.includes('oklch')) {
      el.style.backgroundColor = normalizeColor(computed.backgroundColor);
    }
    if (computed.borderColor && computed.borderColor.includes('oklch')) {
      el.style.borderColor = normalizeColor(computed.borderColor);
    }
  }
}

/**
 * Generates and downloads a multi-page A4 PDF from an array of HTML elements
 */
export async function generateProfilePdf(
  pageElements: HTMLElement[],
  options: GeneratePdfOptions = {}
): Promise<void> {
  const { fileName = 'Orkeit_Company_Profile.pdf', onProgress } = options;

  if (!pageElements.length) {
    throw new Error('No pages found to export');
  }

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  const pdfWidth = 210; // A4 width in mm
  const pdfHeight = 297; // A4 height in mm

  for (let i = 0; i < pageElements.length; i++) {
    const pageEl = pageElements[i];
    if (onProgress) {
      onProgress(`جاري معالجة الصفحة ${i + 1} من ${pageElements.length}...`);
    }

    const canvas = await html2canvas(pageEl, {
      scale: 2, // High resolution crisp rendering
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 1200,
      onclone: (_clonedDoc, clonedElement) => {
        sanitizeClonedNodeColors(clonedElement);
      },
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);

    if (i > 0) {
      pdf.addPage('a4', 'portrait');
    }

    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
  }

  if (onProgress) {
    onProgress('جاري حفظ وتنزيل الملف...');
  }

  pdf.save(fileName);
}
