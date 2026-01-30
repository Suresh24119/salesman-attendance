/**
 * Formats duration in milliseconds to human readable string.
 * @param {number} ms - Milliseconds.
 * @returns {string} - e.g., "1h 20m" or "15m".
 */
exports.formatDuration = (ms) => {
    const mins = Math.floor(ms / 60000);
    const hours = Math.floor(mins / 60);
    if (hours > 0) {
        return `${hours}h ${mins % 60}m`;
    }
    return `${mins}m`;
};

/**
 * Gets the start and end of a day.
 * @param {string} dateStr - YYYY-MM-DD
 * @returns {Object} - { start, end } Date objects.
 */
exports.getDayBounds = (dateStr) => {
    const start = new Date(dateStr);
    const end = new Date(start);
    end.setDate(end.getDate() + 1);
    return { start, end };
};
