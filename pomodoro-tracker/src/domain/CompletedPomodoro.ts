class CompletedPomodoro{
    private categoryP: string;
    private descriptionP: string;
    readonly dateTime: Date;
    readonly duration: number;

    constructor(category: string, description: string, duration: number){
        this.category = category;
        this.description = description;
        this.dateTime = new Date();

        if (!Number.isInteger(duration) || duration <= 0){
            throw new Error('The duration of the completed pomodoro must be a non-negative integer');
        }
        this.duration = duration;
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
}

export { CompletedPomodoro };
