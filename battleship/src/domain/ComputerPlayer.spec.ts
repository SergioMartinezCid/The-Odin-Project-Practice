import { GameBoard } from './GameBoard';
import { ComputerPlayer } from './ComputerPlayer';
import { Player } from './Player';

test('Constructor: basic case', () => {
    const board: GameBoard = new GameBoard(8, 8);
    const p1: ComputerPlayer = new ComputerPlayer(board);
    expect(p1.name).toBe('Computer');
    expect(p1.board).toBe(board);
});

test('Constructor: invalid board', () => {
    expect(() => new ComputerPlayer(null)).toThrow();
});

test('receiveAttack: computer wins', () => {
    const mockMath = Object.create(global.Math);
    mockMath.random = () => 0;
    global.Math = mockMath;

    const p1: ComputerPlayer = new ComputerPlayer(new GameBoard(1, 4));
    p1.board.placeShip(0, 2, 1);
    const p2: Player = new Player('Human Player', new GameBoard(1, 4));
    p2.board.placeShip(0, 2, 1);
    Player.setOpponents(p1, p2);
    expect(() => {
        p1.receiveAttack(0, 0);
        p1.receiveAttack(0, 1);
    }).not.toThrow();
    expect(p1.board.isSunk()).toBeFalsy();
    expect(p2.board.isSunk()).toBeTruthy();
});

test('receiveAttack: computer loses', () => {
    const mockMath = Object.create(global.Math);
    mockMath.random = () => 0;
    global.Math = mockMath;

    const p1: ComputerPlayer = new ComputerPlayer(new GameBoard(1, 4));
    p1.board.placeShip(0, 2, 1);
    const p2: Player = new Player('Human Player', new GameBoard(1, 4));
    p2.board.placeShip(0, 1, 1);
    Player.setOpponents(p1, p2);
    expect(() => {
        p1.receiveAttack(0, 0);
        p1.receiveAttack(0, 2);
    }).not.toThrow();
    expect(p1.board.isSunk()).toBeTruthy();
    expect(p2.board.isSunk()).toBeFalsy();
});
