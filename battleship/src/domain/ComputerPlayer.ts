import { GameBoard } from './GameBoard';
import { Player } from './Player';

class ComputerPlayer extends Player{
    private readonly possibleMoves: Array<[number, number]>;

    constructor(board: GameBoard){
        super('Computer', board);
        this.possibleMoves = new Array();
    }

    private attack(): void{
        if (this.possibleMoves.length === 0){
            throw Error(`No available moves for ${this.name}`);
        }
        if (!this.turn || super.opponent.board.isSunk()){
            return;
        }

        let stop = false;
        while (!stop){
            try {
                const move: [number, number] = this.possibleMoves.pop();
                super.opponent.receiveAttack(move[0], move[1]);
                stop = true;
            } catch (error) {
                continue;
            }
        }
    }

    get opponent(): Player{
        return super.opponent;
    }

    set opponent(opponent: Player){
        super.opponent = opponent;

        this.possibleMoves.splice(0, this.possibleMoves.length);
        for (let i = 0; i < super.opponent.board.width; i++){
            for (let j = 0; j < super.opponent.board.height; j++){
                this.possibleMoves.push([i, j]);
            }
        }

        // Algorithm used for randomising the moves
        // from: https://stackoverflow.com/a/6274381
        for (let i = this.possibleMoves.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.possibleMoves[i], this.possibleMoves[j]] = [this.possibleMoves[j], this.possibleMoves[i]];
        }

        this.attack();
    }

    receiveAttack(x: number, y: number): boolean{
        const result = super.receiveAttack(x, y);
        this.attack();
        return result;
    }
}

export { ComputerPlayer };
