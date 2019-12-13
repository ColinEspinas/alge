export default class Vec {

	x : number;
	y : number;
	z ?: number;

	constructor(x : number, y : number, z ?: number) {
		this.x = x;
		this.y = y;
		if (z)
			this.z = z;
	}

	static FromArray = function(a) {
		return new Vec(a[0], a[1], a[2]);
	}

	Equals(v, tolerance) {
		if (tolerance == undefined) {
		  tolerance = 0.0000001;
		}
		return (Math.abs(v.x - this.x) <= tolerance) && (Math.abs(v.y - this.y) <= tolerance) && (Math.abs(v.z - this.z) <= tolerance);
	};

	Add(v : Vec) {
		this.x += v.x;
		this.y += v.y;
		if (this.z) {
			this.z += v.z;
		}
		return this;
	};

	Sub(v : Vec) {
		this.x -= v.x;
		this.y -= v.y;
		if (this.z) {
			this.z -= v.z;
		}
		return this;
	};

	Scale(f : number) {
		this.x *= f;
		this.y *= f;
		if (this.z) {
			this.z *= f;
		}
		return this;
	};

	Distance(v : Vec) {
		var dx = v.x - this.x;
		var dy = v.y - this.y;
		var dz = v.z - this.z;
		if (dz) {
			return Math.sqrt(dx * dx + dy * dy + dz * dz);
		}
		return Math.sqrt(dx * dx + dy * dy);
	};

	SquareDistance(v : Vec) {
		var dx = v.x - this.x;
		var dy = v.y - this.y;
		var dz = v.z - this.z;
		if (dz) {
			return dx * dx + dy * dy + dz * dz;
		}
		return dx * dx + dy * dy;
	};

	SimpleDistance(v : Vec) {
		var dx = Math.abs(v.x - this.x);
		var dy = Math.abs(v.y - this.y);
		var dz = Math.abs(v.z - this.z);
		if (dz) {
			return Math.min(dx, dy, dz);
		}
		return Math.min(dx, dy);
	};

	Dot(b) {
		if (this.z) {
			return this.x * b.x + this.y * b.y + this.z * b.z;
		}
		return this.x * b.x + this.y * b.y;
	};

	Cross(v) {
		var x = this.x;
		var y = this.y;
		var z = this.z;
		var vx = v.x;
		var vy = v.y;
		var vz = v.z;
		this.x = y * vz - z * vy;
		this.y = z * vx - x * vz;
		this.z = x * vy - y * vx;
		return this;
	};
}