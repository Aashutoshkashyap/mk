/**
 * Utility to filter out legacy financial/accounting content from the
 * previous Sharp Edge Business Solutions template in Supabase.
 * Ensures that ONLY civil engineering, construction, infrastructure,
 * and genuine MK Engineering and Construction content is displayed.
 */

const LEGACY_FINANCIAL_PATTERNS = [
  /sharp\s*edge/i,
  /sharpedge/i,
  /chartered\s*accountant/i,
  /\bca\s+diwash\b/i,
  /\bca\s+subrat\b/i,
  /\bca\s+nar\s*bahadur\b/i,
  /\bdiwash\s+dahal\b/i,
  /\bsubrat\s+sapkota\b/i,
  /\bpratigya\s+dhungana\b/i,
  /\bacca\b/i,
  /\baccounting\b/i,
  /\bbookkeeping\b/i,
  /\btaxation\b/i,
  /\btax\s+planning\b/i,
  /\baudit\b/i,
  /\bauditing\b/i,
  /\bpayroll\b/i,
  /\bcorporate\s+law\b/i,
  /\bfinancial\s+services\b/i,
  /\bfinancial\s+planning\b/i,
  /\bfinancial\s+advisory\b/i,
  /\bfinancial\s+integrity\b/i,
  /\bfintech\b/i,
  /\badvance\s+ruling\b/i,
  /\bbpo\b/i,
  /\breit\b/i,
  /\bsovereign\s+infrastructure\s+funds\b/i,
  /site-assets\/services\//i,
  /site-assets\/team\//i,
  /site-assets\/testimonials\//i,
  /site-assets\/partners\//i,
  /CADiwashDahal\.png/i,
  /Ethan Miller/i,
  /Olivia Carter/i,
  /Marcus Chen/i,
  /Elena Rossi/i,
];

export function isLegacyFinancialContent(data: unknown): boolean {
  if (!data) return false;
  try {
    const str = typeof data === "string" ? data : JSON.stringify(data);
    return LEGACY_FINANCIAL_PATTERNS.some((pattern) => pattern.test(str));
  } catch {
    return false;
  }
}

export function filterOutLegacyFinancial<T>(items: T[] | null | undefined): T[] {
  if (!items || !Array.isArray(items)) return [];
  return items.filter((item) => !isLegacyFinancialContent(item));
}

export function sanitizeDbRecord<T>(record: T | null | undefined): T | null {
  if (!record) return null;
  if (isLegacyFinancialContent(record)) return null;
  return record;
}
