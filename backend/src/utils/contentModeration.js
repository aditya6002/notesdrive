const BANNED_WORDS = require("./BANNED_WORDS");

const normalizeText = (text) => {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

const containsBannedWord = (text) => {
  if (!text || typeof text !== "string") {
    return false;
  }

  const normalizedText = normalizeText(text);

  return BANNED_WORDS.some((word) => {
    const normalizedWord = normalizeText(word);

    const regex = new RegExp(
      `(^|\\s)${normalizedWord.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?=\\s|$)`,
      "i"
    );

    return regex.test(normalizedText);
  });
};

module.exports = {
  normalizeText,
  containsBannedWord
};