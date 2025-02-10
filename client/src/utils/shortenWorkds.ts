export function shortendWords(str: string, cut: number) {
  let result = '';
  if (str.length > cut) {
    result = str.substring(0, cut - 2) + '...';
  } else {
    result = str;
  }

  return result;
}
