class Scheme{
    public pomodoroDurationP: number;
    public shortBreakDurationP: number;
    public longBreakDurationP: number;
    public longBreakDelayP: number;
    private breakCount = 0;
    private isBreak = true;
    private periodDuration: number;

    constructor(pomodoroDuration: number, shortBreakDuration: number, longBreakDuration: number, longBreakDelay: number){
        this.pomodoroDuration = pomodoroDuration;
        this.shortBreakDuration = shortBreakDuration;
        this.longBreakDuration = longBreakDuration;
        this.longBreakDelay = longBreakDelay;
        this.periodDuration = this.pomodoroDuration;
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
                cumulativeDuration += breakCount === 0 ? this.longBreakDelay : this.shortBreakDuration;
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
        if (pomodoroDuration <= 0 || !Number.isInteger(pomodoroDuration)){
            throw new Error('All durations must be positive integers');
        }
        this.pomodoroDurationP = pomodoroDuration;
    }

    public get shortBreakDuration(): number{
        return this.shortBreakDurationP;
    }

    public set shortBreakDuration(shortBreakDuration: number){
        if (shortBreakDuration <= 0 || !Number.isInteger(shortBreakDuration)){
            throw new Error('All durations must be positive integers');
        }
        this.shortBreakDurationP = shortBreakDuration;
    }

    public get longBreakDuration(): number{
        return this.longBreakDuration;
    }

    public set longBreakDuration(longBreakDuration: number){
        if (longBreakDuration <= 0 || !Number.isInteger(longBreakDuration)){
            throw new Error('All durations must be positive integers');
        }
        this.longBreakDurationP = longBreakDuration;
    }

    public get longBreakDelay(): number{
        return this.longBreakDelay;
    }

    public set longBreakDelay(longBreakDelay: number){
        if (longBreakDelay <= 0 || !Number.isInteger(longBreakDelay)){
            throw new Error('All durations must be positive integers');
        }
        this.longBreakDelayP = longBreakDelay;
    }
}

export { Scheme };
