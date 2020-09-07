import { InvalidArgumentError } from './InvalidArgumentError';

export class DayDateValueObject{
    readonly value: Date;

    protected constructor(value:Date) {
        this.value = value;
    }

    static createNow(): DayDateValueObject {
        return new DayDateValueObject(new Date());
    }

    static create(date:Date):DayDateValueObject{
        return new DayDateValueObject(date);
    }

    static createFromString(date: string):DayDateValueObject{
        try {
            this.checkCorrectStringFormat(date);
            const dateParsed:Date = new Date(date);
            return new DayDateValueObject(dateParsed);
        }catch (error){
            throw new InvalidArgumentError(`The string <${date}> doesn't cast with correct format`);
        }

    }

    private static checkCorrectStringFormat(value: string): void {
        if (!this.checkFormat(value)) {
            throw new InvalidArgumentError(`The phone number <${value}> doesn't cast with correct format`);
        }
    }

    private static checkFormat(value: string) {
        const regexp = new RegExp('(19|20)[0-9]{2}-(0[0-9]|1[0-2])-(([012])[0-9]|3[0-1])');
        return regexp.test(value);
    }

    toString():string{
        const year = this.value.getFullYear();
        let month = (this.value.getMonth()+1).toString();
        if (month.length<2) month = '0'+month;
        let day = this.value.getDate().toString();
        if (day.length<2) day = '0'+day;
        return `${year}-${month}-${day}`;
    }

    isBiggerThan(other: DayDateValueObject): boolean {
        return this.value > other.value;
    }
}