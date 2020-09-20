import { GameBoard } from './GameBoard';
import { Player } from './Player';

test('Constructor: basic case', () => {
    const board: GameBoard = new GameBoard(8, 8);
    const p1: Player = new Player('Player 1', board);
    expect(p1.name).toBe('Player 1');
    expect(p1.ownBoard).toBe(board);
});

test('Constructor: invalid name', () => {
    expect(() => new Player(' ', new GameBoard(8, 8))).toThrow();
});

test('Constructor: invalid board', () => {
    expect(() => new Player('Player 1', null)).toThrow();
});

test('setOpponents: basic input', () => {
    const p1: Player = new Player('P1', new GameBoard(8, 8));
    const p2: Player = new Player('P2', new GameBoard(8, 8));
    Player.setOpponents(p1, p2);
    expect(p1.enemyBoard).toBe(p2.ownBoard);
    expect(p2.enemyBoard).toBe(p1.ownBoard);
});

test('setOpponents: unavailable player', () => {
    const p1: Player = new Player('P1', new GameBoard(8, 8));
    p1.enemyBoard = new GameBoard(8, 8);
    expect(() => Player.setOpponents(p1, new Player('P2', new GameBoard(8, 8)))).toThrow();
});

test('setOpponents: identical players', () => {
    const p1: Player = new Player('P1', new GameBoard(8, 8));
    expect(() => Player.setOpponents(p1, p1)).toThrow();
});

test('setOpponents: identical boards', () => {
    const board = new GameBoard(8, 8);

    expect(() => Player.setOpponents(new Player('P1', board),
        new Player('P2', board))).toThrow();
});
