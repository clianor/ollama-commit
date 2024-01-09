export function removeEscapeCharacters(str: string) {
  return str.replaceAll(/\\(.)/g, "$1");
}
