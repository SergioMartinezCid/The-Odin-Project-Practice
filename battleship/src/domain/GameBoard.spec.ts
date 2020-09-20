import { GameBoard } from './GameBoard';

it('Constructor: correct dimensions', () => {
    expect(() => new GameBoard(8, 8)).not.toThrow();
});

it('Constructor: incorrect dimensions', () => {
    expect(() => new GameBoard(0, -1)).toThrow();
});

it('placeShip: correct arguments', () => {
    const board: GameBoard = new GameBoard(8, 8);
    expect(() => board.placeShip(0, 0, 3, true)).not.toThrow();
});

it('placeShip: incorrect coordinates', () => {
    const board: GameBoard = new GameBoard(8, 8);
    expect(() => board.placeShip(-1, 8, 3, true)).toThrow();
});

it('placeShip: skip vertical', () => {
    const board: GameBoard = new GameBoard(8, 8);
    expect(() => board.placeShip(0, 0, 3)).not.toThrow();
});

it('placeShip: ship too long (vertical)', () => {
    const board: GameBoard = new GameBoard(8, 8);
    expect(() => board.placeShip(7, 6, 3, true)).toThrow();
});

it('placeShip: ship too long (horizontal)', () => {
    const board: GameBoard = new GameBoard(8, 8);
    expect(() => board.placeShip(7, 6, 3, false)).toThrow();
});

it('placeShip: ship overlaps with another placed ship', () => {
    const board: GameBoard = new GameBoard(8, 8);
    board.placeShip(3, 3, 4, true);
    expect(() => board.placeShip(1, 5, 4, false)).toThrow();
});

it('receiveAttack: incorrect coordinates', () => {
    const board: GameBoard = new GameBoard(8, 8);
    expect(() => board.receiveAttack(-1, 8)).toThrow();
});

it('receiveAttack: attack unsuccesful', () => {
    const board: GameBoard = new GameBoard(8, 8);
    expect(board.receiveAttack(0, 0)).toBeFalsy();
});

it('receiveAttack: attack succesful', () => {
    const board: GameBoard = new GameBoard(8, 8);
    board.placeShip(0, 0, 1, true);
    expect(board.receiveAttack(0, 0)).toBeTruthy();
});

it('receiveAttack: attack twice same coordinate', () => {
    const board: GameBoard = new GameBoard(8, 8);
    board.receiveAttack(0, 0);
    expect(() => board.receiveAttack(0, 0)).toThrow();
});

it('missedAttacks: initial board', () => {
    const board: GameBoard = new GameBoard(8, 8);
    expect(board.missedAttacks).toBe(0);
});

it('missedAttacks: failed several', () => {
    const board: GameBoard = new GameBoard(8, 8);
    board.receiveAttack(0, 0);
    board.receiveAttack(1, 0);
    expect(board.missedAttacks).toBe(2);
});

it('isSunk: initial board', () => {
    const board: GameBoard = new GameBoard(8, 8);
    expect(board.isSunk()).toBeTruthy();
});

it('isSunk: unsunk ship', () => {
    const board: GameBoard = new GameBoard(8, 8);
    board.placeShip(0, 0, 1);
    expect(board.isSunk()).toBeFalsy();
});

it('isSunk: sunk ship', () => {
    const board: GameBoard = new GameBoard(8, 8);
    board.placeShip(0, 0, 1);
    board.receiveAttack(0, 0);
    expect(board.isSunk()).toBeTruthy();
});
