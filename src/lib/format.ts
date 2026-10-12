export function fmtMonth(d?: string) {
  if (!d) return "";
  const date = new Date(d);
  if (isNaN(date.getTime())) return d;
  return date.toLocaleDateString("en-GB", { month: "short", year: "numeric" });
}

export function fmtDate(d?: string) {
  if (!d) return "";
  const date = new Date(d);
  if (isNaN(date.getTime())) return d;
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export function range(start?: string, end?: string, current?: boolean) {
  if (!start) return "";
  return `${fmtMonth(start)} — ${current || !end ? "Present" : fmtMonth(end)}`;
}

export const splitList = (s: string) => s.split(",").map((x) => x.trim()).filter(Boolean);
