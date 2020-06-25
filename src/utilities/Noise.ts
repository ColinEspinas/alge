import Tumult from "tumult";

export default class Noise {

	public static simplex(dimension : number, seed : number | string) {
		if (dimension === 1) {
			return new Tumult.Simplex1(seed);
		}
		if (dimension === 2) {
			return new Tumult.Simplex2(seed);
		}
	}

	public static perlin(dimension : number, seed : number | string) {
		if (dimension === 1) {
			return new Tumult.Perlin1(seed);
		}
		if (dimension === 2) {
			return new Tumult.Perlin2(seed);
		}
		if (dimension === 3) {
			return new Tumult.Perlin3(seed);
		}
		if (dimension === 4) {
			return new Tumult.Perlin4(seed);
		}
		if (dimension > 4) {
			return new Tumult.PerlinN(seed);
		}
	}

}