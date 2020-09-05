import {StringValueObject} from '../../../Shared/domain/value-object/StringValueObject';
import {InvalidArgumentError} from '../../../Shared/domain/value-object/InvalidArgumentError';

export class PhoneNumber extends StringValueObject {
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
        const regexp = new RegExp('^[6-7][0-9]{8}$');
        return regexp.test(value);
    }
}
