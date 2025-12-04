function isURL(text: string | undefined): boolean {
  if (!text) return false;
  const SRC = /http[\n\w\\\/\:.?=\-&]*/g;
  return SRC.test(text);
}

export { isURL };
