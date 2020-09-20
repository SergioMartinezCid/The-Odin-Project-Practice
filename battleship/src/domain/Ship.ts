class Ship{
    readonly length: number;
    private hitList: Array<boolean>;

    constructor(length: number){
        if (length <= 0){
            throw Error('The length must be a positive whole number');
        }
        this.length = length;
        this.hitList = new Array(this.length);
        this.hitList.fill(false);
    }

    hit(position: number): void{
        if (position < 0){
            throw Error('The position must be a non-negative value');
        }
        if (this.hitList[position]){
            throw Error('Cannot hit that position twice');
        }
        this.hitList[position] = true;
    }

    isHit(position: number): boolean{
        if (position < 0){
            throw Error('The position must be a non-negative value');
        }
        return this.hitList[position];
    }

    isSunk(): boolean{
        return this.hitList.reduce((curr, prev) => curr && prev, true);
    }
}

export { Ship };
