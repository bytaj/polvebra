import {StringValueObject} from '../../../Shared/domain/value-object/StringValueObject';
import {InvalidArgumentError} from '../../../Shared/domain/value-object/InvalidArgumentError';

export class Email extends StringValueObject {
    constructor(value: string) {
        super(value);
        this.checkCorrectPhone(this.toString());
    }

    private checkCorrectPhone(value: string): void {
        if (!this.checkFormat(value)) {
            throw new InvalidArgumentError(`The phone number <${value}> doesn't cast with correct format`);
        }
    }

    private checkFormat(value: string) {
        const regexp = new RegExp('^.*@.*\..*$');
        return regexp.test(value);
    }
}
