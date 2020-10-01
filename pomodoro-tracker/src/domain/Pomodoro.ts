import { CompletedPomodoro } from './CompletedPomodoro';
import { PomodoroItem } from './PomodoroItem';

class Pomodoro implements PomodoroItem{
    private categoryP: string;
    private descriptionP: string;
    private countP: number;

    constructor(category: string, description: string, count: number){
        this.category = category;
        this.description = description;
        this.count = count;
    }

    public get category(): string {
        return this.categoryP;
    }

    public set category(category: string){
        this.categoryP = category.trim();
    }

    public get description(): string {
        return this.descriptionP;
    }

    public set description(description: string){
        this.descriptionP = description.trim();
    }

    public get count(): number{
        return this.countP;
    }

    public set count(count: number){
        if (!Number.isInteger(count) || count < 0){
            throw new Error('The count of the pomodoro must be a non-negative integer');
        } else {
            this.countP = count;
        }
    }

    public markAsDone(duration: number): CompletedPomodoro {
        if (this.count <= 0){
            throw new Error('This Pomodoro should have been discarded when it reached a count of 0');
        }
        this.count -= 1;
        return new CompletedPomodoro(this.category, this.description, duration);
    }
}

export { Pomodoro };
