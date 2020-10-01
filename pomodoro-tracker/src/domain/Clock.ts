import { CompletedPomodoro } from './CompletedPomodoro';
import { Pomodoro } from './Pomodoro';
import { Scheme } from './Scheme';
import { Observer } from './Observer';

class Clock{
    private schemeP: Scheme;
    private addedPomodoros: Array<Pomodoro>;
    private completedPomodoros: Array<CompletedPomodoro>;
    private currentTime: number;
    private intervalId: any = null;
    private observerCollection: Array<Observer>;

    constructor(scheme: Scheme, addedPomodoros: Array<Pomodoro>, completedPomodoros: Array<CompletedPomodoro>){
        this.scheme = scheme;
        this.currentTime = this.scheme.pomodoroDuration;
        this.addedPomodoros = addedPomodoros;
        this.completedPomodoros = completedPomodoros;
        this.observerCollection = new Array();
    }

    /**
     * Method for changing the period
     *
     * @param coveredMinutes The number of minutes actually covered in this period
     */
    private changePeriod(coveredMinutes: number): void{
        if (!this.scheme.isPeriodBreak()){
            let completedPomodoro: CompletedPomodoro;
            if (this.addedPomodoros.length <= 0){
                completedPomodoro = new CompletedPomodoro('', '', coveredMinutes);
            } else {
                completedPomodoro = this.addedPomodoros[0].markAsDone(coveredMinutes);
                if (this.addedPomodoros[0].count <= 0){
                    this.addedPomodoros.splice(0, 1);
                }
            }
            this.completedPomodoros.push(completedPomodoro);
        }
        this.scheme.generatePeriod();
        this.currentTime = this.scheme.getPeriodDuration();
    }

    public resume(): void{
        if (this.isPaused()){
            this.intervalId = setInterval(() => {
                this.currentTime--;
                if (this.currentTime <= 0){
                    this.changePeriod(this.scheme.getPeriodDuration());
                }
                this.notifyObservers();
            }, 1000);
        }
    }

    public pause(): void{
        if (!this.isPaused()){
            clearInterval(this.intervalId);
            this.intervalId = null;
            this.notifyObservers();
        }
    }

    public stop(): void{
        if (!this.isPaused()){
            clearInterval(this.intervalId);
            this.intervalId = null;
            this.currentTime = this.scheme.pomodoroDuration;
            this.notifyObservers();
        }
    }

    // Same action as skip
    public done(): void{
        this.changePeriod(this.scheme.getPeriodDuration() - this.currentTime);
        this.resume();
        this.notifyObservers();
    }

    public registerObserver(o: Observer): void{
        if (!this.observerCollection.includes(o)){
            this.observerCollection.push(o);
        }
    }

    public unregisterObserver(o: Observer): void{
        const index = this.observerCollection.indexOf(o);
        if (index >= 0){
            this.observerCollection.splice(index, 1);
        }
    }

    public notifyObservers(): void{
        this.observerCollection.forEach( o => {
            o.update();
        });
    }

    public get scheme(): Scheme{
        return this.schemeP;
    }

    public set scheme(scheme: Scheme){
        this.schemeP = scheme;
    }

    public getLastCompletedPomodoro(): CompletedPomodoro{
        if (this.completedPomodoros.length > 0){
            return this.completedPomodoros.splice(0, 1)[0];
        } else {
            return null;
        }
    }

    public getCurrentTime(): number{
        return this.currentTime;
    }

    public isPaused(): boolean{
        return this.intervalId == null;
    }
}

export { Clock };
