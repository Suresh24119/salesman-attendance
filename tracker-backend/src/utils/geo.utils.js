const haversine = require('haversine-distance');

/**
 * Calculates the total distance for a set of points.
 * @param {Array} points - Array of {latitude, longitude} objects.
 * @returns {number} - Distance in meters.
 */
exports.calculateTotalDistance = (points) => {
    let total = 0;
    for (let i = 1; i < points.length; i++) {
        total += haversine(
            { lat: points[i - 1].latitude, lon: points[i - 1].longitude },
            { lat: points[i].latitude, lon: points[i].longitude }
        );
    }
    return total;
};

/**
 * Calculates distance between two points.
 * @param {Object} p1 - {latitude, longitude}
 * @param {Object} p2 - {latitude, longitude}
 * @returns {number} - Distance in meters.
 */
exports.getDistance = (p1, p2) => {
    return haversine(
        { lat: p1.latitude, lon: p1.longitude },
        { lat: p2.latitude, lon: p2.longitude }
    );
};
