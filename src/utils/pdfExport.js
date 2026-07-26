import { PROGRAM, CREDIT } from '../brand';

// jsPDF (plus the html2canvas and dompurify it pulls in) is ~380kB, and most
// of a session happens before anyone clicks Download. It is imported on demand
// so the questions load fast on a phone.

// Deliberately large type and generous spacing. This page is meant to be read
// on a phone at arm's length, not studied.
const PAGE = { w: 612, h: 792 };
const MARGIN = 56;
const WIDTH = PAGE.w - MARGIN * 2;
const PAPER = [242, 240, 239];
const INK = [0, 0, 0];
const MUTED = [107, 101, 96];
const ACCENT_TEXT = [146, 64, 14]; // readable amber for small labels
const ACCENT_RULE = [245, 158, 11]; // brighter amber for the section rules

export function filenameFor(doc) {
  const slug = doc.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return `avatar-${slug || 'profile'}.pdf`;
}

// Split out from exportPDF so the layout can be built and inspected without a
// browser download.
export async function buildPDF(doc, owner = {}) {
  const { jsPDF } = await import('jspdf');
  const pdf = new jsPDF({ unit: 'pt', format: 'letter' });
  let y = MARGIN;

  // Every page needs the background painted before anything lands on it.
  const paintPage = () => {
    pdf.setFillColor(...PAPER);
    pdf.rect(0, 0, PAGE.w, PAGE.h, 'F');
  };
  paintPage();

  const room = (needed) => {
    if (y + needed > PAGE.h - MARGIN) {
      pdf.addPage();
      paintPage();
      y = MARGIN;
    }
  };

  const write = (text, { size, style = 'normal', color = INK, gap = 0, lead = 1.45 }) => {
    pdf.setFont('helvetica', style);
    pdf.setFontSize(size);
    pdf.setTextColor(...color);
    const lines = pdf.splitTextToSize(String(text), WIDTH);
    const lineHeight = size * lead;
    for (const l of lines) {
      room(lineHeight);
      pdf.text(l, MARGIN, y);
      y += lineHeight;
    }
    y += gap;
  };

  // Cover block
  write(`${PROGRAM.toUpperCase()}  ·  AVATAR`, {
    size: 11,
    style: 'bold',
    color: ACCENT_TEXT,
    gap: 10,
  });
  write(doc.name, { size: 34, style: 'bold', gap: 6, lead: 1.15 });

  const by = [owner.name, owner.instagram && `@${owner.instagram.replace(/^@/, '')}`]
    .filter(Boolean)
    .join('   ');
  if (by) write(`Built by ${by}`, { size: 12, color: MUTED, gap: 4 });
  write(
    new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }),
    { size: 11, color: MUTED, gap: 26 },
  );

  for (const section of doc.sections) {
    room(90);
    pdf.setDrawColor(...ACCENT_RULE);
    pdf.setLineWidth(2);
    pdf.line(MARGIN, y - 4, MARGIN + 44, y - 4);
    y += 20;
    write(section.heading, { size: 21, style: 'bold', gap: 14, lead: 1.2 });

    for (const { label, text } of section.lines) {
      room(46);
      write(label, { size: 10, style: 'bold', color: MUTED, gap: 5 });
      write(text, { size: 13, gap: 16, lead: 1.6 });
    }
    y += 8;
  }

  // Running footer on every page: creator credit on the left, page number on
  // the right. Travels with the document so attribution can't be cropped off.
  const total = pdf.getNumberOfPages();
  for (let p = 1; p <= total; p += 1) {
    pdf.setPage(p);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    pdf.setTextColor(...MUTED);
    pdf.text(CREDIT, MARGIN, PAGE.h - 30);
    pdf.text(`${p} of ${total}`, PAGE.w - MARGIN, PAGE.h - 30, { align: 'right' });
  }

  return pdf;
}

export async function exportPDF(doc, owner = {}) {
  const pdf = await buildPDF(doc, owner);
  pdf.save(filenameFor(doc));
}
