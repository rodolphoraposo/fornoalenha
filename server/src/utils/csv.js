// server/src/utils/csv.js
/**
 * Converte um array de objetos em CSV.
 * - Escapa aspas
 * - Envolve campos com vírgula/aspas/quebra entre aspas duplas
 * - Usa \r\n (compatível com Excel/LibreOffice/Google Sheets)
 */

function escapeCell(v) {
  if (v === null || v === undefined) return '';
  const s = String(v);
  const mustQuote = /[",\r\n]/.test(s);
  const escaped = s.replace(/"/g, '""');
  return mustQuote ? `"${escaped}"` : escaped;
}

export function toCSV(rows, headerOrder) {
  if (!Array.isArray(rows) || rows.length === 0) return '';
  const headers = headerOrder && headerOrder.length
    ? headerOrder
    : Object.keys(rows[0]);

  const head = headers.map(escapeCell).join(',');
  const body = rows.map(row =>
    headers.map(h => escapeCell(row[h])).join(',')
  ).join('\r\n');

  return `${head}\r\n${body}\r\n`;
}
