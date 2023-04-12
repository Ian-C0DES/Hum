import { Connect } from 'vite';
import { describe, it, expect } from 'vitest';

describe('sum test', () => {
	it('adds 1 + 2 to equal 3', () => {
		expect(1 + 2).toBe(3);
	});
});

describe('DB Connection test', () => {
	it('Connect to pocketbase db', () => {
		let pb = new PocketBase('http://143.42.138.135:8080');
		expect(1).toBe(2);
	});
});
