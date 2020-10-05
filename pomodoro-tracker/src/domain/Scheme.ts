class Scheme{
    private pomodoroDurationP: number;
    private shortBreakDurationP: number;
    private longBreakDurationP: number;
    private longBreakDelayP: number;
    private breakCount: number;
    private isBreak: boolean;
    private periodDuration: number;

    constructor(pomodoroDuration: number, shortBreakDuration: number, longBreakDuration: number, longBreakDelay: number){
        this.pomodoroDuration = pomodoroDuration;
        this.shortBreakDuration = shortBreakDuration;
        this.longBreakDuration = longBreakDuration;
        this.longBreakDelay = longBreakDelay;
        this.periodDuration = this.pomodoroDuration;
        this.resetScheme();
    }

    /**
     * simulatePeriods
     *
     * This method simulates the generation of periods, and returns the final status
     * @param n Number of periods to be simulated
     * @param isBreak Whether the current period is a break
     * @param breakCount The number of breaks taken mod 4
     * @returns A tuple containing the final value of isBreak, the final value of breakCount and the accumulated period length
     */
    private simulatePeriods(isBreak: boolean, breakCount: number, n: number = 1):
        {isBreak: boolean, breakCount: number, cumulativeDuration: number}{

        let cumulativeDuration = 0;

        for (let i = 0; i < n; i++){
            isBreak = !isBreak;
            if (isBreak){
                breakCount = (breakCount + 1) % this.longBreakDelay;
                cumulativeDuration += breakCount === 0 ? this.longBreakDuration : this.shortBreakDuration;
            } else {
                cumulativeDuration += this.pomodoroDuration;
            }
        }

        return {isBreak, breakCount, cumulativeDuration};
    }

    public generatePeriod(): void{
        const result = this.simulatePeriods(this.isBreak, this.breakCount);
        this.isBreak = result.isBreak;
        this.breakCount = result.breakCount;
        this.periodDuration = result.cumulativeDuration;
    }

    public resetScheme(): void{
        this.breakCount = 0;
        this.isBreak = false;
    }

    public getFinalizationTime(n: number): number{
        return this.simulatePeriods(this.isBreak, this.breakCount, n).cumulativeDuration;
    }

    public getPeriodDuration(): number{
        return this.periodDuration;
    }

    public isPeriodBreak(): boolean{
        return this.isBreak;
    }

    public get pomodoroDuration(): number{
        return this.pomodoroDurationP;
    }

    public set pomodoroDuration(pomodoroDuration: number){
        if (pomodoroDuration <= 59 || !Number.isInteger(pomodoroDuration) || pomodoroDuration % 60 !== 0){
            throw new Error('All durations must be positive integers');
        }
        this.pomodoroDurationP = pomodoroDuration;
    }

    public get shortBreakDuration(): number{
        return this.shortBreakDurationP;
    }

    public set shortBreakDuration(shortBreakDuration: number){
        if (shortBreakDuration <= 59 || !Number.isInteger(shortBreakDuration) || shortBreakDuration % 60 !== 0){
            throw new Error('All durations must be positive integers');
        }
        this.shortBreakDurationP = shortBreakDuration;
    }

    public get longBreakDuration(): number{
        return this.longBreakDurationP;
    }

    public set longBreakDuration(longBreakDuration: number){
        if (longBreakDuration <= 59 || !Number.isInteger(longBreakDuration) || longBreakDuration % 60 !== 0){
            throw new Error('All durations must be positive integers');
        }
        this.longBreakDurationP = longBreakDuration;
    }

    public get longBreakDelay(): number{
        return this.longBreakDelayP;
    }

    public set longBreakDelay(longBreakDelay: number){
        if (longBreakDelay <= 0 || !Number.isInteger(longBreakDelay)){
            throw new Error('The delay between long breaks must be a positive integer');
        }
        this.longBreakDelayP = longBreakDelay;
    }
}

export { Scheme };
