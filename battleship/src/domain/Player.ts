import { GameBoard } from './GameBoard';

class Player{
    readonly name: string;
    readonly board: GameBoard;
    private opponentProtected: Player;
    turn: boolean;

    constructor(name: string, board: GameBoard){
        if (name.trim() === ''){
            throw Error('Name must contain non-white characters');
        }
        if (board == null){
            throw Error('Board must be valid');
        }
        this.name = name;
        this.board = board;
        this.opponentProtected = null;
        this.turn = null;
    }

    static setOpponents(p1: Player, p2: Player): void{
        if (p1 === p2){
            throw Error('Opponents must be different');
        }
        if (p1.board === p2.board){
            throw Error('The board of each opponent must be different');
        }

        p1.turn = true;
        p2.turn = false;
        p2.opponent = p1;
        p1.opponent = p2;
    }

    receiveAttack(x: number, y: number): boolean{
        if (this.turn){
            throw Error('This player must attack; it cannot be attacked now');
        }
        const result = this.board.receiveAttack(x, y);
        this.turn = true;
        this.opponent.turn = false;
        return result;
    }

    get opponent(): Player{
        return this.opponentProtected;
    }

    set opponent(opponent: Player){
        if (this.opponentProtected != null){
            throw Error('The enemy board can only be written once');
        }
        this.opponentProtected = opponent;
    }
}

export { Player };
