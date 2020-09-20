import { ExternalExpr } from '@angular/compiler';
import { Ship } from './Ship';

it('Constructor: correct', () => {
    expect(() => new Ship(1)).not.toThrow();
});

it('Constructor: non-positive lenght', () => {
    expect(() => new Ship(0)).toThrow();
});

it('Constructor: decimal lenght', () => {
    expect(() => new Ship(2.3)).toThrow();
});

it('Hit: basic index', () => {
    const ship: Ship = new Ship(3);
    expect(() => ship.hit(0)).not.toThrow();
});

it('Hit: invalid index', () => {
    const ship: Ship = new Ship(3);
    expect(() => ship.hit(-1)).toThrow();
});

it('Hit: repeated index', () => {
    const ship: Ship = new Ship(3);
    ship.hit(0);
    expect(() => ship.hit(0)).toThrow();
});

it('isHit: basic index', () => {
    const ship: Ship = new Ship(3);
    ship.hit(0);
    expect(ship.isHit(0)).toBeTruthy();
});

it('isHit: invalid index', () => {
    const ship: Ship = new Ship(3);
    expect(() => ship.isHit(-1)).toThrow();
});

it('isSunk: new ship', () => {
    const ship: Ship = new Ship(2);
    expect(ship.isSunk()).not.toBeTruthy();
});

it('isSunk: half-sunk ship', () => {
    const ship: Ship = new Ship(2);
    ship.hit(0);
    expect(ship.isSunk()).not.toBeTruthy();
});

it('isSunk: sunk ship', () => {
    const ship: Ship = new Ship(2);
    ship.hit(0);
    ship.hit(1);
    expect(ship.isSunk()).toBeTruthy();
});
