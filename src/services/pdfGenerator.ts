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
 * Sanitizes all elements in a cloned document to ensure:
 * 1. No unparsed color functions linger (oklch)
 * 2. Letter-spacing is reset to 0 to prevent Arabic characters from overlapping/garbling ("مشربكة")
 * 3. Line-heights for titles are spacious enough for Arabic ascenders/descenders
 */
function sanitizeClonedNode(node: HTMLElement) {
  const elements = [node, ...Array.from(node.querySelectorAll('*'))] as HTMLElement[];
  for (const el of elements) {
    if (!el.style) continue;
    
    // Explicitly reset letter spacing and word spacing for crisp Arabic cursive script
    el.style.letterSpacing = '0px';
    el.style.wordSpacing = 'normal';

    const tagName = el.tagName ? el.tagName.toUpperCase() : '';
    if (tagName.startsWith('H') || tagName === 'SPAN' || tagName === 'P') {
      el.style.letterSpacing = '0px';
      // Ensure comfortable line height so diacritics and letters do not overlap
      if (tagName.startsWith('H')) {
        el.style.lineHeight = '1.35';
      }
    }

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

  // Ensure all web fonts (especially Arabic Cairo font) are fully loaded before rendering
  if (typeof document !== 'undefined' && document.fonts) {
    if (onProgress) {
      onProgress('جاري تحميل خطوط الطباعة والتحقق من وضوح النصوص...');
    }
    await document.fonts.ready;
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
      scale: 2, // High resolution crisp rendering (300 DPI equivalent)
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 1200,
      onclone: (clonedDoc, clonedElement) => {
        // Inject global style into cloned document to eliminate any CSS letter-spacing
        const style = clonedDoc.createElement('style');
        style.textContent = `
          * {
            letter-spacing: 0px !important;
            word-spacing: normal !important;
          }
          body, [dir="rtl"], [dir="rtl"] * {
            font-family: 'Cairo', 'Segoe UI', Tahoma, Arial, sans-serif !important;
            letter-spacing: 0px !important;
            word-spacing: normal !important;
            font-feature-settings: "liga" 1, "calt" 1 !important;
            -webkit-font-smoothing: antialiased !important;
          }
          h1, h2, h3, h4, h5, h6 {
            letter-spacing: 0px !important;
            word-spacing: normal !important;
            line-height: 1.35 !important;
          }
        `;
        clonedDoc.head.appendChild(style);

        // Sanitize colors and letter spacing for all nodes
        sanitizeClonedNode(clonedElement);
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
