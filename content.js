const BIAS_BEACON_FLAG = "data-bias-beacon-processed";
const ORIGINAL_TEXT_ATTR = "data-bias-beacon-original-text";
const TOOLTIP_TEXT = "This sentence may contain emotionally loaded or biased language.";
const KEYWORDS = [
  "outrageous",
  "shocking",
  "they all",
  "those people",
  "obviously",
  "clearly",
  "everyone knows",
  "dangerous",
  "radical"
];

const keywordPatterns = KEYWORDS.map((keyword) => {
  const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`\\b${escapedKeyword.replace(/\s+/g, "\\s+")}\\b`, "i");
});

function isVisible(element) {
  const styles = window.getComputedStyle(element);
  return (
    styles.display !== "none" &&
    styles.visibility !== "hidden" &&
    styles.opacity !== "0" &&
    element.getClientRects().length > 0
  );
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function splitIntoSentences(text) {
  const matches = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g);
  return matches ? matches.map((sentence) => sentence.trim()).filter(Boolean) : [];
}

function sentenceContainsBias(sentence) {
  return keywordPatterns.some((pattern) => pattern.test(sentence));
}

function buildParagraphMarkup(paragraphText) {
  const sentences = splitIntoSentences(paragraphText);
  if (!sentences.length) {
    return { markup: escapeHtml(paragraphText), flaggedCount: 0 };
  }

  let flaggedCount = 0;
  const markedSentences = sentences.map((sentence) => {
    const escapedSentence = escapeHtml(sentence);
    if (!sentenceContainsBias(sentence)) {
      return escapedSentence;
    }

    flaggedCount += 1;
    return `<span class="bias-beacon-highlight" title="${TOOLTIP_TEXT}">${escapedSentence}</span>`;
  });

  return {
    markup: markedSentences.join(" "),
    flaggedCount
  };
}

function analyzePage() {
  let totalFlagged = 0;
  const paragraphs = document.querySelectorAll("p");

  paragraphs.forEach((paragraph) => {
    if (!isVisible(paragraph)) {
      return;
    }

    const paragraphText = (
      paragraph.getAttribute(ORIGINAL_TEXT_ATTR) ?? paragraph.innerText
    ).trim();

    if (!paragraphText) {
      return;
    }

    if (!paragraph.hasAttribute(ORIGINAL_TEXT_ATTR)) {
      paragraph.setAttribute(ORIGINAL_TEXT_ATTR, paragraphText);
    }

    const { markup, flaggedCount } = buildParagraphMarkup(paragraphText);
    if (!flaggedCount) {
      paragraph.setAttribute(BIAS_BEACON_FLAG, "true");
      return;
    }

    paragraph.innerHTML = markup;
    paragraph.setAttribute(BIAS_BEACON_FLAG, "true");
    totalFlagged += flaggedCount;
  });

  return totalFlagged;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type !== "ANALYZE_PAGE") {
    return;
  }

  const count = analyzePage();
  sendResponse({ count });
});
