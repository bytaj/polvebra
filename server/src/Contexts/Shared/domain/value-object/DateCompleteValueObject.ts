import { InvalidArgumentError } from './InvalidArgumentError';

//TODO create test of this class
export class DateCompleteValueObject {
    readonly value: Date;

    protected constructor(value: Date) {
        this.value = value;
    }

    static createNow(): DateCompleteValueObject {
        return new DateCompleteValueObject(new Date());
    }

    static create(date: Date): DateCompleteValueObject {
        return new DateCompleteValueObject(date);
    }

    static createFromString(date: string): DateCompleteValueObject {
        try {
            this.checkCorrectStringFormat(date);
            const dateParsed: Date = new Date(date);
            return new DateCompleteValueObject(dateParsed);
        } catch (error) {
            throw new InvalidArgumentError(`The string <${date}> doesn't cast with correct format`);
        }

    }

    private static checkCorrectStringFormat(value: string): void {
        if (!this.checkFormat(value)) {
            throw new InvalidArgumentError();
        }
    }

    private static checkFormat(value: string) {
        const regexp = new RegExp('(19|20)[0-9]{2}-(0[0-9]|1[0-2])-(([012])[0-9]|3[0-1])T(([01])[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]Z');
        return regexp.test(value);
    }

    toString(): string {
        const year = this.value.getFullYear();
        let month = (this.value.getMonth()+1).toString();
        if (month.length<2) month = '0'+month;
        let day = this.value.getDate().toString();
        if (day.length<2) day = '0'+day;
        let hours = (this.value.getHours()-1).toString();
        if (hours.length<2) hours = '0'+hours;
        let minutes = this.value.getMinutes().toString();
        if (minutes.length<2) minutes = '0'+minutes;
        let seconds = this.value.getSeconds().toString();
        if (seconds.length<2) seconds = '0'+seconds;
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
    }

    isBiggerThan(other: DateCompleteValueObject): boolean {
        return this.value >
            other.value;
    }
}