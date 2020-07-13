import Vec from "./Vec";
import { Rect, Circle, Line, Polygon } from "./Primitives";

export default class Intersects {


	// Line:

	public static lineToPoint(line : Line, point : Vec, tolerance : number = 1) : boolean {
		tolerance = tolerance || 1;
		let distanceSquared = function(p1 : Vec, p2 : Vec) : number {
			return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
		}
		return  Math.abs(distanceSquared(line.point1, line.point2) - (distanceSquared(line.point1, point) + distanceSquared(line.point2, point))) <= tolerance;
	}
	
	public static lineToLine(line1 : Line, line2 : Line, includeEnds : boolean) : boolean {
		const s1_x = line1.point2.x - line1.point1.x;
		const s1_y = line1.point2.y - line1.point1.y;
		const s2_x = line2.point2.x - line2.point1.x;
		const s2_y = line2.point2.y - line2.point1.y;
		let s = (-s1_y * (line1.point1.x - line2.point1.x) + s1_x * (line1.point1.y - line2.point1.y)) / (-s2_x * s1_y + s1_x * s2_y)
		let t = (s2_x * (line1.point1.y - line2.point1.y) - s2_y * (line1.point1.x - line2.point1.x)) / (-s2_x * s1_y + s1_x * s2_y)
		if (includeEnds) return s >= 0 && s <= 1 && t >= 0 && t <= 1
		else return s > 0 && s < 1 && t > 0 && t < 1
	}

	public static lineToCircle(line : Line, circle : Circle) : boolean {
		let ac = new Vec(circle.point.x - line.point1.x, circle.point.y - line.point1.y);
		let ab = new Vec(line.point2.x - line.point1.x, line.point2.y - line.point1.y);
		let ab2 = ab.dot(ab);
		let acab = ac.dot(ab);
		let t = acab / ab2;
		t = (t < 0) ? 0 : t;
		t = (t > 1) ? 1 : t;
		let h = new Vec((ab.x * t + line.point1.x) - circle.point.x, (ab.y * t + line.point1.y) - circle.point.y);
		let h2 = h.dot(h);
		return h2 <= circle.radius * circle.radius;
	}

	public static lineToRect(line : Line, rect : Rect) : boolean {
		return this.rectToLine(rect, line);
	}

	public static lineToPolygon(line : Line, polygon : Polygon) : boolean {
		return this.polygonToLine(polygon, line);
	}


	// Rectangle:

	public static rectToPoint(rect : Rect, point : Vec) : boolean {
		return point.x >= rect.point1.x && point.x <= rect.point1.x + rect.width && point.y >= rect.point1.y && point.y <= rect.point1.y + rect.height;
	}

	public static rectToRect(rect1 : Rect, rect2 : Rect) : boolean {
		return rect1.point1.x < rect2.point1.x + rect2.width
			&& rect1.point1.x + rect1.width > rect2.point1.x 
			&& rect1.point1.y < rect2.point1.y + rect2.height
			&& rect1.point1.y + rect1.height > rect2.point1.y;
	}

	public static rectToLine(rect : Rect, line : Line) : boolean {
		if (this.rectToPoint(rect, line.point1) || this.rectToPoint(rect, line.point2))
			return true;

		return this.lineToLine(line, new Line(new Vec(rect.point1.x, rect.point1.y), new Vec(rect.point1.x + rect.width, rect.point1.y)), true) ||
			this.lineToLine(line, new Line(new Vec(rect.point1.x + rect.width, rect.point1.y), new Vec(rect.point1.x + rect.width, rect.point1.y + rect.height)), true) ||
			this.lineToLine(line, new Line(new Vec(rect.point1.x, rect.point1.y + rect.height), new Vec(rect.point1.x + rect.width, rect.point1.y + rect.height)), true) ||
			this.lineToLine(line, new Line(new Vec(rect.point1.x, rect.point1.y), new Vec(rect.point1.x, rect.point1.y + rect.height)), true)
	}

	public static rectToCircle(rect : Rect, circle : Circle) : boolean {
		let hw = rect.width / 2;
		let hh = rect.height / 2;
		let distX = Math.abs(circle.point.x - (rect.point1.x + rect.width / 2));
		let distY = Math.abs(circle.point.y - (rect.point1.y + rect.height / 2));

		if (distX > hw + circle.radius || distY > hh + circle.radius)
			return false;
		if (distX <= hw || distY <= hh)
			return true;

		let x = distX - hw;
		let y = distY - hh;
		return x * x + y * y <= circle.radius * circle.radius;
	}

	public static rectToPolygon(rect : Rect, polygon : Polygon) : boolean {
		let rectPoly : Polygon = new Polygon([
			new Vec(rect.point1.x, rect.point1.x), 
			new Vec(rect.point1.x + rect.width, rect.point1.y), 
			new Vec(rect.point1.x + rect.width, rect.point1.y + rect.height), 
			new Vec(rect.point1.x, rect.point1.y + rect.height)
		]);
		return this.polygonToPolygon(polygon, rectPoly);
	}


	// Circle: 

