/** First letter of a display name for avatar fallback (uppercase). */
export function nameInitial(name?: string): string {
  const trimmed = name?.trim();
  if (!trimmed) return "?";
  return trimmed.charAt(0).toLocaleUpperCase();
}
