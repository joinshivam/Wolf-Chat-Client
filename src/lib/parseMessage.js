import { EMOJI_MAP } from "./emojimap";

export function parseMessage(text) {
  let color = null;
  let content = text;

  const colorMatch = content.match(/^#([0-9a-fA-F]{6})\s+(.*)/);
  if (colorMatch) {
    color = `#${colorMatch[1]}`;
    content = colorMatch[2];
  }

  if (content.startsWith("```") && content.endsWith("```")) {
    return {
      type: "codeblock",
      color,
      content: content.slice(3, -3),
    };
  }
  // const regex = /(\*[^*]+\*|_[^_]+_|~[^~]+~|`[^`]+`|https?:\/\/\S+|:[a-z_]+:)/g;
  const regex = /(#([0-9a-fA-F]{6})\((.*?)\)|\*[^*]+\*|_[^_]+_|~[^~]+~|`[^`]+`|https?:\/\/\S+|:[a-z_]+:)/g;
  const parts = content.split(regex);
  const expandedTokens = [];

  for (const part of parts) {
    if (!part) continue;

    // Bold *text*
    if (part.startsWith("*") && part.endsWith("*")) {
      expandedTokens.push({ type: "*", text: part.slice(1, -1) });
    }
    // Italic _text_
    else if (part.startsWith("_") && part.endsWith("_")) {
      expandedTokens.push({ type: "_", text: part.slice(1, -1) });
    }
    // Strike ~text~
    else if (part.startsWith("~") && part.endsWith("~")) {
      expandedTokens.push({ type: "~", text: part.slice(1, -1) });
    }
    // Inline Code `text`
    else if (part.startsWith("`") && part.endsWith("`")) {
      expandedTokens.push({ type: "`", text: part.slice(1, -1) });
    }
    // Links
    else if (/^https?:\/\//.test(part)) {
      expandedTokens.push({ type: "link", text: part });
    }
    // Emojis
    else if (/^:([a-z_]+):$/.test(part)) {
      const key = part.slice(1, -1);
      expandedTokens.push({
        type: "emoji",
        text: EMOJI_MAP[key] || part,
      });
    }
    // Plain Text
    else {
      expandedTokens.push({ type: "text", text: part });
    }
  }

  return { type: "inline", tokens: expandedTokens, color };
}

//   const tokens = [];
//   let buffer = "";
//   let mode = null;

//   const flush = () => {
//     if (!buffer) return;
//     tokens.push({ type: mode || "text", text: buffer });
//     buffer = "";
//   };

//   for (let i = 0; i < content.length; i++) {
//     const c = content[i];

//     if (["*", "_", "~", "`"].includes(c)) {
//       if (mode === c) {
//         flush();
//         mode = null;
//       } else if (!mode) {
//         flush();
//         mode = c;
//       } else {
//         buffer += c;
//       }
//     } else {
//       buffer += c;
//     }
//   }

//   flush();

//   // 🔗 Links + 😊 Emojis
//   const expandedTokens = [];
//   for (const token of tokens) {
//     if (token.type !== "text") {
//       expandedTokens.push(token);
//       continue;
//     }

//     const parts = token.text.split(/(\s+)/);
//     for (const part of parts) {
//       // Link
//       if (/^https?:\/\//.test(part)) {
//         expandedTokens.push({ type: "link", text: part });
//       }
//       // Emoji
//       else if (/^:([a-z_]+):$/.test(part)) {
//         const key = part.slice(1, -1);
//         expandedTokens.push({
//           type: "emoji",
//           text: EMOJI_MAP[key] || part,
//         });
//       } else {
//         expandedTokens.push({ type: "text", text: part });
//       }
//     }
//   }

//   return { type: "inline", tokens: expandedTokens, color };
// }

