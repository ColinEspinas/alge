export default class Vec {

	public x : number;
	public y : number;
	public z ?: number;

	constructor(x : number, y : number, z ?: number) {
		this.x = x;
		this.y = y;
		if (z)
			this.z = z;
	}

	public equals(v : Vec, tolerance : number) : boolean {
		if (tolerance == undefined) {
		  tolerance = 0.0000001;
		}
		return (Math.abs(v.x - this.x) <= tolerance) && (Math.abs(v.y - this.y) <= tolerance) && (Math.abs(v.z - this.z) <= tolerance);
	};

	public add(v : Vec) : Vec {
		this.x += v.x;
		this.y += v.y;
		if (this.z) {
			this.z += v.z;
		}
		return this;
	};

	public sub(v : Vec) : Vec  {
		this.x -= v.x;
		this.y -= v.y;
		if (this.z) {
			this.z -= v.z;
		}
		return this;
	};

	public scale(f : number) : Vec  {
		this.x *= f;
		this.y *= f;
		if (this.z) {
			this.z *= f;
		}
		return this;
	};

	public distance(v : Vec) {
		var dx = v.x - this.x;
		var dy = v.y - this.y;
		var dz = v.z - this.z;
		if (dz) {
			return Math.sqrt(dx * dx + dy * dy + dz * dz);
		}
		return Math.sqrt(dx * dx + dy * dy);
	};

	public squareDistance(v : Vec) {
		var dx = v.x - this.x;
		var dy = v.y - this.y;
		var dz = v.z - this.z;
		if (dz) {
			return dx * dx + dy * dy + dz * dz;
		}
		return dx * dx + dy * dy;
	};

	public simpleDistance(v : Vec) {
		var dx = Math.abs(v.x - this.x);
		var dy = Math.abs(v.y - this.y);
		var dz = Math.abs(v.z - this.z);
		if (dz) {
			return Math.min(dx, dy, dz);
		}
		return Math.min(dx, dy);
	};

	public dot(v : Vec) : number {
		if (this.z) {
			return this.x * v.x + this.y * v.y + this.z * v.z;
		}
		return this.x * v.x + this.y * v.y;
	};

	public cross(v : Vec) : Vec {
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

	public length() : number {
		if (this.z) {
			return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
		}
		return Math.sqrt(this.x * this.x + this.y * this.y);
	};

	public normalize() : Vec {
		var len = this.length();
		if (len > 0) {
			this.scale(1 / len);
		}
		return this;
	};

	public limit(s : number) : Vec {
		var len = this.length();
		if (len > s && len > 0) {
			this.scale(s / len);
		}
		return this;
	};

	public lerp(v : Vec, t : number) : Vec {
		this.x = this.x + (v.x - this.x) * t;
		this.y = this.y + (v.y - this.y) * t;
		this.z = this.z + (v.z - this.z) * t;
		return this;
	}

	public toString() : string {
		return "{" + Math.floor(this.x*1000)/1000 + ", " + Math.floor(this.y*1000)/1000 + ", " + Math.floor(this.z*1000)/1000 + "}";
	};

	public static zero() { return new Vec(0, 0, 0); }
	public static one() { return new Vec(1, 1, 1); }
	public static up() { return new Vec(0, -1, 0); }
	public static down() { return new Vec(0, 1, 0); }
	public static left() { return new Vec(-1, 0, 0); }
	public static right() { return new Vec(1, 0, 0); }
	public static front() { return new Vec(0, 0, 1); }
	public static back() { return new Vec(0, 0, -1); }

	public static from(v : Vec) : Vec {
		if (v) {
			if (v.z) return new Vec(v.x, v.y, v.z);
			return new Vec(v.x, v.y);
		}
	}

	public static fromArray(a : number[]) : Vec {
		return new Vec(a[0], a[1], a[2]);
	}
}