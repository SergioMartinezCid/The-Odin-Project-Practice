import { GameBoard } from './GameBoard';

test('Constructor: correct dimensions', () => {
    expect(() => new GameBoard(8, 8)).not.toThrow();
});

test('Constructor: incorrect dimensions', () => {
    expect(() => new GameBoard(0, -1)).toThrow();
});

test('placeShip: correct arguments', () => {
    const board: GameBoard = new GameBoard(8, 8);
    expect(() => board.placeShip(0, 0, 3, true)).not.toThrow();
});

test('placeShip: incorrect coordinates', () => {
    const board: GameBoard = new GameBoard(8, 8);
    expect(() => board.placeShip(-1, 8, 3, true)).toThrow();
});

test('placeShip: skip vertical', () => {
    const board: GameBoard = new GameBoard(8, 8);
    expect(() => board.placeShip(0, 0, 3)).not.toThrow();
});

test('placeShip: ship too long (vertical)', () => {
    const board: GameBoard = new GameBoard(8, 8);
    expect(() => board.placeShip(7, 6, 3, true)).toThrow();
});

test('placeShip: ship too long (horizontal)', () => {
    const board: GameBoard = new GameBoard(8, 8);
    expect(() => board.placeShip(7, 6, 3, false)).toThrow();
});

test('placeShip: ship overlaps with another placed ship', () => {
    const board: GameBoard = new GameBoard(8, 8);
    board.placeShip(3, 3, 4, true);
    expect(() => board.placeShip(1, 5, 4, false)).toThrow();
});

test('receiveAttack: incorrect coordinates', () => {
    const board: GameBoard = new GameBoard(8, 8);
    expect(() => board.receiveAttack(-1, 8)).toThrow();
});

test('receiveAttack: attack unsuccesful', () => {
    const board: GameBoard = new GameBoard(8, 8);
    board.placeShip(0, 0, 1, true);
    expect(board.receiveAttack(0, 1)).toBeFalsy();
});

test('receiveAttack: attack succesful', () => {
    const board: GameBoard = new GameBoard(8, 8);
    board.placeShip(0, 0, 1, true);
    expect(board.receiveAttack(0, 0)).toBeTruthy();
});

test('receiveAttack: attack twice same coordinate', () => {
    const board: GameBoard = new GameBoard(8, 8);
    board.placeShip(0, 1, 1);
    board.receiveAttack(0, 0);
    expect(() => board.receiveAttack(0, 0)).toThrow();
});

test('receiveAttack: sunk board', () => {
    const board: GameBoard = new GameBoard(8, 8);
    board.placeShip(0, 0, 1, true);
    board.receiveAttack(0, 0);
    expect(() => board.receiveAttack(0, 1)).toThrow();
});

test('missedAttacks: initial board', () => {
    const board: GameBoard = new GameBoard(8, 8);
    expect(board.missedAttacks).toBe(0);
});

test('missedAttacks: failed several', () => {
    const board: GameBoard = new GameBoard(8, 8);
    board.placeShip(1, 1, 1);
    board.receiveAttack(0, 0);
    board.receiveAttack(1, 0);
    expect(board.missedAttacks).toBe(2);
});

test('isSunk: initial board', () => {
    const board: GameBoard = new GameBoard(8, 8);
    expect(board.isSunk()).toBeTruthy();
});

test('isSunk: unsunk ship', () => {
    const board: GameBoard = new GameBoard(8, 8);
    board.placeShip(0, 0, 1);
    expect(board.isSunk()).toBeFalsy();
});

test('isSunk: sunk ship', () => {
    const board: GameBoard = new GameBoard(8, 8);
    board.placeShip(0, 0, 1);
    board.receiveAttack(0, 0);
    expect(board.isSunk()).toBeTruthy();
});
