const { getDistance, calculateTotalDistance } = require('../utils/geo.utils');
const { formatDuration } = require('../utils/date.utils');

/**
 * Segments raw location points into Activities (STATIONARY or TRANSIT).
 * @param {Array} points - Array of location points.
 * @returns {Array} - Array of segments.
 */
exports.generateTimeline = (points) => {
    if (points.length < 2) return [];

    // Validate that all points have required properties
    const isValid = points.every(p =>
        p &&
        typeof p.timestamp === 'number' &&
        typeof p.latitude === 'number' &&
        typeof p.longitude === 'number'
    );

    if (!isValid) {
        console.error('Invalid location points detected');
        return [];
    }

    // Sort by timestamp just in case
    points.sort((a, b) => a.timestamp - b.timestamp);

    const segments = [];
    let current = {
        type: 'STATIONARY',
        startTime: points[0].timestamp,
        points: [points[0]],
    };

    for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i];

        const distance = getDistance(
            { latitude: prev.latitude, longitude: prev.longitude },
            { latitude: curr.latitude, longitude: curr.longitude }
        );
        const speed = (curr.speed || 0) * 3.6; // km/h

        const isMoving = speed > 2 || distance > 50;

        if (isMoving && current.type === 'STATIONARY') {
            finalizeStationary(current, segments);
            current = {
                type: 'TRANSIT',
                startTime: curr.timestamp,
                points: [curr],
            };
        } else if (!isMoving && current.type === 'TRANSIT') {
            finalizeTransit(current, segments);
            current = {
                type: 'STATIONARY',
                startTime: curr.timestamp,
                points: [curr],
            };
        } else {
            current.points.push(curr);
        }
    }

    finalizeLatest(current, segments);
    return segments;
};

function finalizeStationary(segment, segments) {
    const lastPoint = segment.points[segment.points.length - 1];
    const durationMs = lastPoint.timestamp - segment.startTime;

    // Stationary if >= 5 mins
    if (durationMs >= 5 * 60 * 1000) {
        segment.endTime = lastPoint.timestamp;
        segment.id = Math.random().toString(36).substr(2, 9);
        segment.duration = formatDuration(durationMs);
        segment.title = 'Stationary Place';
        segments.push(segment);
    }
}

function finalizeTransit(segment, segments) {
    const distance = calculateTotalDistance(segment.points);
    const lastPoint = segment.points[segment.points.length - 1];
    const durationMs = lastPoint.timestamp - segment.startTime;

    if (distance > 100) {
        segment.distance = distance;
        segment.endTime = lastPoint.timestamp;
        segment.id = Math.random().toString(36).substr(2, 9);
        segment.duration = formatDuration(durationMs);
        segment.title = 'Movement Segment';
        segments.push(segment);
    }
}

function finalizeLatest(segment, segments) {
    if (!segment.points || segment.points.length === 0) return;
    const lastPoint = segment.points[segment.points.length - 1];
    segment.endTime = lastPoint.timestamp;
    segment.id = Math.random().toString(36).substr(2, 9);
    segment.duration = formatDuration(segment.endTime - segment.startTime);
    segment.pointsCount = segment.points.length;

    if (segment.type === 'TRANSIT') {
        segment.distance = calculateTotalDistance(segment.points);
        segment.title = 'Movement Segment';
    } else {
        segment.title = 'Stationary Place';
    }
    // Only add the final segment if it has meaningful data
    if (segment.type === 'TRANSIT' && segment.points.length > 1) {
        segment.distance = calculateTotalDistance(segment.points);
        segment.title = 'Movement Segment';
        segments.push(segment);
    } else if (segment.type === 'STATIONARY' && segment.points.length > 5) {
        // Only add stationary tail if it has a decent amount of points (approx 1-2 mins)
        segment.title = 'Stationary Place';
        segments.push(segment);
    }
}
