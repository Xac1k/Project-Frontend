export function isURL(text: string | undefined | null): boolean {
  if (!text) return false;
  const SRC = /http[\n\w\\\/\:.?=\-&]*/g;
  return SRC.test(text);
}
