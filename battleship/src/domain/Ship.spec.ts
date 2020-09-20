import { ExternalExpr } from '@angular/compiler';
import { Ship } from './Ship';

test('Constructor: correct', () => {
    expect(() => new Ship(1)).not.toThrow();
});

test('Constructor: non-positive lenght', () => {
    expect(() => new Ship(0)).toThrow();
});

test('Constructor: decimal lenght', () => {
    expect(() => new Ship(2.3)).toThrow();
});

test('Hit: basic index', () => {
    const ship: Ship = new Ship(3);
    expect(() => ship.hit(0)).not.toThrow();
});

test('Hit: invalid index', () => {
    const ship: Ship = new Ship(3);
    expect(() => ship.hit(-1)).toThrow();
});

test('Hit: repeated index', () => {
    const ship: Ship = new Ship(3);
    ship.hit(0);
    expect(() => ship.hit(0)).toThrow();
});

test('isHit: basic index', () => {
    const ship: Ship = new Ship(3);
    ship.hit(0);
    expect(ship.isHit(0)).toBeTruthy();
});

test('isHit: invalid index', () => {
    const ship: Ship = new Ship(3);
    expect(() => ship.isHit(-1)).toThrow();
});

test('isSunk: new ship', () => {
    const ship: Ship = new Ship(2);
    expect(ship.isSunk()).not.toBeTruthy();
});

test('isSunk: half-sunk ship', () => {
    const ship: Ship = new Ship(2);
    ship.hit(0);
    expect(ship.isSunk()).not.toBeTruthy();
});

test('isSunk: sunk ship', () => {
    const ship: Ship = new Ship(2);
    ship.hit(0);
    ship.hit(1);
    expect(ship.isSunk()).toBeTruthy();
});
