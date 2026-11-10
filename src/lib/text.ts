/** Words that keep their capital in the middle of a sentence */
const PROPER = /^(English|Urdu|Punjabi|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|Rochdale)\b/;

/** "Women's group" -> "women's group", but "English class" and "Thursday lunch" keep their capitals */
export function lowerFirst(text: string): string {
  return PROPER.test(text) ? text : text.charAt(0).toLowerCase() + text.slice(1);
}
