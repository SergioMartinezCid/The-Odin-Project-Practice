import { setInterval } from 'timers';
import { CompletedPomodoro } from './CompletedPomodoro';
import { Pomodoro } from './Pomodoro';
import { Scheme } from './Scheme';

class Clock{
    private schemeP: Scheme;
    private currentPomodoroP: Pomodoro;
    private completedPomodoros: Array<CompletedPomodoro>;
    private currentTime: number;
    private intervalId: NodeJS.Timeout = null;
    private observerCollection: Array<Observer>;

    constructor(scheme: Scheme, currentPomodoro: Pomodoro){
        this.scheme = scheme;
        this.currentPomodoro = currentPomodoro;
        this.currentTime = this.scheme.pomodoroDuration;
        this.observerCollection = new Array();
        this.completedPomodoros = new Array();
    }

    /**
     * Method for changing the period uniformly
     *
     * @param coveredMinutes The number of minutes actually covered in this period
     */
    private changePeriod(coveredMinutes: number): void{
        if (!this.scheme.isPeriodBreak){
            this.completedPomodoros.push(this.currentPomodoro.markAsDone(coveredMinutes));
        }
        this.scheme.generatePeriod();
        this.currentTime = this.scheme.getPeriodDuration();
    }

    public resume(): void{
        if (this.intervalId == null){
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
        if (this.intervalId != null){
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    public stop(): void{
        if (this.intervalId != null){
            clearInterval(this.intervalId);
            this.intervalId = null;
            this.currentTime = this.scheme.pomodoroDuration;
            this.notifyObservers();
        }
    }

    public done(): void{
        if (this.intervalId == null){
            this.changePeriod(this.scheme.getPeriodDuration() - this.currentTime);
            this.notifyObservers();
        }
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

    public get currentPomodoro(): Pomodoro{
        return this.currentPomodoroP;
    }

    public set currentPomodoro(pomodoro: Pomodoro){
        this.currentPomodoroP = pomodoro;
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
}

export { Clock };
