import { InvalidArgumentError } from './InvalidArgumentError';

export class DateValueObject{
    readonly value: Date;

    protected constructor(value:Date) {
        this.value = value;
    }

    static create(date:Date):DateValueObject{
        return new DateValueObject(date);
    }

    static createFromString(date: string):DateValueObject{
        try {
            const dateParsed:Date = new Date(date);
            return new DateValueObject(dateParsed);
        }catch (error){
            throw new InvalidArgumentError(`The string <${date}> doesn't cast with correct format`);
        }

    }

    toString():string{
        return `<${this.value.getFullYear()}>-<${this.value.getMonth()}>-<${this.value.getDay()}>`;
    }

    isBiggerThan(other: DateValueObject): boolean {
        return this.value > other.value;
    }
}