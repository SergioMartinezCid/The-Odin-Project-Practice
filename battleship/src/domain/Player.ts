import { thisExpression } from '@babel/types';
import { GameBoard } from './GameBoard';

class Player{
    name: string;
    ownBoard: GameBoard;
    enemyBoard: GameBoard;

    constructor(name: string, board: GameBoard){
        if (name.trim() === ''){
            throw Error('Name must contain non-white characters');
        }
        if (board == null){
            throw Error('Board must be valid');
        }
        this.name = name;
        this.ownBoard = board;
        this.enemyBoard = null;
    }

    static setOpponents(p1: Player, p2: Player): void{
        if (p1.enemyBoard != null || p2.enemyBoard != null){
            throw Error('Both opponents must not be in a match');
        }
        if (p1 === p2){
            throw Error('Opponents must be different');
        }
        if (p1.ownBoard === p2.ownBoard){
            throw Error('The board of each opponent must be different');
        }

        p1.enemyBoard = p2.ownBoard;
        p2.enemyBoard = p1.ownBoard;
    }
}

export { Player };
