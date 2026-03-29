/**
 * Format an ISO date string into a human-readable date.
 * @param {string} isoString
 * @returns {string}
 */
export function formatDate(isoString) {
  if (!isoString) return ''
  return new Date(isoString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Returns a "N min read" label from an estimated reading time in minutes.
 * @param {number} minutes
 * @returns {string}
 */
export function readingTimeLabel(minutes) {
  if (!minutes || minutes < 1) return '< 1 min read'
  return `${minutes} min read`
}

/**
 * Truncate a string to a max length, appending "…" if truncated.
 * @param {string} str
 * @param {number} max
 * @returns {string}
 */
export function truncate(str, max = 160) {
  if (!str || str.length <= max) return str
  return str.slice(0, max).trimEnd() + '…'
}
