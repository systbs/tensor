class Tensor<T extends number> extends Array<T>{
	constructor(...values: T[]) {
		super(...values);
	}
	static sgn(x: number) {
		return x > 0 ? 1 : x < 0 ? -1 : 0;
	}
	static civita<R extends number>(...direction: number[]): R {
		return direction.reduce((r, a, i) => {
			for (let j = i + 1; j < direction.length; j++) {
				r = r * this.sgn(direction[j] - a);
			}
			return r;
		}, 1) as R;
	}
	static permutate(xs: number[]): number[][] {
		if (!xs.length) return [[]];
		return xs.flatMap(x => {
			return Tensor.permutate(xs.filter(v => v !== x)).map(vs => [x, ...vs]);
		});
	}

	plus(t: Tensor<T>): Tensor<T> {
		return this.map<T>((a, n) => (a + t[n]) as T) as Tensor<T>;
	}
	minus(t: Tensor<T>): Tensor<T> {
		return this.map<T>((a, n) => (a - t[n]) as T) as Tensor<T>;
	}
	dot(t: Tensor<T>): T {
		return this.reduce<T>((result, a, n) => {
			return (result + a * t[n]) as T;
		}, 0 as T);
	}
	cross(t: Tensor<T>): Tensor<T> {
		const n = this.length;
		const response = new Tensor<T>();
		for (let i = 0; i < n; i++) {
			let value = 0;
			for (let j = 0; j < n; j++) {
				for (let k = 0; k < n; k++) {
					value += Tensor.civita<T>(i, j, k) * this[j] * t[k];
				}
			}
			response.push(value as T);
		}
		return response;
	}
	norm(): T {
		return Math.sqrt(this.reduce((r, v) => r + Math.pow(v, 2), 0)) as T;
	}
	multiple(t: T): Tensor<T> {
		return this.map<T>((a) => (a * t) as T) as Tensor<T>;
	}
	divide(t: T): Tensor<T> {
		return this.map<T>((a) => (a / t) as T) as Tensor<T>;
	}
}

export default Tensor;
