/**
 * Simple logger utility.
 * In a real app, this could use Winston or Morgan for file logging.
 */
module.exports = {
    info: (message, ...args) => {
        console.log(`[INFO] ${new Date().toISOString()}: ${message}`, ...args);
    },
    error: (message, ...args) => {
        console.error(`[ERROR] ${new Date().toISOString()}: ${message}`, ...args);
    },
    warn: (message, ...args) => {
        console.warn(`[WARN] ${new Date().toISOString()}: ${message}`, ...args);
    }
};
