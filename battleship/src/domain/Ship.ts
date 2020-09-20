class Ship{
    private length: number;
    private hitList: Array<boolean>;

    constructor(length: number){
        this.length = length;
        this.hitList = new Array(this.length);
        this.hitList.fill(false);
    }

    hit(position: number): void{
        if (this.hitList[position]){
            throw Error('Cannot hit that position twice');
        }
        this.hitList[position] = true;
    }

    isHit(position: number): boolean{
        return this.hitList[position];
    }

    isSunk(): boolean{
        return this.hitList.reduce((curr, prev) => curr && prev, true);
    }
}

export { Ship };
