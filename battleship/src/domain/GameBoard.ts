import { Ship } from './Ship';

class GameBoard{
    readonly width: number;
    readonly height: number;
    private missedAttacksPrivate: number;
    private checkedBoard: Array<Array<boolean>>;
    private placedBoard: Array<Array<[number, Ship]>>;

    constructor(width, height){
        if (width < 1 || height < 1){
            throw Error('Both the width and the height must be at least 1');
        }
        this.width = width;
        this.height = height;
        this.missedAttacksPrivate = 0;
        this.checkedBoard = new Array(height);
        this.placedBoard = new Array(height);

        for (let i = 0; i < height; i++){
            this.checkedBoard[i] = new Array(width);
            this.checkedBoard[i].fill(false);

            this.placedBoard[i] = new Array(width);
            this.placedBoard[i].fill(null);
        }
    }

    placeShip(x: number, y: number, length: number, vertical: boolean = false): void{
        if (x < 0 || x >= this.width || y < 0 || y >= this.height){
            throw Error('Coordinates must be within the limits of the board');
        }
        if ((vertical && y + length - 1 >= this.height) || (!vertical && x + length - 1 >= this.width)){
            throw Error('The ship is too long; it goes beyond the board\'s dimensions');
        }

        let collides = false;
        if (vertical){
            for (let i = y; i < y + length && !collides; i++){
                if (this.placedBoard[x][i] != null){
                    collides = true;
                }
            }
        }else{
            for (let i = x; i < x + length && !collides; i++){
                if (this.placedBoard[i][y] != null){
                    collides = true;
                }
            }
        }

        if (collides){
            throw Error('The new ship collides with an already existing ship');
        }

        const newShip: Ship = new Ship(length);

        if (vertical){
            for (let i = 0; i < length; i++){
                this.placedBoard[x][i + y] = [i, newShip];
            }
        }else{
            for (let i = 0; i < length; i++){
                this.placedBoard[i + x][y] = [i, newShip];
            }
        }
    }

    receiveAttack(x: number, y: number): boolean{ // True if attack was successful
        if (x < 0 || x >= this.width || y < 0 || y >= this.height){
            throw Error('Coordinates must be within the limits of the board');
        }

        if (this.checkedBoard[x][y]){
            throw Error('This coordinate has already been attacked');
        }

        this.checkedBoard[x][y] = true;
        const successful = this.placedBoard[x][y] != null;
        if (successful){
            this.placedBoard[x][y][1].hit(this.placedBoard[x][y][0]);
        }else{
            this.missedAttacksPrivate++;
        }

        return successful;
    }

    isSunk(): boolean{
        let sunk = true;
        for (const row of this.placedBoard){
            for (const ship of row){
                if (ship != null && !ship[1].isSunk()){
                    sunk = false;
                    break;
                }
            }
            if (!sunk){
                break;
            }
        }

        return sunk;
    }

    get missedAttacks(): number{
        return this.missedAttacksPrivate;
    }

    get checkedArray(): Array<Array<boolean>>{
        return this.checkedBoard;
    }
}

export { GameBoard };
