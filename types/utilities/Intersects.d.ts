import Vec from "./Vec";
import { Rect, Circle, Line, Polygon } from "./Primitives";
export default class Intersects {
    static lineToPoint(line: Line, point: Vec, tolerance?: number): boolean;
    static lineToLine(line1: Line, line2: Line, includeEnds: boolean): boolean;
    static lineToCircle(line: Line, circle: Circle): boolean;
    static lineToRect(line: Line, rect: Rect): boolean;
    static lineToPolygon(line: Line, polygon: Polygon): boolean;
    static rectToPoint(rect: Rect, point: Vec): boolean;
    static rectToRect(rect1: Rect, rect2: Rect): boolean;
    static rectToLine(rect: Rect, line: Line): boolean;
    static rectToCircle(rect: Rect, circle: Circle): boolean;
    static rectToPolygon(rect: Rect, polygon: Polygon): boolean;
    static circleToRect(circle: Circle, rect: Rect): boolean;
    static circleToCircle(circle1: Circle, circle2: Circle): boolean;
    static circleToLine(circle: Circle, line: Line): boolean;
    static circleToPoint(circle: Circle, point: Vec): boolean;
    static circleToPolygon(circle: Circle, polygon: Polygon, tolerance?: number): boolean;
    static polygonToPolygon(polygon1: Polygon, polygon2: Polygon): boolean;
    static polygonToRect(polygon: Polygon, rect: Rect): boolean;
    static polygonToCircle(polygon: Polygon, circle: Circle, tolerance?: number): boolean;
    static polygonToPoint(polygon: Polygon, point: Vec, tolerance?: number): boolean;
    static polygonToLine(polygon: Polygon, line: Line, tolerance?: number): boolean;
}