	public static circleToRect(circle : Circle, rect : Rect) : boolean {
		return this.rectToCircle(rect, circle);
	}

	public static circleToCircle(circle1 : Circle, circle2 : Circle) : boolean {
		let x = circle1.point.x - circle2.point.x;
		let y = circle2.point.y - circle1.point.y;
		let radii = circle1.radius + circle2.radius;
		return x * x + y * y <= radii * radii;
	}

	public static circleToLine(circle : Circle, line : Line) : boolean {
		return this.lineToCircle(line, circle);
	}

	public static circleToPoint(circle : Circle, point : Vec) : boolean {
		var x = point.x - circle.point.x;
		var y = point.y - circle.point.y;
		return x * x + y * y <= circle.radius * circle.radius;
	}

	public static circleToPolygon(circle : Circle, polygon : Polygon, tolerance : number = 1) : boolean {
		return this.polygonToCircle(polygon, circle, tolerance);
	}


	// Polygon:

	public static polygonToPolygon(polygon1 : Polygon, polygon2 : Polygon) : boolean {
		let polygons = [polygon1.points, polygon2.points];
		let minA, maxA, projected, i, i1, j, minB, maxB;

		for (i = 0; i < polygons.length; i++) {
			// for each polygon, look at each edge of the polygon, and determine if it separates
			// the two shapes
			let polygon = polygons[i];
			for (i1 = 0; i1 < polygon.length; i1++) {
				// grab 2 vertices to create an edge
				let i2 = (i1 + 1) % polygon.length;
				let p1 = polygon[i1];
				let p2 = polygon[i2];
				// find the line perpendicular to this edge
				let normal = { x: p2.y - p1.y, y: p1.x - p2.x };
				minA = maxA = undefined;
				// for each vertex in the first shape, project it onto the line perpendicular to the edge
				// and keep track of the min and max of these values
				for (j = 0; j < polygon1.points.length; j++) {
					projected = normal.x * polygon1.points[j].x + normal.y * polygon1.points[j].y;
					if (minA === undefined || projected < minA) {
						minA = projected;
					}
					if (maxA === undefined || projected > maxA) {
						maxA = projected;
					}
				}
				// for each vertex in the second shape, project it onto the line perpendicular to the edge
				// and keep track of the min and max of these values
				minB = maxB = undefined;
				for (j = 0; j < polygon2.points.length; j++) {
					projected = normal.x * polygon2.points[j].x + normal.y * polygon2.points[j].y;
					if (minB === undefined || projected < minB) {
						minB = projected;
					}
					if (maxB === undefined || projected > maxB) {
						maxB = projected;
					}
				}
				// if there is no overlap between the projects, the edge we are looking at separates the two
				// polygons, and we know there is no overlap
				if (maxA < minB || maxB < minA) {
					return false;
				}
			}
		}
		return true;
	}

	public static polygonToRect(polygon : Polygon, rect : Rect) : boolean {
		return this.rectToPolygon(rect, polygon);
	}

	public static polygonToCircle(polygon : Polygon, circle : Circle, tolerance : number = 1) : boolean {
		if (this.polygonToPoint(polygon, circle.point, tolerance))
			return true;
		const count = polygon.points.length;
		for (var i = 0; i < count; ++i) {
			if (this.lineToCircle(new Line(polygon.points[i], polygon.points[i + 1]), circle))
				return true;
		}
		return this.lineToCircle(new Line(polygon.points[0], polygon.points[count - 1]), circle);
	}

	public static polygonToPoint(polygon : Polygon, point : Vec, tolerance : number = 1) : boolean {
		const length = polygon.points.length;
		let c = false;
		for (let i = 0, j = length; i < length; ++i) {
			if (((polygon.points[i].y > point.y) !== (polygon.points[j].y > point.y)) 
				&& (point.x < (polygon.points[j].x - polygon.points[i].x) * (point.y - polygon.points[i].y) / (polygon.points[j].y - polygon.points[i].y) + polygon.points[i].x)) {
				c = !c;
			}
			j = i;
		}
		if (c) {
			return true;
		}
		for (let i = 0; i < length; ++i) {
			let p1 = Vec.from(polygon.points[i]);
			let p2;
			if (i === length) {
				p2 = Vec.from(polygon.points[0]);
			}
			else {
				p2 = Vec.from(polygon.points[i + 1]);
			}
			if (this.lineToPoint(new Line(p1, p2), point, tolerance)) {
				return true;
			}
		}
		return false;
	}

	public static polygonToLine(polygon : Polygon, line : Line, tolerance : number = 1) : boolean {
		const length = polygon.points.length;
		// check if first point is inside the shape (this covers if the line is completely enclosed by the shape)
		if (this.polygonToPoint(polygon, line.point1, tolerance)) {
			return true;
		}
		// check for intersections for all of the sides
		for (var i = 0; i < length; ++i) {
			let j = (i + 1) % polygon.points.length;
			if (this.lineToLine(line, new Line(polygon.points[i], polygon.points[j]), true)) {
				return true;
			}
		}
		return false;
	}
}