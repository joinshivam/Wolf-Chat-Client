export function getUserCode(chatId) {
  const hash = chatId.replace(/-/g, "");
  const letter = String.fromCharCode(
    65 + (parseInt(hash.slice(0, 2), 16) % 26)
  );
  const digit = parseInt(hash.slice(-2), 16) % 10;
  return `${letter}${digit}`;
}

export function getUserColor(chatId) {
  let hash = 0;

  for (let i = 0; i < chatId.length; i++) {
    hash = chatId.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = Math.abs(hash) % 360;

  // return `hsl(${hue}, 75%, 50%)`;
  // return `hsl(${hue}, 75%, ${self ? 45 : 55}%)`;
  return `hsl(${hue}, 65%, 48%)`;

}

