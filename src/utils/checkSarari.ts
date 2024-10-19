export function isSafari() {
  if (typeof navigator !== "undefined") {
    const userAgent = navigator.userAgent;
    // Detect Safari: userAgent contains 'Safari' but not 'Chrome', 'CriOS', 'Chromium', etc.
    return /^((?!chrome|chromium|crios|fxios|edg|edge|opr|opera|samsungbrowser|silk).)*safari/i.test(
      userAgent
    );
  }
  return false;
}

