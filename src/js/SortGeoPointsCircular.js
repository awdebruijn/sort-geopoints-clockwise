export default class SortGeoPointsCircular {
	constructor(markers) {
		this.markers = markers;
	}

	sortMarkers() {
		let sortedLatlongs = [];
		this.markers.forEach(marker => {
			sortedLatlongs.push({
				'lat': marker.lat,
				'lng': marker.long,
				'angle': ''
			});
		});

		let referencePoint = this.findLowermostPoint(sortedLatlongs);

		// filter out referencepoint
		sortedLatlongs = sortedLatlongs.filter((point) => {
			if (point.lat !== referencePoint.lat && point.lng !== referencePoint.lng) {
				return point;
			}
		});

		sortedLatlongs.forEach(point => { point.angle = this.calcAngle(referencePoint, point) });
		sortedLatlongs = sortedLatlongs.sort(this.sortByAngleLowHigh);

		// add back the reference point for drawing
		sortedLatlongs.push(referencePoint);

		return sortedLatlongs;
	}

	// finds point with smallest latitude
	findLowermostPoint(markerPoints) {
		let smallestLat = markerPoints[0].lat;
		let point = markerPoints[0];

		markerPoints.forEach(markerPoint => {
			if (markerPoint.lat < smallestLat) {
				smallestLat = markerPoint.lat;
				point = markerPoint;
			} else if (markerPoint.lat == smallestLat && markerPoint.lng < point.lng) {
				// current marker point has same lat, and is not current point with smallest lat
				// so set ref point to point with smallest longitude
				smallestLat = markerPoint.lat;
				point = markerPoint;
			}
		});

		return point;
	}

	calcShortestDistance(pointA, pointB) {
		let xdist = pointB.lng - pointA.lng;
		let ydist = pointB.lat - pointA.lat;

		return Math.hypot(xdist, ydist);
	}

	calcAngle(referencePoint, point) {
		let x = point.lng - referencePoint.lng;
		let shortestDist = this.calcShortestDistance(referencePoint, point);

		// if angle is negative, it's on the right side of lowermost point, meaning it is bigger than PI/2
		let angle = x < 0 ? Math.PI - Math.acos(Math.abs(x) / shortestDist) : Math.acos(x / shortestDist);

		return angle;
	}

	sortByAngleLowHigh(a, b) {
		return a.angle > b.angle ? 1 : b.angle > a.angle ? -1 : 0;
	}
}