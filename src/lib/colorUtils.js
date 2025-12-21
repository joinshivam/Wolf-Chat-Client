export function getNeonTextStyle(hex) {
  if (!hex) return {};

  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  const brightness = (0.299 * r + 0.587 * g + 0.114 * b);
  const outline = brightness > 160 ? "#716868ff" : "#ffffff";

  return {
    color: hex,
    textShadow: `
      0 0 1px ${outline},
      0 0 2px ${outline},
      0 0 4px ${hex}
    `,
  };
}
